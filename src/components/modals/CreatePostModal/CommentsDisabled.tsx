import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { MessageSquareOff } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
// =============================================================
function CommentsDisabled({ disabled }: { disabled: boolean }) {
  const { control, setValue } = useFormContext();
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
          className={clsx(
            "not-disabled:cursor-pointer mytransition",
            isCommentsDisabled
              ? "text-red-500"
              : "text-gray-500 not-disabled:hover:text-white ",
          )}
        >
          <MessageSquareOff className="btnOptIcon" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isCommentsDisabled ? "تشغيل التعليقات" : "إيقاف التعليقات"}
      </TooltipContent>
    </Tooltip>
  );
}

export default CommentsDisabled;
