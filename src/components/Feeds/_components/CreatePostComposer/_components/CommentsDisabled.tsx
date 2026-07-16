import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquareOff } from "lucide-react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { CreatePost_ModalFormType } from "../_types/CreatePost_ModalForm.type";
// =============================================================
function CommentsDisabled({
  control,
  setValue,
  disabled,
}: {
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
  disabled: boolean;
}) {
  const isCommentsDisabled = useWatch({
    control,
    name: "commentsDisabled",
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
        disabled={disabled}
          type="button"
          onClick={() => setValue("commentsDisabled", !isCommentsDisabled)}
          className={`not-disabled:cursor-pointer mytransition
            ${isCommentsDisabled ? "text-red-500" : "text-gray-500 not-disabled:hover:text-white "}
            `}
        >
          <MessageSquareOff className="postBtnActIcon" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isCommentsDisabled ? "تشغيل التعليقات" : "إيقاف التعليقات"}
      </TooltipContent>
    </Tooltip>
  );
}

export default CommentsDisabled;
