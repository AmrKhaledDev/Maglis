import MyConversations from "./MyConversations/MyConversations";
import ChatWindow from "./ChatWindow/ChatWindow";
// ==============================================
function Chat() {
  return (
    <main className="h-[88.5vh] flex gap-5">
      <MyConversations />
      <ChatWindow />
    </main>
  );
}

export default Chat;
