"use server";
import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
// =================================================================
export const GetSuggestedPeopleAction = async (): Promise<{
  success: boolean;
  message?: string;
  suggestedPeople?: SessionWithoutPasswordType[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, message: "برجاء تسجيل الدخول." };
    const suggestedPeople = await prisma.user.findMany({
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
      },
      take: 3,
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
      include: {
        savedPosts: {
          select: { postId: true },
        },
        sender: {
          select: {
            id: true,
            receiverId: true,
          },
        },
        followings: {
          select: {
            followingId: true,
          },
        },
        _count: {
          select: {
            receiver: true,
          },
        },
        myFriends: {
          select: {
            friend: {
              select: {
                id: true,
              },
            },
          },
        },
        blocks: {
          select: {
            blockedId: true,
          },
        },
      },
    });
    return { success: true, suggestedPeople: suggestedPeople };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
