import { formatFollowers } from "@/formats/formatFollowers";
import { UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
import { formatFollowings } from "@/formats/formatFollowings";
import { formatFriends } from "@/formats/formatFriends";
// ============================================================================
function ProfileStats({ user }: { user: UserWithSocialLinkType }) {
  return (
    <div className="flex items-center gap-3 mt-1">
      {user.followersCount > 0 && (
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5">
          {formatFollowers(user.followersCount)}
        </p>
      )}
      {user.followingCount > 0 && (
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5">
          {formatFollowings(user.followingCount)}
        </p>
      )}
      {user.friendsCount > 0 && (
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5">
          {formatFriends(user.friendsCount)}
        </p>
      )}
    </div>
  );
}

export default ProfileStats;
