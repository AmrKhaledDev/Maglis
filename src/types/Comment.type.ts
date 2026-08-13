import { Prisma } from "@prisma/client";
// =========================================
export type CommentType = Prisma.CommentGetPayload<{
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
        id: true;
        name: true;
        username: true;
        image: true;
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
    post: {
      select: {
        authorId: true;
      };
    };
  };
}>;
