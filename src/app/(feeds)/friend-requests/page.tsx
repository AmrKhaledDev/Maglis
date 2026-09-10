import Header from "./Header";
import FriendRequestsList from "./FriendRequestsList";
// =====================================
function FriendRequests() {
  return (
    <main className="h-fit p-3 bg-white/1 rounded-2xl overflow-hidden flex flex-col gap-10">
      <Header />
      <FriendRequestsList />
    </main>
  );
}

export default FriendRequests;
