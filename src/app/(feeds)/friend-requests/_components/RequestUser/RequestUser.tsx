import FriendRequestType from "@/types/FriendRequest.type";
import RequestActions from "./RequestActions";
import RequestUserDetails from "./RequestUserDetails";
// ===========================
function RequestUser({ request }: { request: FriendRequestType }) {
  return (
    <div className="flex items-center border-b border-b-white/1 justify-between last:border-none pb-3 last:pb-0">
      <RequestUserDetails request={request} />
      <RequestActions request={request}/>
    </div>
  );
}

export default RequestUser;
