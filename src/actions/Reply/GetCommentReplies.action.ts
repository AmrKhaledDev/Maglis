"use server";
import { CommentDbType } from "@/types/Comment.type";
import { prisma } from "@/lib/prisma";
// =======================================
export const GetCommentRepliesAction = async (
  parentId: string,
): Promise<{ success: boolean; data?: CommentDbType[]; message?: string }> => {
  try {
    if (!parentId) {
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب الردود حاول لاحقاً.",
      };
    }
    const replies = await prisma.comment.findMany({
      where: {
        parentId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        likeForComments: {
          select: {
            userId: true,
          },
        },
        parent: {
          include: {
            user: {
              select: { name: true, id: true },
            },
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { success: true, data: replies };
  } catch (error) {
    console.error("Error in GetCommentReplies:", error);
    return { success: false, message: "حدث خطأ أثناء جلب الردود." };
  }
};
