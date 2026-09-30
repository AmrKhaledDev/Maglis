"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// =================================================
export const GetRecentContactsAction = async () => {
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
                bio: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
    });
    return { success: true, conversations };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء جلب محادثاتك." };
  }
};
