"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { UserSearchResultType } from "@/types/UserSearchResult.type";
// ==================================================================
export const SearchUsersAction = async (
  searchValue: string,
): Promise<{
  success: boolean;
  users?: UserSearchResultType[];
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false };
    const query = searchValue.trim();
    if (query.length < 1) return { success: false };
    const searchableFields = [
      "name",
      "username",
      "nickname",
      "jobTitle",
    ] as const;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userSession.id,
        },
        blocked: {
          none: {
            blockedId: userSession.id,
          },
        },
        blocks: {
          none: {
            blockerId: userSession.id,
          },
        },
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: query,
            mode: "insensitive",
          },
        })),
        isPermanentlyBanned: false,
        role: "USER",
      },
      take: 6,
      orderBy: { followersCount: "desc" },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        bio: true,
        followersCount: true,
        cover: true,
        role: true,
        isPermanentlyBanned: true,
        professionalMode: true,
        education: true,
        jobTitle: true,
        city: true,
        gender: true,
        nickname: true,
      },
    });
    return { success: true, users };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
