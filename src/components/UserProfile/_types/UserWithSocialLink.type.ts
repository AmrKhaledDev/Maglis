import { Prisma } from "@prisma/client";
// =============================================================
export type UserWithSocialLinkType = Prisma.UserGetPayload<{
  include: {
    socialLinks: true;
  };
}>;
