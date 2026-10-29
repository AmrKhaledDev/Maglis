"use server";
import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import SuggesteUser from "@/types/SuggesteUser.type";
// =================================================================
export const GetSuggestedUsersAction = async (): Promise<{
  success: boolean;
  message?: string;
  suggestedUsers?: SuggesteUser[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    const suggestedUsers = await prisma.user.findMany({
      where: {
        id: {
          not: userSession.id,
        },
        professionalMode: true,
        followers: {
          none: {
            followerId: userSession.id,
          },
        },
        isPermanentlyBanned: false,
        banExpiresAt: null,
        blocked: {
          none: {
            blockerId: userSession.id,
          },
        },
        posts: {
          some: {},
        },
      },
      take: 3,
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        image: true,
        name: true,
        followersCount: true,
      },
    });
    return { success: true, suggestedUsers };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
