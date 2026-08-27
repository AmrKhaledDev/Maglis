"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ====================================================
export const UserBlockAction = async (
  blockedId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!blockedId) return { success: false };
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    if (blockedId === userSession.id)
      return { success: false, message: "لا يمكنك حظر نفسك." };
    const blocked = await prisma.userBlock.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: userSession.id,
          blockedId,
        },
      },
      select: {
        id: true,
      },
    });
    if (!blocked) {
      await prisma.userBlock.create({
        data: {
          blockerId: userSession.id,
          blockedId,
        },
      });
      return { success: true };
    } else {
      await prisma.userBlock.delete({
        where: {
          blockerId_blockedId: {
            blockerId: userSession.id,
            blockedId,
          },
        },
      });
      return { success: true };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
