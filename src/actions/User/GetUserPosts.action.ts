"use server";

import { prisma } from "@/lib/prisma";
import { PostDBType } from "@/types/Post.type";
// =================================================
export const GetUserPostsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  posts?: PostDBType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المنشورات الخاصة بك.",
      };
    const posts: PostDBType[] = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
        medias: true,
        savedPosts: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        likes: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            parent: {
              include: {
                user: {
                  select: { name: true, id: true },
                },
              },
            },
            user: {
              select: {
                image: true,
                name: true,
                username: true,
                id: true,
              },
            },
            likeForComments: {
              select: {
                userId: true,
              },
            },
            _count: {
              select: {
                replies: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, posts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "عذراً, حدث خطأ أثناء جلب المنشورات الخاصة بك يرجى التأكد من الإتصال بالإنترنت أو تواصل مع الدعم.",
    };
  }
};
