import FollowButton from "@/components/FollowButton/FollowButton";
import UserImage from "@/components/UserImage/UserImage";
import { SessionWithRelations } from "@/types/SessionWithRelations.type";
import { UserConnection } from "@/types/UserConnection.type";
import Link from "next/link";
// =========================================================================
function UserConnectionCard({
  user,
  userSession,
}: {
  user: UserConnection;
  userSession: SessionWithRelations;
}) {
  return (
    <div className="flex items-center gap-2">
      <UserImage src={user.image} size="size-20" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          {userSession.id === user.id && (
            <p className="text-sm text-green-600 font-medium">أنت</p>
          )}
          <Link href={`/u/${user.id}`} className="hover:underline decoration-1">
            {user.name}
          </Link>
        </div>
        {user.professionalMode && userSession.id !== user.id && (
          <FollowButton
            followingId={user.id}
            iconStyle="size-4.5 stroke-1.5"
            followStyle="bg-blue-800 hover:bg-blue-700 py-1 px-4"
            publicStyle="flex items-center gap-1  rounded-sm text-sm w-fit  cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default UserConnectionCard;
