"use server";

import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ==========================================
export const GetPostsAction = async (
  userSessionId: string,
): Promise<{ posts?: PostType[] }> => {
  const posts: PostType[] = await prisma.post.findMany({
    where: {
      OR: [
        { privacy: "PUBLIC" },
        { privacy: "PRIVATE", authorId: userSessionId },
        {
          privacy: "FRIENDS",
          author: {
            friends: {
              some: {
                friendId: userSessionId,
              },
            },
          },
        },
        { privacy: "FRIENDS", authorId: userSessionId },
      ],
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
        blocks: {
          none: {
            blockedId: userSessionId,
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
      media: true,
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
