"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// ====================================================
export const DeleteUserImageAction = async (
  userId: string,
  typeImage: "AVATAR" | "COVER",
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء حذف صورة الملف الشخصي.",
      };
    const session = await GetSession();
    if (!session)
      return {
        success: false,
        message: "برجاء تسجيل الدخول لتنفيذ هذا الإجراء.",
      };
    if (userId !== session.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: typeImage === "AVATAR" ? null : session.image,
        cover: typeImage === "COVER" ? null : session.cover,
      },
    });
    revalidateTag("posts", "");
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "عذراً, حدث خطأ أثناء حذف صورة الملف الشخصي الخاص بك.",
    };
  }
};
