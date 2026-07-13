"use server";
import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
// =====================================
export const SavePostAction = async (
  postId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message ?? "حدث خطأ أثناء التحقق من حسابك",
      };
    const session = validatingSession.session;
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
    return {
      success: true,
      message: "اكتمل تحديث المحفوظات بنجاح، وستظهر التغييرات على الفور.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تحديث المحفوظات الخاصة بك",
    };
  }
};
