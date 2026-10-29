"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { Post } from "@/types/Post.type";
// ==========================================
export const GetPostsAction = async (): Promise<{ posts?: Post[] }> => {
  const userSession = await GetSession();
  if (!userSession) return { posts: [] };
  const posts: Post[] = await prisma.post.findMany({
    where: {
      OR: [
        { privacy: "PUBLIC" },
        { privacy: "PRIVATE", authorId: userSession.id },
        {
          privacy: "FRIENDS",
          author: {
            friendships: {
              some: {
                friendId: userSession.id,
              },
            },
          },
        },
        { privacy: "FRIENDS", authorId: userSession.id },
      ],
      hiddenPosts: {
        none: {
          userId: userSession.id,
        },
      },
      author: {
        blocked: {
          none: {
            blockerId: userSession.id,
          },
        },
        blocks: {
          none: {
            blockedId: userSession.id,
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
