"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import MessageMediaType from "@/types/MessageMedia.type";
import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
// =======================================
export const CreateMessageAction = async (
  conversationId: string,
  content?: string,
  media?: MessageMediaType[],
): Promise<{ success: boolean; message?: string }> => {
  try {
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message:
          validatingSession.message ||
          "حدث خطأ أثناء التحقق من حسابك , تعذر إنشاء رسالة.",
      };
    const senderId = validatingSession.session.id;
    const validation = CreateMessageSchema.safeParse({
      content,
      media,
    });
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const data = validation.data;
    await prisma.$transaction(async (tx) => {
      const message = await tx.message.create({
        data: {
          senderId,
          conversationId,
          content: validation.data.content,
        },
      });
      if (data.media && data.media.length > 0) {
        await prisma.messageMedia.createMany({
          data: data.media.map((media) => ({
            messageId: message.id,
            ...media,
          })),
        });
      }
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال رسالتك تأكد من الإتصال بالإنترنت.",
    };
  }
};
