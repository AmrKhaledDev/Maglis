"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// =====================================
export const DeleteMessageAction = async (
  messageId: string,
  deleteType: "DELETE BY SENDER" | "DELETE FOR ALL",
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "يجب تسجيل الدخول." };
    if (!messageId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء حذف الرسالة.",
      };
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      select: { senderId: true, deletedBySender: true, createdAt: true },
    });
    if (!message)
      return {
        success: false,
        message: "الرسالة غير موجوده ربما تم حذفها بالفعل.",
      };
    if (message.senderId !== userSession.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    if (message.deletedBySender)
      return { success: false, message: "الرسالة محذوفه لديك بالفعل." };
    if (deleteType === "DELETE BY SENDER") {
      await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          deletedBySender: true,
        },
      });
    } else if (deleteType === "DELETE FOR ALL") {
      if (
        new Date(message.createdAt) <=
        new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      ) {
        return { success: false, message: "يتعذر حذف الرسالة." };
      }
      await prisma.message.delete({
        where: {
          id: messageId,
        },
      });
    } else
      return {
        success: false,
        message: "لم نتمكن من حذف رسالتك حاول مرة أخرى.",
      };
    return {
      success: true,
      message:
        deleteType === "DELETE BY SENDER"
          ? "تم حذف الرسالة لديك."
          : "تم حذف الرسالة لدى الجميع.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء حذف رسالتك تأكد من الإتصال بالإنترنت.",
    };
  }
};
