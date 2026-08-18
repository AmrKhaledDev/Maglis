"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { CreateStorySchema } from "@/ZodSchemas/Story/CreateStory.schema";
import { MediaType } from "@prisma/client";
// =========================================================
export const CreateStoryAction = async (
  media?: string,
  contentText?: string,
  mediaType?: MediaType,
  color?: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const validationData = CreateStorySchema.safeParse({
      media,
      contentText,
      mediaType,
      color,
    });
    if (!validationData.success)
      return {
        success: false,
        message: validationData.error.issues[0].message,
      };
    const session = validatingSession.session;
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await prisma.story.create({
      data: {
        userId: session.id,
        media: validationData.data.media,
        contentText: validationData.data.contentText,
        color: validationData.data.color,
        expiresAt: expires,
        mediaType,
      },
    });
    return { success: true, message: "تم إنشاء حالتك بنجاح." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إنشاء حالتك حاول مرة أخرى.",
    };
  }
};
