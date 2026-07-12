"use server";

import GetSession from "@/lib/GetSession";
import { prisma } from "@/lib/prisma";
import { CreatePostSchema } from "@/schemas/Post/Create/CreatePost.schema";
import { MediaType, Privacy } from "@prisma/client";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import "dayjs/locale/ar";
// ====================================================
dayjs.locale("ar");
export const CreatePostAction = async (
  privacy: Privacy = "PUBLIC",
  commentsDisabled: boolean = false,
  isPinnedToProfile: boolean = false,
  content?: string,
  media?: {
    url: string;
    type: "IMAGE" | "VIDEO";
  }[],
): Promise<{ success: boolean; message?: string }> => {
  try {
    const session = await GetSession();
    if (!session)
      return {
        success: false,
        message: "لا يمكنك إنشاء منشور برجاء تسجيل الدخول",
      };
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      select: { isPermanentlyBanned: true, banExpiresAt: true },
    });
    if (!existingUser)
      return { success: false, message: "عذراً لم نستطع التعرف على حسابك." };
    if (existingUser.isPermanentlyBanned)
      return {
        success: false,
        message: "تم إيقاف حسابك بشكل دائم، لذلك لا يمكنك إنشاء منشورات.",
      };
    if (existingUser.banExpiresAt && existingUser.banExpiresAt > new Date())
      return {
        success: false,
        message: `تم إيقاف حسابك مؤقتاً حتى ${dayjs(existingUser.banExpiresAt).format("D MMMM YYYY - h:mm A")}`,
      };
    const validation = CreatePostSchema.safeParse({ content, media, privacy });
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    await prisma.$transaction(async (tx) => {
      const newPost = await tx.post.create({
        data: {
          authorId: session.id,
          content: content || null,
          commentsDisabled,
          isPinnedToProfile,
          privacy,
        },
      });
      if (media && media.length > 0) {
        await tx.media.createMany({
          data: media.map((item) => ({
            url: item.url,
            type: item.type.toUpperCase() as MediaType,
            postId: newPost.id,
          })),
        });
      }
      await tx.user.update({
        where: {
          id: session.id,
        },
        data: {
          postsCount: {
            increment: 1,
          },
        },
      });
    });
    revalidateTag("posts", "");
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء منشورك حاول مرة أخرى",
    };
  }
};
