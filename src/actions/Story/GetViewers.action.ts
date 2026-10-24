"use server";

import GetSession from "@/auth/GetSession";
import StoryViewerType from "@/components/modals/StoryViewersModal/_types/StoryViewer.type";
import { prisma } from "@/lib/prisma";
// ========================================
export const GetViewersAction = async (
  storyId: string,
): Promise<{
  success: boolean;
  viewers: StoryViewerType[];
  message?: string;
  notAuthenticated?: boolean;
}> => {
  try {
    if (!storyId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المشاهدين.",
        viewers: [],
      };
    const userSession = await GetSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول لجلب المشاهدين.",
        notAuthenticated: true,
        viewers: [],
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
        message: "تعذر جلب المشاهدين. ربما تم حذف قصتك.",
        viewers: [],
      };
    if (story.userId !== userSession.id)
      return {
        success: false,
        message: "لا يمكنك جلب مشاهدين هذه القصة.",
        viewers: [],
      };
    const viewers = await prisma.storyViewer.findMany({
      where: {
        storyId,
        NOT: {
          viewerId: userSession.id,
        },
      },
      include: {
        viewer: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
    });
    return { success: true, viewers };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      viewers: [],
      message: "حدث خطأ أثناء جلب المشاهدين.",
    };
  }
};
