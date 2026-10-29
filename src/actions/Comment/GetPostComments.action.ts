"use server";

import { prisma } from "@/lib/prisma";
import { Comment } from "@/types/Comment.type";
// ==========================================================
export const GetPostCommentsAction = async (
  postId: string,
): Promise<{
  success: boolean;
  message?: string;
  comments?: Comment[];
}> => {
  try {
    if (!postId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب تعليقات المنشور.",
      };
    const comments: Comment[] = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      include: {
        user: {
          select: {
            image: true,
            name: true,
            username: true,
            id: true,
          },
        },
        parent: {
          include: {
            user: {
              select: { name: true, id: true },
            },
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
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });
    return { success: true, comments };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء جلب تعليقات المنشور." };
  }
};
