"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import ConversationType from "@/types/Conversation.type";
// ============================================
export const GetDirectConversationAction = async (
  receiverId: string,
): Promise<{
  success: boolean;
  message?: string;
  conversation?: ConversationType | null;
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    const directKey = [userSession.id, receiverId].sort().join("_");
    const conversation = await prisma.conversation.findFirst({
      where: {
        directKey,
        type: "DIRECT",
      },
    });
    if (!conversation) return { success: true, conversation: null };
    const conversationMember = await prisma.conversationMember.findUnique({
      where: {
        userId_conversationId: {
          userId: userSession.id,
          conversationId: conversation.id,
        },
      },
    });
    const clearedAt = conversationMember?.clearedAt;
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversation.id,
        ...(clearedAt && {
          createdAt: {
            gt: clearedAt,
          },
        }),
        OR: [
          {
            senderId: {
              not: userSession.id,
            },
          },
          {
            senderId: userSession.id,
            deletedBySender: false,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        messageMedia: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { success: true, conversation: { ...conversation, messages } };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
