"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
// ========================================================
export const GetIntialUsersAction = async (): Promise<{
  success: boolean;
  message?: string;
  users?: User[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
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
        // bio: {
        //   not: null,
        // },
        // image: {
        //   not: null,
        // },
      },
      orderBy: { lastSeenAt: "desc" },
      take: 5,
    });
    return { success: true, users };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ غير متوقع." };
  }
};
