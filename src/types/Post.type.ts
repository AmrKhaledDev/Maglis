import { Prisma } from "@prisma/client";
// ============================================
export type PostType = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        professionalMode: true;
        image: true;
        username: true;
      };
    };
    medias: true;
    likes: {
      select: {
        userId: true;
        user: {
          select: {
            image: true;
            name: true;
            professionalMode: true;
            bio: true;
          };
        };
      };
    };
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;
