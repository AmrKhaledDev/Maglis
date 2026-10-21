"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { StoryType } from "@/types/StoryType.type";
// ====================================================
export const GetStoriesAction = async (
  userId: string,
): Promise<{
  success: boolean;
  stories?: StoryType[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false };
    if (!userId) return { success: false };
    const stories: StoryType[] = await prisma.story.findMany({
      where: {
        userId,
        OR: [
          { isPrivate: false },
          { isPrivate: true, userId: userSession.id },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const storiesFilter = stories.filter(
      (story) => story.media && !story.contentText,
    );
    return { success: true, stories: storiesFilter };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
