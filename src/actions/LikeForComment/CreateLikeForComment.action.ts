"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// ========================================
export const CreateLikeForComentAction = async (
  commentId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!commentId) return { success: false, message: "حدث خطأ غير متوقع." };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    const existingLike = await prisma.likeForComment.findUnique({
      where: {
        userId_commentId: {
          userId: session.id,
          commentId: commentId,
        },
      },
    });
    if (existingLike) {
      await prisma.likeForComment.delete({
        where: {
          userId_commentId: {
            userId: session.id,
            commentId: commentId,
          },
        },
      });
    } else {
      await prisma.likeForComment.create({
        data: {
          commentId: commentId,
          userId: session.id,
        },
      });
    }
    revalidateTag("posts", "");
    revalidateTag("videos", "");
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ غير متوقع." };
  }
};
