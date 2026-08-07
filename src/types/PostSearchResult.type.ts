import { Prisma } from "@prisma/client";
// =======================================
export type PostSearchResult = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        image: true;
        username: true;
      };
    };
    medias: true;
    _count: {
      select: {
        comments: true;
        likes: true;
      };
    };
  };
}>;
