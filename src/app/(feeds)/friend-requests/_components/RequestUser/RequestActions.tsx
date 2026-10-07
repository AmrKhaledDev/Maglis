import FriendRequestType from "@/types/FriendRequest.type";
import ConfirmRequestButton from "./ConfirmRequestButton";
import RejectRequestButton from "./RejectRequestButton";
// =======================================================
function RequestActions({ request }: { request: FriendRequestType }) {
  return (
    <div className="flex items-center gap-2">
      <ConfirmRequestButton request={request} />
      <RejectRequestButton request={request} />
    </div>
  );
}

export default RequestActions;
