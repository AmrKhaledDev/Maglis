"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
// ===================================================
export const SearchUsersForConversationAction = async (
  searchText: string,
): Promise<{ success: boolean; message?: string; users?: User[] }> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    searchText = searchText.trim();
    if (!searchText) return { success: false, message: "برجاء الكتابة للبحث." };
    const searchableFields = ["name", "city", "username"] as const;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userSession.id,
        },
        blocked: {
          none: {
            blockedId: userSession.id,
          },
        },
        blocks: {
          none: {
            blockerId: userSession.id,
          },
        },
        isPermanentlyBanned: false,
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: searchText,
            mode: "insensitive",
          },
        })),
      },
      take: 5,
      orderBy: {
        lastSeenAt: "desc",
      },
    });
    return { success: true, users };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ ما أثناء البحث عن مستخدمين." };
  }
};
