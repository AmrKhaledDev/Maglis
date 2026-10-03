"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ========================================
export const UpdateMessagesStatus = async (receiverId: string) => {
  const userSession = await GetSession();
  if (!userSession) return;
  const directKey = [userSession.id, receiverId].sort().join("_");
  const conversation = await prisma.conversation.findFirst({
    where: {
      type: "DIRECT",
      directKey,
    },
  });
  if (conversation) {
    await prisma.message.updateMany({
      where: {
        senderId: receiverId,
        conversationId: conversation.id,
      },
      data: {
        status: "SEEN",
      },
    });
  }
};
