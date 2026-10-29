"use server";

import GetSession from "@/auth/GetSession";
import { prisma } from "@/lib/prisma";
import { Post } from "@/types/Post.type";
import { UserSearchResult } from "@/types/UserSearchResult.type";
// =============================================================
export const SearchAction = async (
  searchValue: string,
): Promise<{
  success: boolean;
  data: { posts: Post[]; users: UserSearchResult[] };
}> => {
  try {
    const userSession = await GetSession();
    if (!userSession) return { success: false, data: { users: [], posts: [] } };
    const query = searchValue.trim();
    const usersSearchableFields = [
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
          OR: usersSearchableFields.map((field) => ({
            [field]: {
              contains: query,
              mode: "insensitive",
            },
          })),
        },
        take: 10,
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
          nickname:true
        },
      }),
      prisma.post.findMany({
        where: {
          content: {
            contains: query,
            mode: "insensitive",
          },
          authorId: {
            not: userSession.id,
          },
          privacy: "PUBLIC",
        },
        take: 10,
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
              professionalMode: true,
              image: true,
              username: true,
            },
          },
          media: true,
          likes: {
            select: {
              userId: true,
              user: {
                select: {
                  image: true,
                  name: true,
                  professionalMode: true,
                  bio: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
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
    return { success: false, data: { users: [], posts: [] } };
  }
};