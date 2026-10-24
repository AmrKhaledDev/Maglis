"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { Story } from "@prisma/client";
// ====================================================
export const GetStoriesAction = async (
  userId: string,
): Promise<{
  success: boolean;
  stories?: Story[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false };
    if (!userId) return { success: false };
    const stories: Story[] = await prisma.story.findMany({
      where: {
        userId,
        OR: [{ isPrivate: false }, { isPrivate: true, userId: userSession.id }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const storiesFilter = stories.filter((story) => story.media);
    return { success: true, stories: storiesFilter };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
