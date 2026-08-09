"use server";
import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// =========================================================
export const ShowMediaInProfileAction = async (
  postId: string,
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!postId)
      return { success: false, message: "حدث غير متوقع حاول مرة أخرى." };
    const user = await GetSession();
    if (!user) return { success: false, message: "برجاء تسجيل الدخول أولاً." };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: { authorId: true, showMediaInProfile: true, medias: true },
    });
    if (!post)
      return {
        success: false,
        message:
          "تعذر العثور على هذا المنشور. قد يكون تم حذفه أو لم يعد متاحًا.",
      };
    if (post.authorId !== user.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    if (post.medias.length < 1)
      return { success: false, message: "لا يوجد وسائط لعرضها." };
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        showMediaInProfile: !post.showMediaInProfile,
      },
    });
    revalidateTag("posts", "");
    revalidateTag("videos", "");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء عرض / إخفاء الوسائط في الملف الشخصي.",
    };
  }
};
