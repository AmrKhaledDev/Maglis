"use server";

import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ==========================================
export const GetSinglePostAction = async (
  postId: string,
): Promise<{ success: boolean; message?: string; post?: PostType | null }> => {
  const post: PostType | null = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          professionalMode: true,
          image: true,
          username: true,
        },
      },
      medias: true,
      likes: {
        select: {
          userId: true,
          user: {
            select: {
              image: true,
              name: true,
              professionalMode: true,
              bio: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  if (!post)
    return {
      success: false,
      message: "حدث خطأ أثناء جلب المنشور ربما تم حذفه.",
    };
  return { success: true, post };
};
