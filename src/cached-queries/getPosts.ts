import { Cache } from "@/lib/Cache";
import { prisma } from "@/lib/prisma";
import { PostDBType } from "@/types/PostDB.type";
// ======================================
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
