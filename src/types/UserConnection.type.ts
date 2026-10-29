import { Prisma } from "@prisma/client";
// =======================================
export type UserConnection = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    professionalMode: true;
  };
}>;

