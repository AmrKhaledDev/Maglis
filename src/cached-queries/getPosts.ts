import { Cache } from "@/lib/Cache";
import { prisma } from "@/lib/prisma";
import { PostDBType } from "@/types/Post.type";
// ================================================
export const getPosts = Cache(
  async (): Promise<PostDBType[]> => {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        medias: true,
        savedPosts: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        likes: true,
        comments: {
          where: { parentId: null },
          orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
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
