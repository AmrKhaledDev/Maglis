"use client";
import useIsUserBlocked from "@/hooks/useIsUserBlocked";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { IoLockClosedSharp } from "react-icons/io5";
import BlockedUserChatActions from "./BlockedUserChatActions";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
// ===================================================
function ChatWindow({ receiver }: { receiver: User }) {
  const userSession = useUser();
  const isReceiverBlocked = useIsUserBlocked(receiver.id);
  const isBlocked = userSession.blocked.some(
    (block) => block.blockerId === receiver.id,
  );
  return (
    <div
      style={{ backgroundImage: "url('/chat_bg.png')" }}
      className="flex-1 flex flex-col relative"
    >
      <Header receiver={receiver} />
      <Messages receiverId={receiver.id} />
      {isReceiverBlocked ? (
        <BlockedUserChatActions receiverId={receiver.id} />
      ) : isBlocked ? (
        <div className="flex flex-col items-center justify-center gap-1.5 backdrop-blur-3xl bg-[#1d1f1f3f] p-3 border-t border-t-white/3">
          <IoLockClosedSharp className="text-3xl text-gray-600 mb-1!" />
          <p className="font-medium text-[18px]">
            لا يمكنك مراسلة هذا المستخدم
          </p>
          <p className="text-sm text-gray-300">قام هذا المستخدم بحظرك</p>
        </div>
      ) : (
        <Footer receiverId={receiver.id} />
      )}
    </div>
  );
}

export default ChatWindow;
