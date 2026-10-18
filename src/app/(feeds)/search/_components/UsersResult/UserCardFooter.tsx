import { infos } from "@/data/userInfos";
import { UserSearchResultType } from "@/types/UserSearchResult.type";
// =============================================================
function UserCardFooter({ user }: { user: UserSearchResultType }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-normal">{user.bio}</p>
      <div className="text-gray-300 text-xs font-normal flex items-center gap-4">
        {infos(user).map(
          (info) =>
            info.icon &&
            info.value && (
              <p key={info.id} className="flex items-center gap-2">
                <info.icon className="text-[15px] mt-0.5" /> {info.value}
              </p>
            ),
        )}
      </div>
    </div>
  );
}

export default UserCardFooter;
