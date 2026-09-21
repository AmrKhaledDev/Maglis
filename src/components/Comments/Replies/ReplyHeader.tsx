import { useUrlUserProfile } from "@/hooks/useUrlUserProfile";
import { CommentType } from "@/types/Comment.type";
import Link from "next/link";
import ReplyOptions from "./ReplyOptions";
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
      <div className="flex items-center gap-5">
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          رداً على
          <Link
            target="_blank"
            href={useUrlUserProfile(reply.parent.userId)}
            className="text-blue-400 block hover:underline"
          >
            {reply.parent?.user.name}
          </Link>
        </p>
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          في تعليق
          <Link
            target="_blank"
            href={useUrlUserProfile(topLevelComment.userId)}
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
