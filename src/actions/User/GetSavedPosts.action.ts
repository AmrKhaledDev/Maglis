"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { SavePostType } from "@/types/SavePost.type";
// ==========================================
export const GetSavedPostsAction = async (): Promise<{
  success: boolean;
  savedPosts?: SavePostType[];
  message?: string;
  notAuthenticated?: boolean;
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول.",
        notAuthenticated: true,
      };
    const savedPosts: SavePostType[] = await prisma.savePost.findMany({
      where: {
        userId: userSession.id,
        post: {
          OR: [
            { privacy: "PUBLIC" },
            { privacy: "FRIENDS", authorId: userSession.id },
            { privacy: "PRIVATE", authorId: userSession.id },
          ],
        },
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
            _count: {
              select: {
                likes: true,
                comments: true,
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
