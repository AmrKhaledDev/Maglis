import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import local from "dayjs/locale/ar";
import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDBType";
import PostAuthor_Privacy from "./_components/PostAuthor_Privacy";
import PostAuthor_Actions from "./_components/PostAuthor_Action";
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
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-4">
          <Link
            href={url}
            className="font-semibold text-gray-100 line-clamp-1 [word-break:break-word]"
          >
            {post.author.name}
          </Link>
          <PostAuthor_Actions post={post} />
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-slate-200 font-normal">
            {dayjs(post.createdAt).fromNow()}
          </p>
          <span className="size-1 rounded-full bg-white block opacity-10" />
          <PostAuthor_Privacy post={post} />
        </div>
      </div>
    </div>
  );
}

export default PostAuthor;
