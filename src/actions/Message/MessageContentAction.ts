"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ===========================================
export const MessageContentAction = async (
  messageId: string,
  newContent: string,
  type: "EDIT" | "DELETE",
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!messageId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء تعديل محتوى رسالتك.",
      };
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    if (type === "EDIT") {
      if (!newContent.trim())
        return { success: false, message: "لا يمكنك إضافة محتوى فارغ." };
      await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          content: newContent.trim(),
          isEdited: true,
        },
      });
      return { success: true, message: "تم تعديل محتوى رسالتك بنجاح." };
    }
    if (type === "DELETE") {
      await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          content: null,
        },
      });
      return { success: true, message: "تم حذف محتوى رسالتك بنجاح." };
    } else {
      return { success: false, message: "نوع العملية غير صالح." };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `حدث خطأ أثناء ${type === "DELETE" ? "حذف" : "تعديل"} رسالتك.`,
    };
  }
};
