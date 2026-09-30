"use server";

import UserConversation from "@/app/(feeds)/messages/[userId]/_types/UserConversations.type";
import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ==================================================
export const GetUserConversations = async (): Promise<{
  success: boolean;
  message?: string;
  conversations?: UserConversation[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession)
      return { success: false, message: "برجاء تسجيل الدخول لجلب محادثاتك." };
    const conversations = await prisma.conversation.findMany({
      where: {
        type: "DIRECT",
        conversationMembers: {
          some: {
            userId: userSession.id,
          },
        },
        messages: {
          some: {
            deletedBySender: false,
          },
        },
      },
      include: {
        conversationMembers: {
          where: {
            userId: {
              not: userSession.id,
            },
          },
          select: {
            user: {
              select: {
                id: true,
                image: true,
                name: true,
              },
            },
          },
        },
        messages: {
          where: {
            deletedBySender: false,
          },
          take: 1,
          orderBy: [
            {
              createdAt: "desc",
            },
            { status: "desc" },
          ],
          include: {
            _count: {
              select: {
                messageMedia: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return { success: true, conversations };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء جلب محادثاتك." };
  }
};
