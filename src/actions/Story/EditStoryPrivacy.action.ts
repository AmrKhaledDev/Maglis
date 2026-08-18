"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ===========================================================
export const EditStoryPrivacyAction = async (
  storyId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!storyId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء تعديل خصوصية حالتك.",
      };
    const story = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
      select: { userId: true, isPrivate: true },
    });
    if (!story)
      return {
        success: false,
        message:
          "لم نتمكن من تحديث خصوصية حالتك ربما تم حذفها أو إنتهت صلاحيتها.",
      };
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    if (story.userId !== userSession.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.story.update({
      where: {
        id: storyId,
      },
      data: {
        isPrivate: !story.isPrivate,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء تعديل خصوصية حالتك." };
  }
};
