"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { CreateCommentSchema } from "@/ZodSchemas/Comment/CreateComment.schema";
import { revalidateTag } from "next/cache";
// =============================================
export const CreateReplyAction = async (
  parentId: string,
  content?: string,
  imageUrl?: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!parentId) return { success: false, message: "حدث خطأ غير متوقع." };
    const parent = await prisma.comment.findUnique({
      where: {
        id: parentId,
      },
      select: {
        post: { select: { commentsDisabled: true, id: true } },
      },
    });
    if (!parent)
      return {
        success: false,
        message:
          "لا يمكنك الرد على هذا التعليق ربما تم حذفه أو إيقاف التعليقات.",
      };
    if (parent.post.commentsDisabled)
      return {
        success: false,
        message: "لا يمكنك التعليق, تم وقف ميزة التعليقات على هذا المنشور.",
      };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };

    const session = validatingSession.session;

    const validation = CreateCommentSchema.safeParse({
      content,
      imageUrl,
    });
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    await prisma.comment.create({
      data: {
        parentId,
        userId: session.id,
        content,
        image: imageUrl,
        postId: parent.post.id,
      },
    });
    revalidateTag("posts", "");
    revalidateTag("videos", "");
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("CreateReplyAction Error:", error);
    return { success: false, message: "حدث خطأ أثناء إرسال الرد الخاص بك." };
  }
};