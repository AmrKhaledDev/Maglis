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
          "rounded-tr-lg rounded-tl-lg shadow gap-3 max-w-[60%] p-1.5 flex items-end overflow-hidden backdrop-blur-[2px]",
          userSession.id === message.senderId
            ? "bg-blue-950 rounded-bl-lg relative group "
            : "bg-[#25292A] rounded-br-lg backdrop-blur-3xl",
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="whitespace-pre-line text-sm [word-break:break-word] p-1">
              {message.content}
            </p>
            {message.messageMedia.length > 0 && (
              <MessageMedia messageMedia={message.messageMedia} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-full h-[0.5px] bg-white/2 rounded-full block" />
            <div className="flex items-center gap-5 w-full justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-fit text-gray-300 text-[10px] shrink-0 w-fit">
                  {dayjs(message.createdAt).fromNow()}
                </span>
                {message.isEdited && (
                  <>
                    <span className="size-0.75 rounded-full bg-white/30" />
                    <span className="text-gray-300 text-[10px]">مُعدلة</span>
                  </>
                )}
              </div>
              <MessageStatus message={message} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
