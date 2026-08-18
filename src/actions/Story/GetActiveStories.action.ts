"use server";

import validateSession from "@/auth/validateSession";
import { prisma } from "@/lib/prisma";
import { StoryType } from "@/types/StoryType";
// ======================================================
export const GetActiveStoriesAction = async (
  userId: string,
): Promise<{ stories: StoryType[] } | undefined> => {
  try {
    if (!userId) return;
    const validatingSession = await validateSession();
    if (!validatingSession.success || !validatingSession.session) return;
    const stories: StoryType[] = await prisma.story.findMany({
      where: {
        userId,
        expiresAt: {
          gte: new Date(),
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { stories };
  } catch (error) {
    console.error(error);
  }
};
