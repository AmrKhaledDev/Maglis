"use server";

import FollowingType from "@/components/UserProfile/_types/Following.type";
import { prisma } from "@/lib/prisma";
// ===============================================================================
export const GetFollowings = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  followings: FollowingType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المتابعات.",
        followings: [],
      };
    const followings = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            image: true,
            name: true,
            professionalMode: true,
          },
        },
      },
    });
    return {
      success: false,
      followings,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب المتابعات.",
      followings: [],
    };
  }
};
