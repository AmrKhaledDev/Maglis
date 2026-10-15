"use server";

import { prisma } from "@/lib/prisma";
import UserConnectionType from "@/types/UserConnection.type";
// ===============================================================================
export const GetFollowingsAction = async (
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
        message: "حدث خطأ غير متوقع أثناء جلب المتابعات.",
        data: [],
      };
    const data = await prisma.follow.findMany({
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
    const users = data.map((following) => ({
      id: following.following.id,
      image: following.following.image,
      name: following.following.name,
      professionalMode: following.following.professionalMode,
    }));
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "حدث خطأ أثناء جلب المتابعات.",
      data: [],
    };
  }
};
