"use server";

import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// =================================================
export const GetUserPostsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  posts?: PostType[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
      };
    const posts: PostType[] = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            professionalMode: true,
            image: true,
            username: true,
          },
        },
        medias: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        {
          isPinnedToProfile: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
    return { success: true, posts };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
};
