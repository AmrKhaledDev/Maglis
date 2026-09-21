import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
import CommentsDisabled from "./CommentsDisabled";
import TogglePinButton from "./TogglePinButton";
// ========================================================
function CreatePostModalHeader({ loading }: { loading: boolean }) {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <TogglePinButton disabled={loading} />
        <CommentsDisabled disabled={loading} />
      </div>
      <button
        onClick={() => setActiveModal(null)}
        className="cursor-pointer text-gray-300 h-fit hover:text-white mytransition"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

export default CreatePostModalHeader;
