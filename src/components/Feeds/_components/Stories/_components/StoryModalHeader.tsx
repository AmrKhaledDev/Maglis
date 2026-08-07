import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =======================================
function StoryModalHeader({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[18px] font-semibold text-gray-300">قصة جديدة</h2>
      <button
        onClick={() => setShowModal(false)}
        className="cursor-pointer text-gray-400 hover:text-white mytransition"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

export default StoryModalHeader;
