import MessageType from "@/types/Message.type";
import MessageMedia from "./MessageMedia/MessageMedia";
// =======================================================
function MessageContent({ message }: { message: MessageType }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="whitespace-pre-line text-sm [word-break:break-word] p-1">
        {message.content}
      </p>
      {message.messageMedia.length > 0 && (
        <MessageMedia messageMedia={message.messageMedia} />
      )}
    </div>
  );
}

export default MessageContent;
