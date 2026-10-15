import { GetFollowersAction } from "@/actions/User/GetFollowers.action";
import { GetFollowingsAction } from "@/actions/User/GetFollowings.action";
import { GetFriendsAction } from "@/actions/User/GetFriends.action";
// ==================================================================================
export const connectionQueryKey = {
  FRIENDS: {
    key: "friends",
  },
  FOLLOWERS: {
    key: "followers",
  },
  FOLLOWINGS: {
    key: "followings",
  },
} as const;

export const connectionAction = {
  FRIENDS: {
    action: GetFriendsAction,
  },
  FOLLOWERS: {
    action: GetFollowersAction,
  },
  FOLLOWINGS: {
    action: GetFollowingsAction,
  },
} as const;
export const connectionMessages = {
  FRIENDS: {
    title: "لا يوجد أصدقاء",
    description: "لا يوجد أصدقاء حتى الآن.",
  },
  FOLLOWERS: {
    title: "لا يوجد متابعون",
    description: "لا يوجد متابعون حتى الآن.",
  },
  FOLLOWINGS: {
    title: "لا توجد متابعات",
    description: "لا توجد متابعات حتى الآن.",
  },
} as const;
