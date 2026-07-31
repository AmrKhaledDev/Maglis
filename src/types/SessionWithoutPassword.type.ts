import { Prisma } from "@prisma/client";
// ===========================================
type UserWithSavedPosts = Prisma.UserGetPayload<{
  include: {
    savedPosts: true;
  };
}>;
export type SessionWithoutPasswordType = Omit<UserWithSavedPosts, "password">;