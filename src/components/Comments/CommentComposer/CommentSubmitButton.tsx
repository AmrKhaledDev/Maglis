import { Comment } from "@/types/Comment.type";
import { Edit, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FaArrowUp } from "react-icons/fa6";
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
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={(!content.trim() && !imagePreview) || loading}
        className="p-1 rounded-full not-disabled:hover:bg-blue-800 mytransition disabled:bg-gray-400 disabled:text-gray-600 not-disabled:cursor-pointer bg-blue-600"
      >
        {currentComment ? <Edit className="size-4" /> : <FaArrowUp />}
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
