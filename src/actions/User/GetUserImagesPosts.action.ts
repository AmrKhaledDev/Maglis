"use server";

import { prisma } from "@/lib/prisma";
import { Media } from "@prisma/client";
// ===============================================
export const GetUserImagesPostsAction = async (
  userId: string,
): Promise<{ success: boolean; media?: Media[] }> => {
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
            type: "IMAGE",
          },
        },
        showMediaInProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        medias: true,
      },
    });
    if (!posts) return { success: true };
    const media = posts.map((post) => post.medias).flat();
    return { success: true, media };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};
