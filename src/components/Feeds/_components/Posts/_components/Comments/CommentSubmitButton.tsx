import { Comment } from "@prisma/client";
import { Edit, SendHorizontal, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ==========================================================
function CommentSubmitButton({
  currentComment,
  imagePreview,
  content,
  loading,
  setCurrentComment,
}: {
  currentComment: Comment | undefined | null;
  imagePreview: string;
  content: string;
  loading: boolean;
  setCurrentComment: Dispatch<SetStateAction<Comment | null >>;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={(!content.trim() && !imagePreview) || loading}
        className="p-1 rounded-full not-disabled:hover:bg-blue-800 mytransition disabled:bg-gray-400 disabled:text-gray-600 not-disabled:cursor-pointer bg-blue-600"
      >
        {currentComment ? (
          <Edit className="size-4" />
        ) : (
          <SendHorizontal className="size-4" />
        )}
      </button>
      {currentComment && (
        <button
          onClick={() => setCurrentComment(null)}
          className="text-gray-400 cursor-pointer hover:text-white mytransition"
        >
          <X strokeWidth={1.5} className="size-4" />
        </button>
      )}
    </div>
  );
}

export default CommentSubmitButton;
