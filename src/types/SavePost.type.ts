import { Prisma } from "@prisma/client";
// ======================================================
export type SavePostDBType = Prisma.SavePostGetPayload<{
  include: {
    post: {
      select: {
        author: {
          select: {
            id: true;
            username: true;
            name: true;
            image: true;
          };
        };
        medias: true;
        content: true;
        id: true;
        privacy: true;
        createdAt: true;
      };
    };
  };
}>;
