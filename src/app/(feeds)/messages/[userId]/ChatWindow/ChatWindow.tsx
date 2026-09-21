"use client";
import useIsBlocked from "@/hooks/useIsBlocked";
import { User } from "@prisma/client";
import ChatActions from "./ChatActions";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
// ===================================================
function ChatWindow({ receiver }: { receiver: User }) {
  const isBlocked = useIsBlocked(receiver.id);
  return (
    <div
      style={{ backgroundImage: "url('/chat_bg.png')" }}
      className="flex-1 flex flex-col relative"
    >
      <Header receiver={receiver} />
      <Messages receiverId={receiver.id} />
      {isBlocked ? (
        <ChatActions receiverId={receiver.id} />
      ) : (
        <Footer receiverId={receiver.id} />
      )}
    </div>
  );
}

export default ChatWindow;
