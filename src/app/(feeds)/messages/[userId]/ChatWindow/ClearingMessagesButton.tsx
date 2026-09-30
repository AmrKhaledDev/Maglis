import ClearingMessagesModal from "@/components/modals/ClearingMessagesModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { Eraser } from "lucide-react";
// ======================================================================
function ClearingMessagesButton({
  receiverId,
  buttonStyle,
  iconSize,
}: {
  receiverId: string;
  buttonStyle: string;
  iconSize: string;
}) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>
      <button
        onClick={() => setActiveModal("clearing_messages_modal")}
        className={buttonStyle}
      >
        <Eraser className={iconSize} />
        مسح الرسائل
      </button>
      {activeModal === "clearing_messages_modal" && (
        <ClearingMessagesModal receiverId={receiverId} />
      )}
    </>
  );
}

export default ClearingMessagesButton;
