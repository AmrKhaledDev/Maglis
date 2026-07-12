"use server";

import GetSession from "@/lib/GetSession";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import "dayjs/locale/ar";
// =====================================
dayjs.locale("ar");
export const SavePostAction = async (
  postId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const session = await GetSession();
    if (!session)
      return {
        success: false,
        message: "برجاء تسجيل الدخول أو إنشاء حساب لإدارة المحفوظات.",
      };
    if (session.isPermanentlyBanned)
      return {
        success: false,
        message: "تم إيقاف حسابك بشكل دائم، لذلك لا يمكنك إدارة المحفوظات.",
      };
    if (session.banExpiresAt && session.banExpiresAt > new Date())
      return {
        success: false,
        message: `تم إيقاف حسابك مؤقتاً حتى ${dayjs(session.banExpiresAt).format("D MMMM YYYY - h:mm A")}`,
      };
    if (!postId)
      return { success: false, message: "حدث خطأ غير متوقع حاول مرة أخرى" };
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: { id: true },
    });
    if (!existingPost)
      return {
        success: false,
        message: "المنشور غير موجود ربما تم إزالته",
      };
    const savedPost = await prisma.savePost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.id,
        },
      },
    });
    if (savedPost) {
      await prisma.savePost.delete({
        where: {
          postId_userId: {
            postId,
            userId: session.id,
          },
        },
      });
    } else {
      await prisma.savePost.create({
        data: {
          postId,
          userId: session.id,
        },
      });
    }
    return { success: true, message: "اكتمل تحديث المحفوظات بنجاح، وستظهر التغييرات على الفور." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تحديث المحفوظات الخاصة بك",
    };
  }
};
