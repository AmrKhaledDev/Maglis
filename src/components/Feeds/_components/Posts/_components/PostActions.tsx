import { Bookmark, Heart, MessageCircle } from "lucide-react";
// =============================================
function PostActions() {
  return (
    <div className="flex items-center gap-3">
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
  );
}

export default PostActions;
