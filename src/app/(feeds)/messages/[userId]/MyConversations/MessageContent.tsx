import { useUser } from "@/providers/UserProvider";
import { Message } from "@prisma/client";
import { Images } from "lucide-react";
// ==============================================
function MessageContent({
  message,
  messageMediaLength,
}: {
  message: Message | null;
  messageMediaLength: number;
}) {
  const userSession = useUser();
  return (
    <p className="text-gray-400 text-xs flex items-center gap-1">
      {message && (
        <>
          {message.senderId === userSession.id && (
            <span className="text-green-600 font-medium text-xs">أنت:</span>
          )}
          <span className="line-clamp-1">{message.content}</span>
          {messageMediaLength > 0 && (
            <>
              <Images className="size-3.5 text-gray-500" strokeWidth={1.5} />
              <span className="text-xs text-gray-500">وسائط</span>
            </>
          )}
        </>
      )}
    </p>
  );
}

export default MessageContent;
