"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
// ==================================================
export const ConfirmFriendRequestAction = async (
  senderId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const userSession = validatingSession.session;
    if (userSession.id === senderId)
      return { success: false, message: "لا يمكنك قبول طلب صداقة نفسك." };
    if (!senderId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء تأكيد الطلب.",
      };
    const request = await prisma.friendRequest.findFirst({
      where: {
        senderId,
      },
    });
    if (!request)
      return { success: false, message: "الطلب غير موجود ربما تم حذفه." };
    await prisma.$transaction(async (tx) => {
      const alreadyFriend = await prisma.friendship.findFirst({
        where: {
          OR: [
            { friendId: senderId, userId: userSession.id },
            { friendId: userSession.id, userId: senderId },
          ],
        },
      });
      if (alreadyFriend)
        return { success: false, message: "أنتما بالفعل ضمن قائمة الأصدقاء." };
      await tx.friendRequest.delete({
        where: {
          senderId_receiverId: {
            senderId,
            receiverId: userSession.id,
          },
        },
      });
      await tx.friendship.createMany({
        data: [
          {
            userId: userSession.id,
            friendId: senderId,
          },
          { userId: senderId, friendId: userSession.id },
        ],
      });
      await prisma.user.updateMany({
        where: { OR: [{ id: userSession.id }, { id: senderId }] },
        data: {
          friendsCount: {
            increment: 1,
          },
        },
      });
    });
    return { success: true, message: "تم تأكيد طلب الصداقة." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء تأكيد طلب الصداقة." };
  }
};
