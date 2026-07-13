"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// ====================================================
export const DeletePostAction = async (
  postId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const validatigSession = await validateSession();
    if (!validatigSession.session || !validatigSession.session)
      return {
        success: false,
        message: validatigSession.message ?? "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatigSession.session;
    if (!postId)
      return { success: false, message: "حدث خطأ غير متوقع حاول مره أخرى." };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: { authorId: true },
    });
    if (!post)
      return {
        success: false,
        message:
          "تعذر العثور على هذا المنشور. قد يكون تم حذفه أو لم يعد متاحًا.",
      };
    if (session.id !== post.authorId)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidateTag("posts", "");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء حذف المنشور حاول مرة أخرى.",
    };
  }
};
