import Header from "./Header";
import Users from "./Users";
// ============================================
function MyConversations() {
  return (
    <aside className="w-[320px] gap-2 flex flex-col">
      <Header />
      <Users />
    </aside>
  );
}

export default MyConversations;
