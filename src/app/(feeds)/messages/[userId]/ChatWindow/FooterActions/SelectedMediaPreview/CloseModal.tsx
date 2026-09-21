import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =================================
function CloseModal({
  setShowDiscardMediaModal,
}: {
  setShowDiscardMediaModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => {
        setShowDiscardMediaModal(true);
      }}
      type="button"
      className="absolute top-5 left-5 cursor-pointer text-gray-300 hover:text-white"
    >
      <X strokeWidth={1.5} />
    </button>
  );
}

export default CloseModal;
