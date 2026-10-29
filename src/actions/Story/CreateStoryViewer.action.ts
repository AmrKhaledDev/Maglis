"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
// ============================================
export const CreateStoryViewer = async (
  storyId: string,
): Promise<{ success: boolean }> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false };
    const story = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
      select: {
        userId: true,
        user: {
          select: {
            friends: {
              select: { friendId: true },
            },
            followers: {
              select: {
                followerId: true,
              },
            },
          },
        },
      },
    });
    if (!story) return { success: false };
    if (story.userId === userSession.id) return { success: true };
    const checkIsFriend = story.user.friends.some(
      (friend) => friend.friendId == userSession.id,
    );
    const checkIsFollower = story.user.followers.some(
      (follower) => follower.followerId === userSession.id,
    );
    if (!checkIsFollower && !checkIsFriend) return { success: false };
    await prisma.storyViewer.upsert({
      where: {
        viewerId_storyId: {
          viewerId: userSession.id,
          storyId,
        },
      },
      update: {},
      create: {
        storyId,
        viewerId: userSession.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
