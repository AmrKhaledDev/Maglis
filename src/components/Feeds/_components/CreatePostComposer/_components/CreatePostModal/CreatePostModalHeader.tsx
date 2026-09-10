import TogglePinButton from "./TogglePinButton";
import CommentsDisabled from "./CommentsDisabled";
import { X } from "lucide-react";
import { Control, UseFormSetValue } from "react-hook-form";
import { CreatePost_ModalFormType } from "../../_types/CreatePost_ModalForm.type";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ========================================================
function CreatePostModalHeader({
  loading,
  control,
  setValue,
}: {
  loading: boolean;
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
}) {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <TogglePinButton
          disabled={loading}
          control={control}
          setValue={setValue}
        />
        <CommentsDisabled
          control={control}
          setValue={setValue}
          disabled={loading}
        />
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
