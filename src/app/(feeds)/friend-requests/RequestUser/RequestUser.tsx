import FriendRequestType from "@/types/FriendRequest.type";
import RequestUserBtnsActions from "./RequestUserBtnsActions";
import RequestUserDetails from "./RequestUserDetails";
// ===========================
function RequestUser({ request }: { request: FriendRequestType }) {
  return (
    <div className="flex items-center border-b border-b-white/1 justify-between last:border-none pb-3 last:pb-0">
      <RequestUserDetails request={request} />
      <RequestUserBtnsActions request={request}/>
    </div>
  );
}

export default RequestUser;
