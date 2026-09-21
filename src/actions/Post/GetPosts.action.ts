"use server";

import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ==========================================
export const GetPostsAction = async (
  userSessionId: string,
): Promise<{ posts?: PostType[] }> => {
  const posts: PostType[] = await prisma.post.findMany({
    where: {
      hiddenPosts: {
        none: {
          userId: userSessionId,
        },
      },
      author: {
        blocked: {
          none: {
            blockerId: userSessionId,
          },
        },
      },
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
          user: {
            select: {
              image: true,
              name: true,
              professionalMode: true,
              bio: true,
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return { posts };
};
