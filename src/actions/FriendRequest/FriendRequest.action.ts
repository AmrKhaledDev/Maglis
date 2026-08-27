"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
// ================================================
export const FriendRequestAction = async (
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
    const session = validatingSession.session;
    if (receiverId === session.id)
      return { success: false, message: "لا يمكنك إرسال طلب صداقة لنفسك." };
    const alreadyFriend = await prisma.friendRequest.findFirst({
      where: {
        senderId: session.id,
        receiverId,
      },
    });
    if (alreadyFriend) {
      await prisma.friendRequest.deleteMany({
        where: {
          senderId: session.id,
          receiverId,
        },
      });
      return { success: true };
    } else {
      await prisma.friendRequest.create({
        data: {
          senderId: session.id,
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
