import { Prisma } from "@prisma/client";
// ============================================
export type PostDBType = Prisma.PostGetPayload<{
  include: {
    author: true;
    medias: true;
    likes: true;
    comments: {
      orderBy: {
        createdAt: "desc";
      };
      include: {
        parent: {
          include: {
            user: {
              select: { name: true; id: true };
            };
          };
        };
        user: {
          select: {
            image: true;
            name: true;
            username: true;
            id: true;
          };
        };
        likeForComments: {
          select: {
            userId: true;
          };
        };
        _count: {
          select: {
            replies: true;
          };
        };
      };
    };
  };
}>;
