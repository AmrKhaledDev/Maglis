import { Prisma } from "@prisma/client";
// ==========================================
export type UserSearchResult = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    name: true;
    image: true;
    bio: true;
    followersCount: true;
    cover: true;
    role: true;
    isPermanentlyBanned: true;
    professionalMode: true;
    education: true;
    jobTitle: true;
    city: true;
    gender: true;
    nickname:true
  };
}>;
