"use server";

import { prisma } from "@/lib/prisma";
import { Media } from "@prisma/client";
// ============================================
export const GetUserVideosAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  media?: Media[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب الفيديوهات الخاصة بك.",
      };
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        medias: {
          some: {
            type: "VIDEO",
          },
        },
      },
      select: {
        id: true,
        medias: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const media = posts.map((post) => post.medias).flat();
    return { success: true, media };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "عذراً, حدث خطأ أثناء جلب الفيديوهات الخاصة بك برجاء التأكد من الإتصال بالإنترنت وأعد تحميل الصفحة.",
    };
  }
};
