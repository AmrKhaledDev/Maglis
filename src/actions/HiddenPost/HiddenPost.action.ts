"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ==========================================
export const HiddenPostAction = async (
  postId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!postId)
      return { success: false, message: "حدث خطأ غير متوقع إخفاء المنشور." };
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول" };
    const hiddenPost = await prisma.hiddenPost.findUnique({
      where: {
        userId_postId: {
          userId: userSession.id,
          postId,
        },
      },
      select: {
        post: {
          select: { authorId: true },
        },
      },
    });
    if (hiddenPost?.post.authorId === userSession.id)
      return { success: false, message: "لا يمكنك إخفاء منشوراتك." };
    if (!hiddenPost) {
      const newHiddenPost = await prisma.hiddenPost.create({
        data: {
          userId: userSession.id,
          postId,
        },
        select: {
          post: { select: { author: { select: { name: true } } } },
        },
      });
      return {
        success: true,
        message: `تم إخفاء منشور ${newHiddenPost.post.author.name}.`,
      };
    } else {
      await prisma.hiddenPost.delete({
        where: {
          userId_postId: {
            userId: userSession.id,
            postId,
          },
        },
      });
      return {
        success: true,
        message: "تم إزالة المنشور من المنشورات المخفية لديك.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إخفاء المنشور حاول مرة أخرى.",
    };
  }
};
