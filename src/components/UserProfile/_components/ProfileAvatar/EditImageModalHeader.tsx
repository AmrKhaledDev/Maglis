import { useActiveModal } from "@/providers/ActiveModalProvider";
import { X } from "lucide-react";
// ============================================================
function EditImageModalHeader({
  typeImage,
}: {
  typeImage: "AVATAR" | "COVER";
}) {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center justify-between p-5 text-gray-200">
      <h2>
        {typeImage == "AVATAR" ? "تعديل الصورة الشخصية" : "تعديل صورة الغلاف"}
      </h2>
      <button onClick={() => setActiveModal(null)} className="cursor-pointer">
        <X strokeWidth={1.5} className="size-5" />
      </button>
    </div>
  );
}

export default EditImageModalHeader;
