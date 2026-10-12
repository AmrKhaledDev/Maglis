"use server";

import FriendshipType from "@/components/UserProfile/_types/Friendship.type";
import { prisma } from "@/lib/prisma";
// ==========================================================================
export const GetFriendsAction = async (
  userId: string,
): Promise<{ success: boolean; message?: string; friends: FriendshipType[] }> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب الأصدقاء.",
        friends: [],
      };
    const friends = await prisma.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: {
          select: {
            id:true,
            image: true,
            name: true,
            professionalMode: true,
          },
        },
      },
    });
    return { success: true, friends };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب الأصدقاء.",
      friends: [],
    };
  }
};
