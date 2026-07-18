import { Heart, MessageCircleReply } from "lucide-react";
// =======================================================
function CommentActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="cursor-pointer">
        <Heart strokeWidth={1.5} className="postBtnActIcon" />
      </button>
      <button className="cursor-pointer">
        <MessageCircleReply strokeWidth={1.5} className="postBtnActIcon" />
      </button>
    </div>
  );
}

export default CommentActions;
