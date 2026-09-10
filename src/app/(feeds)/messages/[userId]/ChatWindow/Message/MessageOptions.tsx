import clsx from "clsx";
import { Ellipsis } from "lucide-react";
import MessageDeleteAlert from "./DeleteMessageAlert";
import EditMessageModal from "./EditMessageModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import MessageOptionsMenu from "./MessageOptionsMenu";
// =========================================================
function MessageOptions({
  messageId,
  receiverId,
}: {
  messageId: string;
  receiverId: string;
}) {
  const { activeModal } = useActiveModal();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="relative">
      <button
        onClick={() => setActiveMenu(messageId)}
        className={clsx(
          "cursor-pointer mytransition hover:bg-white/5 p-1 rounded-full z-10 text-gray-500 h-fit backdrop-blur-3xl btnOpt btnActiveMenu",
          activeMenu === messageId ? "block" : "group-hover:block hidden",
        )}
      >
        <Ellipsis strokeWidth={1} className="size-4" />
      </button>
      {activeMenu === messageId && <MessageOptionsMenu />}
      {activeModal === "show_alertDelete_box" && (
        <MessageDeleteAlert messageId={messageId} receiverId={receiverId} />
      )}
      {activeModal === "edit_message" && <EditMessageModal />}
    </div>
  );
}

export default MessageOptions;
