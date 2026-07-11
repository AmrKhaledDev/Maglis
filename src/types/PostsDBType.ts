import { Prisma } from "@prisma/client";
// ============================================
export type PostsDBType = Prisma.PostGetPayload<{
  include: {
    author: true;
    medias: true;
  };
}>;
