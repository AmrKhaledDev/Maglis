import FriendRequestsHeader from "./FriendRequestsHeader";
import RequestsUsers from "./RequestsUsers";
// =====================================
function FriendRequests() {
  return (
    <main className="h-fit p-3 bg-white/1 rounded-2xl overflow-hidden flex flex-col gap-10">
      <FriendRequestsHeader />
      <RequestsUsers />
    </main>
  );
}

export default FriendRequests;
