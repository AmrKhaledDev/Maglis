"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { CreateCommentSchema } from "@/schemas/Comment/CreateComment.schema";
import { revalidateTag } from "next/cache";
// ===========================================================================
export const CreateCommentAction = async (
  postId: string,
  content?: string,
  imageUrl?: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    if (!postId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع يتعذر إنشاء تعليقك.",
      };
    const validation = CreateCommentSchema.safeParse({
      content,
      imageUrl,
    });
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    await prisma.comment.create({
      data: {
        content,
        postId,
        image: imageUrl,
        userId: session.id,
      },
    });
    revalidateTag("posts", "");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء إنشاء تعليقك." };
  }
};
