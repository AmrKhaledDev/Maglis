import MessageType from "@/types/Message.type";
import MessageStatus from "./MessageStatus";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
// ======================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function Footer({ message }: { message: MessageType }) {
  return (
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
  );
}

export default Footer;
