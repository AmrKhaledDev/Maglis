import { MessageSquareOff, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { TiPin } from "react-icons/ti";
import { EditPostModalFormType } from "../_types/EditPostModalForm.type";
import { UseFormSetValue } from "react-hook-form";
// ========================================================
function EditPostBtn_Modal_Header({
  setModal,
  setValue,
  isPinnedToProfile,
  commentsDisabled,
  loading,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<EditPostModalFormType>;
  isPinnedToProfile: boolean;
  commentsDisabled: boolean;
  loading: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <button
          disabled={loading}
          onClick={() => setValue("isPinnedToProfile", !isPinnedToProfile)}
          type="button"
          className={`not-disabled:cursor-pointer mytransition  text-2xl
               ${isPinnedToProfile ? "text-emerald-500" : "text-gray-500 not-disabled:hover:text-white -rotate-45 "}`}
        >
          <TiPin />
        </button>
        <button
          disabled={loading}
          type="button"
          onClick={() => setValue("commentsDisabled", !commentsDisabled)}
          className={`not-disabled:cursor-pointer mytransition
               ${commentsDisabled ? "text-red-500" : "text-gray-500 not-disabled:hover:text-white "}
               `}
        >
          <MessageSquareOff className="postBtnActIcon" />
        </button>
      </div>
      <button onClick={() => setModal(false)} className="cursor-pointer">
        <X className="size-5" strokeWidth={1.4} />
      </button>
    </div>
  );
}

export default EditPostBtn_Modal_Header;
