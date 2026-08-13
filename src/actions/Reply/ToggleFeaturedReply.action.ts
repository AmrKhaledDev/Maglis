"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// =======================================================================
export const ToggleFeaturedReplyAction = async (
  replyId: string,
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!replyId) return { success: false, message: "حدث خطأ غير متوقع." };
    const reply = await prisma.comment.findUnique({
      where: {
        id: replyId,
      },
      select: {
        post: {
          select: { authorId: true },
        },
        userId: true,
        isFeatured: true,
      },
    });
    if (!reply)
      return {
        success: false,
        message: "لا يمكنك جعل هذا الرد مميز, ربما تم حذفه.",
      };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    if (reply.userId == session.id || reply.post.authorId !== session.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.comment.update({
      where: {
        id: replyId,
      },
      data: {
        isFeatured: !reply.isFeatured,
      },
    });
    revalidateTag("posts", "");
    revalidateTag("videos", "");
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ غير متوقع أثناء جعل هذا الرد مميز.",
    };
  }
};
