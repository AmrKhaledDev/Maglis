import { useUser } from "@/providers/UserProvider";
import MessageType from "@/types/Message.type";
import { Eye, EyeOff } from "lucide-react";
//======================================================
function MessageStatus({ message }: { message: MessageType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id === message.senderId && message.status === "SEEN" && (
        <Eye className="size-3.5 text-green-500 shrink-0" />
      )}
      {userSession.id === message.senderId && message.status === "SENT" && (
        <EyeOff  className="size-3.5 shrink-0" />
      )}
    </>
  );
}

export default MessageStatus;
