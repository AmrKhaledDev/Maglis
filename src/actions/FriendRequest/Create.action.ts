"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
// ================================================
export const CreateAction = async (
  receiverId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!receiverId)
      return {
        success: false,
      };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const userSession = validatingSession.session;
    if (receiverId === userSession.id)
      return { success: false, message: "لا يمكنك إرسال طلب صداقة لنفسك." };
    const friend = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: userSession.id, friendId: receiverId },
          { userId: receiverId, friendId: userSession.id },
        ],
      },
    });
    if (friend)
      return {
        success: false,
        message: "لا يمكنك إرسال طلب صداقة. أنتم أصدقاء بالفعل.",
      };
    const request = await prisma.friendRequest.findFirst({
      where: {
        senderId: userSession.id,
        receiverId,
      },
    });
    if (request) {
      await prisma.friendRequest.deleteMany({
        where: {
          senderId: userSession.id,
          receiverId,
        },
      });
      return { success: true };
    } else {
      await prisma.friendRequest.create({
        data: {
          senderId: userSession.id,
          receiverId,
        },
      });
      return { success: true, message: "تم إرسال طلب صداقة بنجاح." };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال طلب صداقة حاول مرة أخرى.",
    };
  }
};
