import ClearingMessagesModal from "@/components/modals/ClearingMessagesModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { Eraser } from "lucide-react";
// ======================================================================
function ClearingMessagesButton({ receiverId }: { receiverId: string }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>
      <button
        onClick={() => setActiveModal("clearing_messages_modal")}
        className="btnOptBox"
      >
        <Eraser className="btnOptIcon" />
        مسح الرسائل
      </button>
      {activeModal === "clearing_messages_modal" && (
        <ClearingMessagesModal receiverId={receiverId} />
      )}
    </>
  );
}

export default ClearingMessagesButton;
