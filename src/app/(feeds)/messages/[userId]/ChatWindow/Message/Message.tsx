import { useUser } from "@/providers/UserProvider";
import MessageType from "@/types/Message.type";
import clsx from "clsx";
import dayjs from "dayjs";
import MessageOptions from "./MessageOptions";
import MessageStatus from "./MessageStatus";
// =====================================================
function Message({
  message,
  receiverId,
}: {
  message: MessageType;
  receiverId: string;
}) {
  const userSession = useUser();
  return (
    <div
      className={clsx(
        "w-full flex items-center gap-2 justify-end",
        userSession.id === message.senderId && "flex-row-reverse group",
      )}
    >
      {userSession.id === message.senderId && (
        <MessageOptions messageId={message.id} receiverId={receiverId} />
      )}
      <div
        className={clsx(
          "rounded-tr-md rounded-tl-md shadow gap-3 max-w-[60%] p-1.5 flex items-end overflow-hidden",
          userSession.id === message.senderId
            ? "bg-[#144d37] rounded-bl-md relative group"
            : "bg-white/5 rounded-br-md backdrop-blur-3xl",
        )}
      >
        <div className="flex flex-col gap-1">
          <p className="whitespace-pre-line text-sm">{message.content}</p>
          <div className="flex items-center gap-1.5">
            <span className="h-fit text-gray-300 text-xs shrink-0 w-fit">
              {dayjs(message.createdAt).format("h:m") +
                (dayjs(message.createdAt).hour() >= 12 ? " م" : " ص")}
            </span>
            {message.isEdited && (
              <span className="text-white/60 text-xs">مُعدلة</span>
            )}
          </div>
        </div>
        <MessageStatus message={message} />
      </div>
    </div>
  );
}

export default Message;
