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
    <div className="mt-3 flex items-center gap-2">
      {user.professionalMode ? (
        <FollowButton
          followingId={user.id}
          followColor="hover:outline-white-600 outline-offset-2 hover:outline bg-white"
          unfollowColor="bg-white/10 hover:bg-white/15 text-white"
          iconStyle="size-5"
          publicStyle="flex text-sm items-center gap-1.5 cursor-pointer text-black shadow py-1.5 px-3 rounded-full text-nowrap font-normal"
        />
      ) : isFriend ? (
        <DeleteFriendButton userId={user.id} setIsFriend={setIsFriend} />
      ) : (
        <AddFriendButton
          publicStyle="flex text-sm items-center gap-2 cursor-pointer text-gray-200 shadow py-1.5 px-3 rounded-full text-nowrap"
          sentStyle="bg-blue-800 hover:outline outline-offset-2 hover:outline-blue-600"
          unsentStyle="bg-black/50 hover:bg-black/60"
          userId={user.id}
          iconStyle="size-4.5"
        />
      )}
      <Link
        href={`/conversations/${user.id}`}
        className="flex text-sm items-center hover:outline hover:outline-green-900 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-green-900 py-1.5 px-3 rounded-full"
      >
        <MessageCircle className="size-4" />
        تواصل
      </Link>
    </div>
  );
}

export default ProfileDetailsFooter;
