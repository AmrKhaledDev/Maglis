"use server";

import GetSession from "@/lib/GetSession";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
// =============================================
export const LikeAction = async (
  postId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const session = await GetSession();
    if (!session)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أو إنشاء حساب للإعجاب بهذا المنشور.",
      };
    if (session.isPermanentlyBanned)
      return {
        success: false,
        message: "تم إيقاف حسابك بشكل دائم لا يمكنك التفاعل على أي منشور.",
      };
    if (session.banExpiresAt && session.banExpiresAt > new Date())
      return {
        success: false,
        message: `تم إيقاف حسابك مؤقتاً حتى ${dayjs(session.banExpiresAt).format("D MMMM YYYY - h:mm A")}`,
      };
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
