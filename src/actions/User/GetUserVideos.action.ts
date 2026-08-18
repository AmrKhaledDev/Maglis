"use server";

import { prisma } from "@/lib/prisma";
import { Media } from "@prisma/client";
// ============================================
export const GetUserVideosAction = async (
  userId: string,
): Promise<{
  success: boolean;
  media?: Media[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
      };
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        medias: {
          some: {
            type: "VIDEO",
          },
        },
        showMediaInProfile: true,
      },
      select: {
        id: true,
        medias: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const media = posts.map((post) => post.medias).flat();
    return { success: true, media };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};
