import AddFriendButton from "@/components/AddFriendButton/AddFriendButton";
import FollowButton from "@/components/FollowButton/FollowButton";
import UserImage from "@/components/UserImage/UserImage";
import { UserSearchResultType } from "@/types/UserSearchResult.type";
import UserCardFooter from "./UserCardFooter";
import UserIdentityInfo from "./UserIdentityInfo";
import { useUser } from "@/providers/UserProvider";
// ====================================================================
function UsersResult({ users }: { users: UserSearchResultType[] }) {
  const userSession = useUser();
  return (
    <div>
      <h2 className="mb-4 font-normal">الأشخاص</h2>
      <div className="flex flex-col gap-3">
        {users.map((user) => {
          const isFriend = userSession.friends.some(
            (friend) => friend.friend.id === user.id,
          );
          return (
            <div
              key={user.id}
              className="bg-white/3 rounded-2xl overflow-hidden p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-fit z-2">
                    <UserImage
                      src={user.image}
                      size="size-15"
                      alt={user.name}
                    />
                  </div>
                  <UserIdentityInfo user={user} />
                </div>
                {user.professionalMode ? (
                  <FollowButton
                    followingId={user.id}
                    followStyle="hover:bg-gray-200 bg-gray-50"
                    unfollowStyle="text-white"
                    publicStyle="flex items-center gap-2 text-black  font-medium py-2 px-4 rounded-lg text-sm "
                    iconStyle="size-4"
                  />
                ) : (
                  !isFriend && (
                    <AddFriendButton
                      userId={user.id}
                      sentStyle="bg-blue-600 hover:bg-blue-500"
                      publicStyle="flex items-center gap-2 text-white font-medium py-2 px-4 rounded-lg text-sm "
                      iconStyle="size-4"
                    />
                  )
                )}
              </div>
              <UserCardFooter user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersResult;
