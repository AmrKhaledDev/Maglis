"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
// ==================================================
export const FollowAction = async (
  followingId: string,
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    if (!followingId) return { success: false };
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session)
      return {
        success: false,
        message: validatingSession.message || "حدث خطأ أثناء التحقق من حسابك.",
      };
    const session = validatingSession.session;
    if (followingId === session.id)
      return { success: false, message: "لا يمكنك متابعة نفسك." };
    const alreadyFollowing = await prisma.follow.findFirst({
      where: {
        followerId: session.id,
        followingId,
      },
    });
    await prisma.$transaction(async (tx) => {
      if (alreadyFollowing) {
        await tx.follow.deleteMany({
          where: {
            followerId: session.id,
            followingId,
          },
        });
        await tx.user.update({
          where: {
            id: followingId,
          },
          data: {
            followersCount: {
              decrement: 1,
            },
          },
        });
        await tx.user.update({
          where: {
            id: session.id,
          },
          data: {
            followingCount: {
              decrement: 1,
            },
          },
        });
      } else {
        await tx.follow.create({
          data: {
            followerId: session.id,
            followingId,
          },
          select: {
            following: {
              select: {
                name: true,
              },
            },
          },
        });
        await tx.user.update({
          where: {
            id: followingId,
          },
          data: {
            followersCount: {
              increment: 1,
            },
          },
        });
        await tx.user.update({
          where: {
            id: session.id,
          },
          data: {
            followingCount: {
              increment: 1,
            },
          },
        });
      }
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "حدث خطأ أثناء المتابعة." };
  }
};
