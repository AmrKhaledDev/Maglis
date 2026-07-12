import { Prisma } from "@prisma/client";
// ==================================================================
export type SessionWIthoutPasswordType = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    image: true;
    name: true;
  };
}>;
