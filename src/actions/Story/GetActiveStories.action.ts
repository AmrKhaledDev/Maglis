"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import {
  storyUserSelect,
  UserWithStoriesFeed,
} from "@/types/UserWithStoriesFeed.type";
// ======================================================
export const GetActiveStoriesAction = async (userId: string) => {
  try {
    if (!userId) return null;
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session) return null;
    const user: UserWithStoriesFeed | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        image: true,
        name: true,
        username: true,
        stories: {
          where: {
            expiresAt: {
              gte: new Date(),
            },
          },
          include: {
            _count: {
              select: {
                storyViews: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        followings: {
          select: {
            following: {
              select: storyUserSelect,
            },
          },
        },
        friendships: {
          select: {
            friend: {
              select: storyUserSelect,
            },
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
