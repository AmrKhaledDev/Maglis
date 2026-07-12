import { Prisma } from "@prisma/client";
// ==================================================================
export type SessionWithoutPasswordType = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    image: true;
    name: true;
    savedPosts: {
      include: {
        user: {
          select: {
            id: true;
          };
        };
      };
    };
  };
}>;
