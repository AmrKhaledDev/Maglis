import { User } from "@prisma/client";
import Header from "./Header";
import Messages from "./Messages";
import Footer from "./Footer";
// ===================================================
function ChatWindow({ receiver }: { receiver: User }) {
  return (
    <div
      style={{ backgroundImage: "url('/chat_bg.png')" }}
      className="flex-1 flex flex-col"
    >
      <Header receiver={receiver} />
      <Messages receiverId={receiver.id} />
      <Footer receiverId={receiver.id} />
    </div>
  );
}

export default ChatWindow;
