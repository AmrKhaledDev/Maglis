"use server";

import FollowerType from "@/components/UserProfile/_types/Follower.type";
import { prisma } from "@/lib/prisma";
// ===============================================================================
export const GetFollowersAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  followers: FollowerType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المتابعين.",
        followers: [],
      };
    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      select: {
        follower: {
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
      followers,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب المتابعين.",
      followers: [],
    };
  }
};
