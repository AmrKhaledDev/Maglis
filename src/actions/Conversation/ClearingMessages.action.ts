"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// =====================================================
export const ClearingMessagesAction = async (
  receiverId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    const directKey = [userSession.id, receiverId].sort().join("_");
    const conversation = await prisma.conversation.findUnique({
      where: {
        directKey,
      },
    });
    if (!conversation)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء مسح الرسائل.",
      };
    await prisma.conversationMember.update({
      where: {
        userId_conversationId: {
          userId: userSession.id,
          conversationId: conversation.id,
        },
      },
      data: {
        clearedAt: new Date(),
      },
    });
    return { success: true, message: "تم مسح الرسائل بنجاح." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء مسح الرسائل ." };
  }
};
