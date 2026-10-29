import Link from "next/link";
import ReplyOptions from "./ReplyOptions";
import { Comment } from "@/types/Comment.type";
// ===============================================================
function ReplyHeader({
  reply,
  topLevelComment,
}: {
  reply: Comment;
  topLevelComment: Comment;
}) {
  if (!reply.parent) return null;
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5">
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          رداً على
          <Link
            target="_blank"
            href={`/u/${reply.parent.id}`}
            className="text-blue-400 block hover:underline"
          >
            {reply.parent?.user.name}
          </Link>
        </p>
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          في تعليق
          <Link
            target="_blank"
            href={`/u/${topLevelComment.userId}`}
            className="text-blue-400 block hover:underline"
          >
            {topLevelComment.user.name}
          </Link>
        </p>
      </div>
      <ReplyOptions reply={reply} />
    </div>
  );
}

export default ReplyHeader;
