"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { CreateMessageAction } from "./CreateMessage.action";
import MessageMediaType from "@/types/MessageMedia.type";
// ==================================================

export const CreateDirectConversationAction = async (
  receiverId: string,
  content?: string,
  media?: MessageMediaType[],
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!receiverId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء إنشاء رسالتك.",
      };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message:
          validatingSession.message ||
          "لا يمكنك إرسال رسالة, تعذر التحقق من حسابك.",
      };
    const userSession = validatingSession.session;
    const isReceiverBlocked = userSession.blocks.some(
      (block) => block.blockedId === receiverId,
    );
    if (isReceiverBlocked)
      return { success: false, message: "لا يمكنك مراسلة هذا المستخدم." };
    const isUserBlocked = userSession.blocked.some(
      (block) => block.blockerId === receiverId,
    );
    if (isUserBlocked)
      return {
        success: false,
        message: "لا يمكنك مراسلة هذا المستخدم لقد قام بحظرك.",
      };

    const directKey = [userSession.id, receiverId].sort().join("_");
    const conversation = await prisma.conversation.findFirst({
      where: {
        directKey,
      },
      select: { id: true },
    });
    let conversationId: string;
    if (!conversation) {
      const newConversation = await prisma.conversation.create({
        data: {
          type: "DIRECT",
          directKey,
          conversationMembers: {
            createMany: {
              data: [{ userId: userSession.id }, { userId: receiverId }],
            },
          },
        },
      });
      conversationId = newConversation.id;
    } else {
      await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          updatedAt: new Date(),
        },
      });
      conversationId = conversation.id;
    }
    const createMessageResult = await CreateMessageAction(
      conversationId,
      content,
      media,
    );
    if (!createMessageResult.success)
      return { success: false, message: createMessageResult.message };
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال رسالتك تأكد من الإتصال بالإنترنت.",
    };
  }
};
