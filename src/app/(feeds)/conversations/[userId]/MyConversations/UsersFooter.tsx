import { Message } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import UserMemberType from "../../_types/UserMember.type";
import MessageContent from "./MessageContent";
// ==============================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function UsersFooter({
  message,
  messageMediaLength,
  user,
}: {
  message: Message | null;
  messageMediaLength: number;
  user: UserMemberType;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-gray-200 xl:text-[15px] text-sm">{user.name}</h2>
        {message && (
          <p className="xl:text-xs text-[10px] text-gray-400">
            {dayjs(message.createdAt).fromNow()}
          </p>
        )}
      </div>
      <MessageContent
        message={message}
        messageMediaLength={messageMediaLength}
      />
    </div>
  );
}

export default UsersFooter;
