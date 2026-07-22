import { Tooltip, TooltipContent,TooltipTrigger } from "@/components/ui/tooltip";
import { Comment } from "@prisma/client";
import { BsFillPinAngleFill } from "react-icons/bs";
// ================================================================
function CommentIsPinned({ comment }: { comment: Comment }) {
  return (
    <>
      {comment.isPinned && (
        <Tooltip>
          <TooltipTrigger className="w-fit">
            <BsFillPinAngleFill className="text-gray-500 -rotate-45" />
          </TooltipTrigger>
          <TooltipContent side="left">
            مُثبت
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

export default CommentIsPinned;
