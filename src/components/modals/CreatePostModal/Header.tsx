import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
import CommentsDisabled from "./CommentsDisabled";
import TogglePinButton from "./TogglePinButton";
// ========================================================
function Header({ loading }: { loading: boolean }) {
  const { setActiveModal } = useActiveModal();
  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-2">
        <TogglePinButton disabled={loading} />
        <CommentsDisabled disabled={loading} />
      </div>
      <button
        onClick={() => setActiveModal(null)}
        className="cursor-pointer text-gray-400 h-fit hover:text-white mytransition"
      >
        <X className="size-6" strokeWidth={1}/>
      </button>
    </header>
  );
}

export default Header;
