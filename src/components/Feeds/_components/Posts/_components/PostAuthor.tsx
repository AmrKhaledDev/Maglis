import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import local from "dayjs/locale/ar";
import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDB.type";
import PostAuthor_Actions from "./PostAuthor_Action";
import PostAuthor_Privacy from "./PostAuthor_Privacy";
// =========================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function PostAuthor({ post }: { post: PostDBType }) {
  const session = useUser();
  const url =
    session.id === post.authorId ? `/u/profile` : `/u/profile/${post.authorId}`;
  return (
    <div className="flex gap-2 items-center">
      <Image
        src={post.author.image || "/user.jpg"}
        alt="صورة المستخدم"
        width={50}
        height={50}
        className="rounded-full object-cover shrink-0 size-9"
      />
      <div className="flex flex-col gap-px">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Link
              href={url}
              className="font-semibold  text-gray-100 line-clamp-1 [word-break:break-word]"
            >
              {post.author.name}
            </Link>
            <span className="size-[3.5px] rounded-full bg-white block opacity-5 shrink-0" />
            <PostAuthor_Privacy post={post} />
          </div>
          <PostAuthor_Actions post={post} />
        </div>
        <div className="flex items-center gap-1.5">
          {post.author.username && (
            <>
              <p dir="auto" className="text-[11px] text-gray-400">
                @{post.author.username}
              </p>
              <span className="size-[3.5px] rounded-full bg-white block opacity-5 shrink-0" />
            </>
          )}
          <p className="text-[11px] text-slate-400 font-normal">
            {dayjs(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostAuthor;
