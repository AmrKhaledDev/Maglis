"use server";

import { prisma } from "@/lib/prisma";
import { PostSearchResult } from "@/types/PostSearchResult.type";
import { UserSearchResult } from "@/types/UserSearchResult.type";
// =============================================================
export const SearchAction = async (
  searchValue: string,
): Promise<{
  success: boolean;
  messaage?: string;
  data?: { posts: PostSearchResult[]; users: UserSearchResult[] };
}> => {
  try {
    const query = searchValue.trim();
    if (query.length < 2) return { success: false };
    const searchableFields = [
      "name",
      "username",
      "bio",
      "nickname",
      "jobTitle",
      "city",
      "education",
    ] as const;
    const [users, posts] = await Promise.all([
      prisma.user.findMany({
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
        orderBy: [{ followersCount: "desc" }],
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          bio: true,
          followersCount: true,
          cover: true,
        },
      }),
      prisma.post.findMany({
        where: {
          content: {
            contains: query,
            mode: "insensitive",
          },
          privacy: "PUBLIC",
        },
        take: 6,
        orderBy: [
          {
            likes: {
              _count: "desc",
            },
          },
          {
            createdAt: "desc",
          },
        ],
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
            },
          },
          medias: true,
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      }),
    ]);
    const data = {
      posts,
      users,
    };
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
