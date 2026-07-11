import { Cache } from "@/lib/Cache";
import { prisma } from "@/lib/prisma";
// ======================================
export const getPosts = Cache(
  async () => {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        medias: true,
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
