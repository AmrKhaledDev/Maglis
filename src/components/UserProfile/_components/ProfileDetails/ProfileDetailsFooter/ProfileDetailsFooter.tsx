import FollowBtn from "@/components/FollowBtn/FollowBtn";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { MessageCircle, UserRoundPlus } from "lucide-react";
import Link from "next/link";
// ====================================================================
function ProfileDetailsFooter({ user }: { user: User }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id !== user.id && (
        <div className="mt-3 flex items-center gap-2">
          {user.professionalMode ? (
            <FollowBtn
              followingId={user.id}
              followColor="hover:outline-blue-600 outline-offset-2 hover:outline bg-blue-800"
              unfollowColor="bg-white/10 hover:bg-white/15"
              textColor="flex text-xs items-center  gap-2 cursor-pointer text-gray-200 font-semibold shadow py-2 px-3 rounded-full text-nowrap"
            />
          ) : (
            <button className="flex text-xs items-center  gap-2 cursor-pointer text-gray-200 font-semibold shadow py-2 px-3 rounded-full text-nowrap hover:outline-blue-600 outline-offset-2 hover:outline bg-blue-800">
              <UserRoundPlus className="size-4" /> طلب صداقة
            </button>
          )}
          <Link
            href={`/messages/${user.id}`}
            className="flex text-xs items-center hover:outline hover:outline-green-950 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-green-950 shadow py-2 px-3 rounded-full"
          >
            <MessageCircle className="size-4" />
            تواصل
          </Link>
        </div>
      )}
    </>
  );
}

export default ProfileDetailsFooter;
