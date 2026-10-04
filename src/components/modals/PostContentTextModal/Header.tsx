import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
// ========================================================
function Header() {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-gray-200 font-light">المحتوى النصي</h2>
      <button
        onClick={() => setActiveModal(null)}
        className="text-gray-400 cursor-pointer hover:text-white"
      >
        <X className="size-5" strokeWidth={1} />
      </button>
    </div>
  );
}

export default Header;
