"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { CreateCommentSchema } from "@/schemas/Comment/CreateComment.schema";
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
      },
    });
    revalidateTag("posts", "");
    return {
      success: true,
    };
  } catch (error: any) {
    console.error("CreateReplyAction Error:", error);
    if (error?.code === "P2003" || error?.code === "P2025") {
      return {
        success: false,
        message: "تعذر إرسال الرد. التعليق الأصلي لم يعد متاحًا.",
      };
    }

    return { success: false, message: "حدث خطأ أثناء إرسال الرد الخاص بك." };
  }
};
