import FollowButton from "@/components/FollowButton/FollowButton";
import UserImage from "@/components/UserImage/UserImage";
import UserConnectionType from "@/types/UserConnection.type";
import Link from "next/link";
// =========================================================================
function UserConnectionCard({ user }: { user: UserConnectionType }) {
  return (
    <div className="flex items-center gap-2">
      <UserImage src={user.image} size="size-20" />
      <div className="flex flex-col gap-2">
        <Link href={`/u/${user.id}`} className="hover:underline decoration-1">
          {user.name}
        </Link>
        {user.professionalMode && (
          <FollowButton
            followingId={user.id}
            iconStyle="size-4.5 stroke-1.5"
            followColor="bg-blue-800 hover:bg-blue-700"
            unfollowColor=""
            publicStyle="flex items-center gap-1 py-1 px-4 rounded-sm text-sm w-fit  cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default UserConnectionCard;
