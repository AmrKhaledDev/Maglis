import { Prisma } from "@prisma/client";
// ============================================
export type PostDBType = Prisma.PostGetPayload<{
  include: {
    author: true;
    medias: true;
    savedPosts: {
      include: {
        user: {
          select: {
            id: true;
          };
        };
      };
    };
    likes: true;
    comments: {
      orderBy: {
        createdAt: "desc";
      };
      include: {
        user: {
          select: {
            image: true;
            name: true;
            username: true;
            id: true;
          };
        };
      };
    };
  };
}>;
