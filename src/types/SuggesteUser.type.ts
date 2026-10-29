import { Prisma } from "@prisma/client";
// ========================================
type SuggesteUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    image: true;
    name: true;
    followersCount: true;
  };
}>;
export default SuggesteUser;
