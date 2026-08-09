import { Cache } from "@/lib/Cache";
import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ==================================
export const getVideos = Cache(
  async (): Promise<PostType[]> => {
    const videos = await prisma.post.findMany({
      where: {
        medias: {
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
        medias: true,
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
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                image: true,
                name: true,
                username: true,
                id: true,
              },
            },
            parent: {
              include: {
                user: {
                  select: { name: true, id: true },
                },
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
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const filteredVideos = videos.filter((video) => video.medias.length === 1);
    return filteredVideos;
  },
  ["videos"],
  {
    revalidate: 3600,
    tags: ["videos"],
  },
);
