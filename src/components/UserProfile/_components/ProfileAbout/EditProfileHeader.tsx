import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ======================================
function EditProfileHeader({
  setShowEditProfileModal,
}: {
  setShowEditProfileModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-300">تعديل الملف الشخصي</h2>
        <button onClick={()=>setShowEditProfileModal(false)} className="text-gray-400 hover:text-white mytransition cursor-pointer">
          <X strokeWidth={1.5} className="size-5" />
        </button>
      </div>
      <hr className="border-white/3" />
    </div>
  );
}

export default EditProfileHeader;
