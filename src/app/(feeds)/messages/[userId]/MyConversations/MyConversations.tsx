import MyConversationsHeader from "./MyConversationsHeader";
import MyConversationsUsers from "./MyConversationsUsers";
// ============================================
function MyConversations() {
  return (
    <aside className="w-[320px] gap-2 flex flex-col">
      <MyConversationsHeader />
      <MyConversationsUsers />
    </aside>
  );
}

export default MyConversations;
