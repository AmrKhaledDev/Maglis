import { Prisma } from "@prisma/client";
// ============================================
export type PostDBType = Prisma.PostGetPayload<{
  include: {
    author: true;
    medias: true;
  };
}>;
