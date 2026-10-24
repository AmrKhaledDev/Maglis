import AddFriendButton from "@/components/AddFriendButton/AddFriendButton";
import FollowButton from "@/components/FollowButton/FollowButton";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteFriendButton from "./DeleteFriendButton";
// ====================================================================
function ProfileDetailsFooter({ user }: { user: User }) {
  const userSession = useUser();
  const [isFriend, setIsFriend] = useState(
    userSession.myFriends.some((friend) => friend.friend.id === user.id),
  );
  if (userSession.id === user.id) return null;
  return (
    <div className="mt-3 flex items-center gap-2 flex-wrap">
      {user.professionalMode && (
        <FollowButton
          followingId={user.id}
          followStyle="hover:outline-white-600 outline-offset-2 hover:outline bg-white"
          unfollowStyle="bg-white/10 hover:bg-white/15 text-white"
          iconStyle="size-4"
          publicStyle="flex text-xs items-center gap-1.5 cursor-pointer text-black shadow py-1.5 px-3 rounded-full text-nowrap font-normal"
        />
      )}
      {isFriend && (
        <DeleteFriendButton userId={user.id} setIsFriend={setIsFriend} />
      )}
      {!user.professionalMode && !isFriend && (
        <AddFriendButton
          publicStyle="flex text-xs items-center gap-2 cursor-pointer text-gray-200 py-1.5 px-3 rounded-full text-nowrap"
          sentStyle="bg-blue-800 hover:outline outline-offset-2 hover:outline-blue-600 shadow"
          userId={user.id}
          iconStyle="size-4.5"
        />
      )}
      <Link
        href={`/conversations/${user.id}`}
        className="flex text-xs items-center hover:outline hover:outline-green-900 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-green-900 py-1.5 px-3 rounded-full"
      >
        <MessageCircle className="size-4" />
        تواصل
      </Link>
    </div>
  );
}

export default ProfileDetailsFooter;
