import { Prisma } from "@prisma/client";
// =========================================
export type CommentDbType = Prisma.CommentGetPayload<{
  include: {
    parent: {
      include: {
        user: {
         select: { name: true, id: true };
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
  };
}>;
