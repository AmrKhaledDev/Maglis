"use server";

import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// =================================================
export const GetUserPostsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  posts?: PostType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المنشورات الخاصة بك.",
      };
    const posts: PostType[] = await prisma.post.findMany({
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
      orderBy: [
        {
          isPinnedToProfile: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
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
