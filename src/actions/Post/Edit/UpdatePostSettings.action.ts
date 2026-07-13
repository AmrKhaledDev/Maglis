"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
// =======================================================================
export const UpdatePostSettingsAction = async (
  typeSetting: "PINNED" | "COMMENTS_DISABLED",
  postId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message ?? "حدث خطأ أثناء التحقق من حسابك",
      };
    const session = validatingSession.session;
    if (!postId)
      return { success: false, message: "حدث خطأ غير متوقع حاول مرة أخرى." };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
        isPinnedToProfile: true,
        commentsDisabled: true,
      },
    });
    if (!post)
      return {
        success: false,
        message:
          "تعذر العثور على هذا المنشور. قد يكون تم حذفه أو لم يعد متاحًا.",
      };
    if (post.authorId !== session.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };

    const data: Prisma.PostUpdateInput = {};
    if (typeSetting == "PINNED")
      data.isPinnedToProfile = !post.isPinnedToProfile;
    if (typeSetting == "COMMENTS_DISABLED")
      data.commentsDisabled = !post.commentsDisabled;
    await prisma.post.update({
      where: {
        id: postId,
      },
      data,
    });
    revalidateTag("posts", "");
    return { success: true, message: "تم تحديث إعدادات المنشور." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء تحديث إعدادات المنشور." };
  }
};
