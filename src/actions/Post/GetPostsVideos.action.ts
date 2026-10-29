"use server";
import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ==================================
export const GetPostsVideosAction = async (): Promise<PostType[]> => {
  const videos = await prisma.post.findMany({
    where: {
      media: {
        some: {
          type: "VIDEO",
        },
      },
      author: {
        professionalMode: true,
      },
      privacy: "PUBLIC",
    },
    include: {
      media: true,
      author: {
        select: {
          id: true,
          name: true,
          professionalMode: true,
          image: true,
          username: true,
        },
      },
      likes: {
        select: {
          userId: true,
          user: {
            select: {
              name: true,
              image: true,
              bio: true,
              professionalMode: true,
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
  const filteredVideos = videos.filter((video) => video.media.length === 1);
  return filteredVideos;
};
