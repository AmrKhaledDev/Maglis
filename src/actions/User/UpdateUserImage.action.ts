"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// ============================================================
export const UpdateUserImageAction = async (
  newImage: string,
  typeImage: "AVATAR" | "COVER",
  userId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء تحديث صورة ملفك الشخصي.",
      };
    const userSession = await GetSession();
    if (!userSession)
      return {
        success: false,
        message: "برجاء تسجيل الدخول لتنفيذ هذا الإجراء.",
      };
    if (userId !== userSession.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    if (!newImage) return { success: false, message: "برجاء رفع صورة." };

    await prisma.user.update({
      where: {
        id: userSession.id,
      },
      data: {
        image: typeImage === "AVATAR" ? newImage : userSession.image,
        cover: typeImage === "COVER" ? newImage : userSession.cover,
      },
    });
    revalidateTag("posts", "");
    return { success: true, message: "تم تحديث صورة الملف الشخصي." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تعديل صورة الملف الشخصي الخاص بك.",
    };
  }
};
