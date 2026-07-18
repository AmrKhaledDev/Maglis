"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { MediaType, Privacy } from "@prisma/client";
import { revalidateTag } from "next/cache";
// =======================================================
export const EditPostAction = async (
  postId: string,
  privacy: Privacy = "PUBLIC",
  commentsDisabled: boolean = false,
  isPinnedToProfile: boolean = false,
  content?: string,
  media?: {
    url: string;
    type: MediaType;
  }[],
): Promise<{ success: boolean; message?: string }> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message ?? "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    if (!postId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع حاول مرةأخرى لاحقاً.",
      };
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: { author: true },
    });
    if (!post)
      return {
        success: false,
        message:
          "تعذر العثور على هذا المنشور. قد يكون تم حذفه أو لم يعد متاحًا.",
      };
    if (session.id !== post.author.id)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء." };
    await prisma.$transaction(async (tx) => {
      await tx.post.update({
        where: {
          id: postId,
        },
        data: {
          privacy,
          commentsDisabled,
          isPinnedToProfile,
          content,
          medias: {
            deleteMany: {},
          },
        },
      });
      if (media)
        await tx.media.createMany({
          data: media.map((item) => ({
            url: item.url,
            type: item.type,
            postId,
          })),
        });
    });
    revalidateTag("posts","")
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تعديل المنشور حاول مرة أخرى.",
    };
  }
};
