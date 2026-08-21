"use server";

import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ==========================================
export const GetPostsAction = async (): Promise<{ posts: PostType[] }> => {
  const posts: PostType[] = await prisma.post.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return { posts };
};
