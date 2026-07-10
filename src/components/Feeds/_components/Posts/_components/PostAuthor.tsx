import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
// =========================================
dayjs.extend(relativeTime);
function PostAuthor({ post }: { post: any }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={post.userImage}
        alt="صورة المستخدم"
        width={50}
        height={50}
        className="rounded-full object-cover shrink-0 size-11"
      />
      <div>
        <div className="flex items-center gap-1.5">
          <Link
            href={"/"}
            className="font-semibold text-gray-100 line-clamp-1 [word-break:break-word]"
          >
            {post.userName}
          </Link>
          <span className="size-1 rounded-full bg-white/20" />
          <button className="text-sm text-blue-400 cursor-pointer hover:underline font-semibold">
            متابعة
          </button>
        </div>
        <p className="text-xs text-slate-400 font-normal">
          {dayjs(post.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default PostAuthor;
