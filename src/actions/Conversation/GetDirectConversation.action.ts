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
    const conversation: ConversationType | null =
      await prisma.conversation.findFirst({
        where: {
          directKey,
          type: "DIRECT",
        },
        include: {
          messages: {
            where: {
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
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    return { success: true, conversation };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
