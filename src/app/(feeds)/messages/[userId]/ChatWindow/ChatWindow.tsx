import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowFooter from "./ChatWindowFooter";
import ChatWindowMessages from "./ChatWindowMessages";
// ===================================================
function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col border-r border-r-white/1">
      <ChatWindowHeader />
      <ChatWindowMessages />
      <ChatWindowFooter />
    </div>
  );
}

export default ChatWindow;
