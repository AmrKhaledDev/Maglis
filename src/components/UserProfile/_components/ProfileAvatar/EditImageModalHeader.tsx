import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ============================================================
function EditImageModalHeader({
  setShowEditAvatarModal,
  typeImage,
}: {
  setShowEditAvatarModal: Dispatch<SetStateAction<boolean>>;
  typeImage: "AVATAR" | "COVER";
}) {
  return (
    <div className="flex items-center justify-between p-5 text-gray-200">
      <h2>
        {typeImage == "AVATAR" ? "تعديل الصورة الشخصية" : "تعديل صورة الغلاف"}
      </h2>
      <button
        onClick={() => setShowEditAvatarModal(false)}
        className="cursor-pointer"
      >
        <X strokeWidth={1.5} className="size-5" />
      </button>
    </div>
  );
}

export default EditImageModalHeader;
