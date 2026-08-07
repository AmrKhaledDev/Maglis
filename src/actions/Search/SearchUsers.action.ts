"use server";

import { prisma } from "@/lib/prisma";
import { UserSearchResult } from "@/types/UserSearchResult.type";
// ==================================================================
export const SearchUsersAction = async (
  searchValue: string,
): Promise<{
  success: boolean;
  messaage?: string;
  users?: UserSearchResult[];
}> => {
  try {
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
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: query,
            mode: "insensitive",
          },
        })),
        emailVerified: true,
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
      },
    });
    return { success: true, users };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
