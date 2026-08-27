"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { SavePostType } from "@/types/SavePost.type";
// ==========================================
export const GetUserSavedPostsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  savedPosts?: SavePostType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
      };
    const userSession = await GetSession();
    if (!userSession) return { success: false };
    if (userId !== userSession.id) return { success: false };
    const savedPosts: SavePostType[] = await prisma.savePost.findMany({
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
    };
  }
};
