import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
// ======================================
function Header() {
  const { setActiveModal } = useActiveModal();
  return (
    <header className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className=" text-gray-200 flex-1 text-center text-xl">
          تعديل الملف الشخصي
        </h2>
        <button
          onClick={() => setActiveModal(null)}
          className="text-gray-400 hover:text-white mytransition cursor-pointer"
        >
          <X strokeWidth={1} className="size-6" />
        </button>
      </div>
    </header>
  );
}

export default Header;
