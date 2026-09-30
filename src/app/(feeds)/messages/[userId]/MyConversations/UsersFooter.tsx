import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import dayjs from "dayjs";
import { Message, Prisma, User } from "@prisma/client";
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
  user: Prisma.UserGetPayload<{
    select: { id: true; image: true; name: true };
  }>;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-gray-200">{user.name}</h2>
        {message && (
          <p className="text-xs text-gray-400">
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
