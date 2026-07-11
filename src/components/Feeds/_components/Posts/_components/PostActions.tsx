import { Bookmark, Heart, Link2, MessageCircle } from "lucide-react";
import { FaShareFromSquare } from "react-icons/fa6";
// =============================================
function PostActions() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer flex items-center gap-1 text-gray-100">
          <Heart className="size-5 fill-red-500 text-red-500" />
          <span className="text-sm text-gray-300">1</span>
        </button>
        <button className="cursor-pointer flex items-center gap-1 text-gray-100">
          <MessageCircle className="size-5" />
          <span className="text-sm text-gray-300">0</span>
        </button>
        <button className="cursor-pointer flex items-center gap-1 text-gray-100">
          <Bookmark className="size-5" />
          <span className="text-sm text-gray-300">0</span>
        </button>
      </div>
      <div className="flex items-center gap-1.5 text-gray-300">
       <Link2 className="size-4.5" /><span className="text-sm">0</span>
      </div>
    </div>
  );
}

export default PostActions;
