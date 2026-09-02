import FriendRequestType from "@/types/FriendRequest.type";
import Image from "next/image";
// ==============================================================
function RequestUserDetails({ request }: { request: FriendRequestType }) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-13 shrink-0 rounded-full relative overflow-hidden">
        <Image
          src={request.sender.image || "/user.jpg"}
          alt="صورة المستخدم"
          className="object-cover"
          fill
        />
      </div>
      <div>
        <h2 className="text-[17px] font-medium">{request.sender.name}</h2>
        <p className="text-sm text-gray-300 max-w-130 line-clamp-2">
          {request.sender.bio}
        </p>
      </div>
    </div>
  );
}

export default RequestUserDetails;
