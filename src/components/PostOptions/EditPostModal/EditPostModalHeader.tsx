import { MessageSquareOff, X } from "lucide-react";
import { TiPin } from "react-icons/ti";
import { UseFormSetValue } from "react-hook-form";
import { EditPostModalFormType } from "../../PostCard/_types/EditPostModalForm.type";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ========================================================
function EditPostModalHeader({
  setValue,
  isPinnedToProfile,
  commentsDisabled,
  loading,
}: {
  setValue: UseFormSetValue<EditPostModalFormType>;
  isPinnedToProfile: boolean;
  commentsDisabled: boolean;
  loading: boolean;
}) {
  const { activeModal, setActiveModal } = useActiveModal();
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
      <button
        type="button"
        onClick={() => setActiveModal(null)}
        className="cursor-pointer button"
      >
        <X className="size-5" strokeWidth={1.4} />
      </button>
    </div>
  );
}

export default EditPostModalHeader;
