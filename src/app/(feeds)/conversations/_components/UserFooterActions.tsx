import AddFriendButton from "@/components/AddFriendButton/AddFriendButton";
import { useUser } from "@/providers/UserProvider";
import { MessageCircle } from "lucide-react";
import UserMemberType from "../_types/UserMember.type";
import FollowButton from "@/components/FollowButton/FollowButton";
import Link from "next/link";
// ===========================================================================
function UserFooterActions({ user }: { user: UserMemberType }) {
  const userSession = useUser();
  const isFriend = userSession.myFriends.some(
    (friend) => friend.friend.id === user.id,
  );
  const isFollow = userSession.followings.some(
    (following) => following.followingId === user.id,
  );
  return (
    <div className="flex flex-col gap-1.5 w-full mt-2 flex-1 items-center justify-end">
      <Link
        href={`/conversations/${user.id}`}
        className="py-1.5 lg:text-sm text-xs bg-green-900 hover:bg-green-800 mytransition w-full flex items-center gap-2 justify-center cursor-pointer rounded-full"
      >
        <MessageCircle strokeWidth={1} className="lg:size-4.5 size-4 mb-0.5" />
        تواصل
      </Link>
      {!isFriend && !user.professionalMode && (
        <AddFriendButton
          iconSize="lg:size-5 size-4"
          userId={user.id}
          textStyle="py-1.5 lg:text-sm text-xs bg-blue-900 w-full flex items-center gap-2 justify-center cursor-pointer hover:bg-blue-800 mytransition rounded-full"
        />
      )}
      {!isFollow && user.professionalMode && (
        <FollowButton
          iconSize="lg:size-5 size-4"
          followingId={user.id}
          textColor="py-1.5 lg:text-sm text-xs w-full flex items-center gap-2 justify-center cursor-pointer  mytransition hover:bg-blue-800 bg-blue-900 rounded-full"
        />
      )}
    </div>
  );
}

export default UserFooterActions;
