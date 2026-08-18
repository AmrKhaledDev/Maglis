"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ==========================================
export const DeleteStoryAction = async (
  storyId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!storyId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء حذف الحالة الخاصة بك.",
      };

    const story = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
      select: { userId: true },
    });
    if (!story)
      return {
        success: false,
        message: "لم نتمكن من حذف حالتك ربما تمت إزالتها أو إنتهت صلاحيتها",
      };
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    if (story.userId !== userSession.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.story.delete({
      where: {
        id: storyId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء حذف الحالة الخاصة بك." };
  }
};
