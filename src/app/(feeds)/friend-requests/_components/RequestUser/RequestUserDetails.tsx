import UserImage from "@/components/UserImage/UserImage";
import FriendRequest from "@/types/FriendRequest.type";
import Link from "next/link";
// ==============================================================
function RequestUserDetails({ request }: { request: FriendRequest }) {
  return (
    <div className="flex items-center gap-2">
      <UserImage
        src={request.sender.image}
        alt="صورة المستخدم"
        size="size-13"
      />
      <div>
        <Link
          href={`/u/${request.senderId}`}
          className="text-[19px] font-medium hover:underline decoration-1 [word-break:break-word] line-clamp-1"
        >
          {request.sender.name}
        </Link>
        <p className="text-sm text-gray-300 [word-break:break-word] max-w-130 line-clamp-2">
          {request.sender.bio}
        </p>
      </div>
    </div>
  );
}

export default RequestUserDetails;
