import { useUser } from "@/providers/UserProvider";
import MessageType from "@/types/Message.type";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import MessageMedia from "./MessageMedia/MessageMedia";
import MessageOptions from "./MessageOptions";
import MessageStatus from "./MessageStatus";
// =====================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
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
        <MessageOptions message={message} receiverId={receiverId} />
      )}
      <div
        className={clsx(
          "rounded-tr-md rounded-tl-md shadow gap-3 max-w-[60%] p-1.5 flex items-end overflow-hidden backdrop-blur-[2px]",
          userSession.id === message.senderId
            ? "bg-blue-900 rounded-bl-md relative group "
            : "bg-white/5 rounded-br-md backdrop-blur-3xl",
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="whitespace-pre-line text-sm [word-break:break-word]">
            {message.content}
          </p>
          {message.messageMedia.length > 0 && (
            <MessageMedia messageMedia={message.messageMedia} />
          )}
          <div className="flex items-center gap-5 w-full justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-fit text-gray-300 text-[10px] shrink-0 w-fit">
                {dayjs(message.createdAt).fromNow()}
              </span>
              {message.isEdited && (
                <span className="text-white/70 text-xs">مُعدلة</span>
              )}
            </div>
            <MessageStatus message={message} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
