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
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            parent: {
              include: {
                user: {
                  select: { name: true, id: true },
                },
              },
            },
            user: {
              select: {
                image: true,
                name: true,
                username: true,
                id: true,
              },
            },
            likeForComments: {
              select: {
                userId: true,
              },
            },
            _count: {
              select: {
                replies: true,
              },
            },
            post: {
              select: {
                authorId: true,
              },
            },
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
