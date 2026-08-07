"use server";

import { prisma } from "@/lib/prisma";
import { Media } from "@prisma/client";
// ===============================================
export const GetUserImagesPostsAction = async (
  userId: string,
): Promise<{ success: boolean; message?: string; media?: Media[] }> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب الصور الخاصة بك.",
      };
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        medias: {
          some: {
            type: "IMAGE",
          },
        },
        showMediaInProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        medias: true,
      },
    });
    if (!posts) return { success: true };
    const media = posts.map((post) => post.medias).flat();
    return { success: true, media };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "عذراً, حدث خطأ أثناء جلب الصور الخاصة بك تأكد من الإتصال بالإنترنت وأعد تحميل الصفحة.",
    };
  }
};
