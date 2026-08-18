"use server";

import { prisma } from "@/lib/prisma";
import { StoryType } from "@/types/StoryType";
// ====================================================
export const GetUserStoriesAction = async (
  userId: string,
): Promise<{
  success: boolean;
  stories?: StoryType[];
}> => {
  try {
    if (!userId) return { success: false };
    const stories: StoryType[] = await prisma.story.findMany({
      where: {
        userId,
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
