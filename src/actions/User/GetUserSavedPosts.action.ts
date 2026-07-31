"use server";

import { prisma } from "@/lib/prisma";
import { SavePostDBType } from "@/types/SavePostDB.type";
// ==========================================
export const GetUserSavedPostsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  savedPosts?: SavePostDBType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المنشورات المحفوظة.",
      };
    const savedPosts: SavePostDBType[] = await prisma.savePost.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          select: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                image: true,
              },
            },
            medias: true,
            content: true,
            id: true,
            privacy: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, savedPosts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب المنشورات المحفوظة الخاصة بك.",
    };
  }
};
