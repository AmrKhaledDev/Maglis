import { useUser } from "@/providers/UserProvider";
import MessageType from "@/types/Message.type";
import { Eye, EyeClosed } from "lucide-react";
//======================================================
function MessageStatus({ message }: { message: MessageType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id === message.senderId && message.status === "SEEN" && (
        <Eye className="size-3.5 text-blue-400 shrink-0" />
      )}
      {userSession.id === message.senderId && message.status === "SENT" && (
        <EyeClosed className="size-3.5 shrink-0" />
      )}
    </>
  );
}

export default MessageStatus;
