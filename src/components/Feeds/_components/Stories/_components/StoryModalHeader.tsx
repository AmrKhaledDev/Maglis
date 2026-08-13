import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
// =======================================
function StoryModalHeader() {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[18px] font-semibold text-gray-300">قصة جديدة</h2>
      <button
        onClick={() => setActiveModal(null)}
        className="cursor-pointer text-gray-400 hover:text-white mytransition"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

export default StoryModalHeader;
