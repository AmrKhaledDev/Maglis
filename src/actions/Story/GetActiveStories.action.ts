"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { UserStoriesWithFollowingsType } from "@/types/UserStoriesWithFollowingsType";
// ======================================================
export const GetActiveStoriesAction = async (userId: string) => {
  try {
    if (!userId) return;
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session) return;
    const user: UserStoriesWithFollowingsType | null =
      await prisma.user.findUnique({
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
            orderBy: {
              createdAt: "desc",
            },
          },
          followings: {
            select: {
              following: {
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
                    orderBy: {
                      createdAt: "desc",
                    },
                  },
                },
              },
            },
          },
        },
      });
    return user;
  } catch (error) {
    console.error(error);
  }
};
