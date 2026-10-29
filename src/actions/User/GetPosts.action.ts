"use server";

import { prisma } from "@/lib/prisma";
import { Post } from "@/types/Post.type";
// =================================================
export const GetPostsAction = async (
  userId: string,
): Promise<{
  success: boolean;
  posts?: Post[];
}> => {
  try {
    if (!userId)
      return {
        success: false,
      };
    const posts: Post[] = await prisma.post.findMany({
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
        media: true,
        likes: {
          select: {
            userId: true,
            user: {
              select: {
                name: true,
                bio: true,
                professionalMode: true,
                image: true,
              },
            },
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
