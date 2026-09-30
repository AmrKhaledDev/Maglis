import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/providers/UserProvider";
import MessageType from "@/types/Message.type";
import { Eye, EyeOff } from "lucide-react";
//======================================================
function MessageStatus({ message }: { message: MessageType }) {
  const userSession = useUser();
  return (
    <Tooltip>
      <TooltipTrigger>
        {userSession.id === message.senderId && message.status === "SEEN" && (
          <Eye strokeWidth={1} className="size-3.5 shrink-0" />
        )}
        {userSession.id === message.senderId && message.status === "SENT" && (
          <EyeOff strokeWidth={1} className="size-3.5 shrink-0" />
        )}
      </TooltipTrigger>
      <TooltipContent side="left">
        {userSession.id === message.senderId &&
          message.status === "SEEN" &&
          "تمت مشاهدتها"}
        {userSession.id === message.senderId &&
          message.status === "SENT" &&
          "لم يتم مشاهدتها"}
      </TooltipContent>
    </Tooltip>
  );
}

export default MessageStatus;
