"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// ===================================================
export const EditCommentAction = async (
  commentId: string,
  content: string,
  imageUrl: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!commentId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء تعديل تعليقك.",
      };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: { userId: true },
    });
    if (!comment)
      return {
        success: false,
        message: "تعذر تعديل التعليق . قد يكون تم حذفه أو لم يعد متاحًا.",
      };
    if (comment.userId !== session.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
        image: imageUrl || null,
        isEdited: true,
      },
    });
    revalidateTag("posts", "");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء تعديل تعليقك." };
  }
};
