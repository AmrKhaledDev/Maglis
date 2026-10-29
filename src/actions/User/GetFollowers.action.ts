"use server";

import { prisma } from "@/lib/prisma";
import { UserConnection } from "@/types/UserConnection.type";
// ===============================================================================
export const GetFollowersAction = async (
  userId: string,
): Promise<{
  success: boolean;
  message?: string;
  data: UserConnection[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء جلب المتابعين.",
        data: [],
      };
    const data = await prisma.follow.findMany({
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
    const users = data.map((follower) => ({
      id: follower.follower.id,
      image: follower.follower.image,
      name: follower.follower.name,
      professionalMode: follower.follower.professionalMode,
    }));
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب المتابعين.",
      data: [],
    };
  }
};
