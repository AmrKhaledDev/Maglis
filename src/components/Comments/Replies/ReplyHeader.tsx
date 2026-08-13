import Link from "next/link";
import ReplyOptions from "./ReplyOptions";
import { CommentType } from "@/types/Comment.type";
import { UrlUserProfile } from "@/lib/UrlUserProfile";
// ===============================================================
function ReplyHeader({
  reply,
  topLevelComment,
}: {
  reply: CommentType;
  topLevelComment: CommentType;
}) {
  if (!reply.parent) return null;
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5 mb-1">
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          رداً على
          <Link
            target="_blank"
            href={UrlUserProfile(reply.parent.userId)}
            className="text-blue-400 block hover:underline"
          >
            {reply.parent?.user.name}
          </Link>
        </p>
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          في تعليق
          <Link
            target="_blank"
            href={UrlUserProfile(topLevelComment.userId)}
            className="text-blue-400 block hover:underline"
          >
            {topLevelComment.user.name}
          </Link>
        </p>
      </div>
      <ReplyOptions reply={reply} commentId={topLevelComment.id} />
    </div>
  );
}

export default ReplyHeader;
