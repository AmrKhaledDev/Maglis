import { UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
// ==========================================
function ProfileStats({ user }: { user: UserWithSocialLinkType }) {
  return (
    <>
      <div className="flex items-center gap-3 mt-1">
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5">
          {user.followersCount} {user.professionalMode ? "متابعين" : "أصدقاء"}
        </p>
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5">
          {user.followingCount} متابعات
        </p>
        {user.professionalMode && user.friendsCount > 0 && (
          <p className="text-[13px] text-gray-300 flex items-center gap-1.5">
            {user.friendsCount}
          </p>
        )}
      </div>
    </>
  );
}

export default ProfileStats;
