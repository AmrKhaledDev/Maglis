"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
// ======================================================
export const DeleteFriendRequestAction = async (
  senderId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    if (!senderId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء رفض طلب الصداقة.",
      };
    const userSession = validatingSession.session;
    await prisma.friendRequest.delete({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId: userSession.id,
        },
      },
    });
    return { success: true, message: "تم رفض طلب الصداقة." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء رفض طلب الصداقة." };
  }
};
