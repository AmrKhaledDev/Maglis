"use server";

import { prisma } from "@/lib/prisma";
import UserConnectionType from "@/types/UserConnection.type";
// ==========================================================================
export const GetFriendsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  data: UserConnectionType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب الأصدقاء.",
        data: [],
      };
    const data = await prisma.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: {
          select: {
            id: true,
            image: true,
            name: true,
            professionalMode: true,
          },
        },
      },
    });
    const users = data.map((friend) => ({
      id: friend.friend.id,
      image: friend.friend.image,
      name: friend.friend.name,
      professionalMode: friend.friend.professionalMode,
    }));
    return { success: true, data: users };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب الأصدقاء.",
      data: [],
    };
  }
};
