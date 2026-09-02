"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ==============================================
export const DeleteFriendShipAction = async (
  friendId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    if (!friendId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء إلغاء الصداقة.",
      };
    await prisma.$transaction(async (tx) => {
      await tx.friendship.deleteMany({
        where: {
          OR: [
            {
              userId: userSession.id,
              friendId,
            },
            {
              userId: friendId,
              friendId: userSession.id,
            },
          ],
        },
      });
      await tx.user.updateMany({
        where: {
          OR: [{ id: userSession.id }, { id: friendId }],
        },
        data: {
          friendsCount: {
            decrement: 1,
          },
        },
      });
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء إلغاء الصداقة.",
    };
  }
};
