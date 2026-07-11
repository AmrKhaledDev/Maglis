import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageSquareOff } from "lucide-react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { CreatePost_ModalFormType } from "../_types/CreatePost_ModalFormType";
// =============================================================
function CommentsDisabled({
  control,
  setValue,
}: {
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
}) {
  const isCommentsDisabled = useWatch({
    control,
    name: "commentsDisabled",
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
        type="button"
          onClick={() => setValue("commentsDisabled", !isCommentsDisabled)}
          className={`cursor-pointer mytransition
            ${isCommentsDisabled ? "text-red-500" : "text-gray-500 hover:text-white "}
            `}
        >
          <MessageSquareOff className="size-4.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isCommentsDisabled ? "تشغيل التعليقات" : "إيقاف التعليقات"}
      </TooltipContent>
    </Tooltip>
  );
}

export default CommentsDisabled;
