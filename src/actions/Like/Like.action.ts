"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// =============================================
export const LikeAction = async (
  postId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return { success: false, message: validatingSession.message };
    const session = validatingSession.session;
    const likedPost = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.id,
          postId,
        },
      },
    });
    if (likedPost) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: session.id,
            postId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: session.id,
          postId,
        },
      });
    }
    revalidateTag("posts", "");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        "حدث خطأ غير متوقع، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
    };
  }
};
