import FriendRequestType from "@/types/FriendRequest.type";
import ConfirmRequestBtn from "./ConfirmRequestBtn";
import DeleteRequestBtn from "./DeleteRequestBtn";
// =======================================================
function RequestUserBtnsActions({ request }: { request: FriendRequestType }) {
  return (
    <div className="flex items-center gap-2">
      <ConfirmRequestBtn request={request} />
      <DeleteRequestBtn request={request}/>
    </div>
  );
}

export default RequestUserBtnsActions;
