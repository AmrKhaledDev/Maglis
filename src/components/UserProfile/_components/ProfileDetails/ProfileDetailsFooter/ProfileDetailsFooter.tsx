import FollowBtn from "@/components/FollowBtn/FollowBtn";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import DeleteFriendBtn from "./DeleteFriendBtn";
import { useState } from "react";
import AddFriendBtn from "@/components/AddFriendBtn/AddFriendBtn";
// ====================================================================
function ProfileDetailsFooter({ user }: { user: User }) {
  const userSession = useUser();
  if (userSession.id === user.id) return null;
  const [isFriend, setIsFriend] = useState(
    userSession.myFriends.some((friend) => friend.friend.id === user.id),
  );
  return (
    <div className="mt-3 flex items-center gap-2">
      {user.professionalMode ? (
        <FollowBtn
          followingId={user.id}
          followColor="hover:outline-blue-600 outline-offset-2 hover:outline bg-blue-800"
          unfollowColor="bg-white/10 hover:bg-white/15"
          textColor="flex text-xs items-center  gap-2 cursor-pointer text-gray-200  shadow py-2 px-3 rounded-full text-nowrap"
        />
      ) : isFriend ? (
        <DeleteFriendBtn userId={user.id} setIsFriend={setIsFriend} />
      ) : (
        <AddFriendBtn
          textStyle="flex text-xs items-center  gap-2 cursor-pointer text-gray-200 shadow py-2 px-3 rounded-full text-nowrap"
          sentStyle="bg-blue-800 hover:outline outline-offset-2 hover:outline-blue-600"
          unsentStyle="bg-black/50 hover:bg-black/60"
          userId={user.id}
        />
      )}
      <Link
        href={`/messages/${user.id}`}
        className="flex text-xs items-center hover:outline hover:outline-green-950 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-green-950 shadow py-2 px-3 rounded-full"
      >
        <MessageCircle className="size-4" />
        تواصل
      </Link>
    </div>
  );
}

export default ProfileDetailsFooter;
