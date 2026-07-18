import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { CreatePost_ModalFormType } from "../../_types/CreatePost_ModalForm.type";
import { TiPin } from "react-icons/ti";
// ==================================================
function TogglePinButton({
  control,
  setValue,
  disabled,
}: {
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
  disabled: boolean;
}) {
  const isPinnedToProfile = useWatch({
    control,
    name: "isPinnedToProfile",
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          disabled={disabled}
          type="button"
          onClick={() => setValue("isPinnedToProfile", !isPinnedToProfile)}
          className={`not-disabled:cursor-pointer mytransition  text-2xl
            ${isPinnedToProfile ? "text-emerald-500" : "text-gray-500 not-disabled:hover:text-white -rotate-45 "}`}
        >
          <TiPin />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isPinnedToProfile
          ? "إلغاء التثبيت من الملف الشخصي"
          : "تثبيت في الملف الشخصي"}
      </TooltipContent>
    </Tooltip>
  );
}

export default TogglePinButton;
