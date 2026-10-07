import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
// ==============================================================
function Header() {
  const { setActiveModal } = useActiveModal();
  return (
    <header className="flex items-center p-3 bg-black/40">
      <button
        onClick={() => setActiveModal(null)}
        className="cursor-pointer text-gray-400 hover:text-white"
      >
        <X strokeWidth={1} className="size-6" />
      </button>
      <h1 className="flex-1 text-center text-[18px] font-semibold">
        بدء محادثة جديدة
      </h1>
    </header>
  );
}

export default Header;
