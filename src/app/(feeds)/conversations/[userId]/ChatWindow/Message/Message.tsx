import { useUser } from "@/providers/UserProvider";
import MessageType from "@/types/Message.type";
import clsx from "clsx";
import Footer from "./Footer";
import MessageContent from "./MessageContent";
import MessageOptions from "./MessageOptions";
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
      <MessageOptions message={message} receiverId={receiverId} />
      <div
        className={clsx(
          "rounded-tr-lg rounded-tl-lg shadow gap-3 md:max-w-[60%] sm:max-w-[65%] p-1.5 flex items-end  backdrop-blur-[2px]",
          userSession.id === message.senderId
            ? "bg-blue-950 rounded-bl-lg relative group "
            : "bg-[#25292A] rounded-br-lg backdrop-blur-3xl",
          message.messageMedia.length < 1 ? "max-w-[70%]" : "max-w-[96%] ",
        )}
      >
        <div className="flex flex-col gap-2 w-full">
          <MessageContent message={message} />
          <Footer message={message} />
        </div>
      </div>
    </div>
  );
}

export default Message;
