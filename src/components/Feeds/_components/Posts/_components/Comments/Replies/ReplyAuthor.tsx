import { CommentDbType } from "@/types/Comment.type";
import { PostDBType } from "@/types/PostDB.type";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "@/providers/UserProvider";
// =======================================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");

function ReplyAuthor({
  reply,
  post,
}: {
  reply: CommentDbType;
  post: PostDBType;
}) {
  const user = useUser();
  return (
    <div className="flex items-center gap-2">
      <Image
        src={reply.user.image || "/user.jpg"}
        alt="صورة المستخدم"
        width={40}
        height={40}
        className="size-6.5 rounded-full object-cover shrink-0"
      />
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          <h2 className="text-[11px]">{reply.user.name}</h2>
          <span className="size-0.5 rounded-full block bg-white opacity-25" />
          <p dir="auto" className="text-[10px] text-slate-300">
            @{reply.user.username}
          </p>
          {post.authorId == user.id && (
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
