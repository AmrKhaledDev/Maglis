import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Pin } from "lucide-react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { CreatePost_ModalFormType } from "../_types/CreatePost_ModalFormType";
// ==================================================
function TogglePinButton({
  control,
  setValue,
}: {
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
}) {
  const isPinnedToProfile = useWatch({
    control,
    name: "isPinnedToProfile",
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setValue("isPinnedToProfile", !isPinnedToProfile)}
          className={`cursor-pointer mytransition 
            ${isPinnedToProfile ? "rotate-45 text-green-500" : "text-gray-500 hover:text-white "}`}
        >
          <Pin className="size-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isPinnedToProfile ? "إلغاء التثبيت من الملف الشخصي" : "تثبيت في الملف الشخصي"}
      </TooltipContent>
    </Tooltip>
  );
}

export default TogglePinButton;
