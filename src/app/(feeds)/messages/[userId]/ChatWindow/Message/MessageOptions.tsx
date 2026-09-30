import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import clsx from "clsx";
import { Ellipsis } from "lucide-react";
import EditMessageModal from "../../../../../../components/modals/EditMessageModal/EditMessageModal";
import DeleteMessageModal from "../../../../../../components/modals/DeleteMessageModal";
import MessageOptionsMenu from "./MessageOptionsMenu";
import { Message } from "@prisma/client";
// =========================================================
function MessageOptions({
  message,
  receiverId,
}: {
  message: Message;
  receiverId: string;
}) {
  const { activeModal } = useActiveModal();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="relative">
      <button
        onClick={() => setActiveMenu(message.id)}
        className={clsx(
          "cursor-pointer mytransition hover:bg-white/5 p-1 rounded-full z-10 text-gray-500 h-fit backdrop-blur-3xl btnOpt btnActiveMenu",
          activeMenu === message.id ? "block" : "group-hover:block hidden",
        )}
      >
        <Ellipsis strokeWidth={1} className="size-4" />
      </button>
      <MessageOptionsMenu message={message} />
      {activeModal === "delete_message" + message.id && (
        <DeleteMessageModal message={message} receiverId={receiverId} />
      )}
      {activeModal === "edit_message" + message.id && (
        <EditMessageModal message={message} />
      )}
    </div>
  );
}

export default MessageOptions;
