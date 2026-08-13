import { Cache } from "@/lib/Cache";
import { prisma } from "@/lib/prisma";
import { PostType } from "@/types/Post.type";
// ================================================
export const getPosts = Cache(
  async (): Promise<PostType[]> => {
    const posts = await prisma.post.findMany({
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
          where: { parentId: null },
          orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
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
            post: {
              select: {
                authorId: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] },
);
