"use server";

import validateSession from "@/auth/validateSession";
import { CommentDbType } from "@/types/Comment.type";
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
  newReply?: CommentDbType;
}> => {
  try {
    if (!parentId) return { success: false, message: "حدث خطأ غير متوقع." };
    const parent = await prisma.comment.findUnique({
      where: {
        id: parentId,
      },
      select: { id: true },
    });
    if (!parent)
      return {
        success: false,
        message: "عذراً, لا يمكنك إضافة رد على هذا التعليق ربما تم حذفه.",
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
    const newReply = await prisma.comment.create({
      data: {
        parentId,
        userId: session.id,
        content,
        image: imageUrl,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            image: true,
            id: true,
          },
        },
        likeForComments: {
          select: {
            userId: true,
          },
        },
        parent: {
          include: {
            user: {
             select: { name: true, id: true },
            },
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });
    revalidateTag("posts", "");
    return { success: true, newReply };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء إرسال الرد الخاص بك." };
  }
};
