import UserImage from "@/components/UserImage/UserImage";
import { CommentType } from "@/types/Comment.type";
import { PostType } from "@/types/Post.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// =======================================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function ReplyAuthor({ reply, post }: { reply: CommentType; post: PostType }) {
  return (
    <div className="flex items-center gap-2">
      <UserImage src={reply.user.image} alt={reply.user.name} size="size-6.5" />
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          <h2 className="text-[11px]">{reply.user.name}</h2>
          <span className="size-0.5 rounded-full block bg-white opacity-25" />
          <p className="text-[10px] text-slate-300">{reply.user.username}@</p>
          {reply.isEdited && (
            <p className="text-[10px] mr-2 text-gray-400">مُعدله</p>
          )}
          {post.authorId == reply.user.id && (
            <p className="mr-4 text-slate-300 text-[10px] bg-[#09090B]/20 py-px px-2 rounded ring ring-[#09090B]/25">
              الكاتب
            </p>
          )}
        </div>
        <p className="text-[9px] text-slate-300">
          {dayjs(reply.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default ReplyAuthor;
