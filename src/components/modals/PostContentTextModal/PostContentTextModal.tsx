import UserImage from "@/components/UserImage/UserImage";
import { PostType } from "@/types/Post.type";
import Link from "next/link";
import { createPortal } from "react-dom";
import Header from "./Header";
import Text from "./Text";
// ==============================================================
function PostContentTextModal({ post }: { post: PostType }) {
  return createPortal(
    <div className="fixed flex items-center justify-center inset-0 bg-black/30  z-100 backdrop-blur-[3px]">
      <div className="modalBgColor max-w-200 min-w-90 p-5 rounded-xl shadow flex flex-col gap-8">
        <Header />
        <div className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-xs text-gray-200">
            من منشور
            <Link
              href={`/u/${post.authorId}`}
              className="font-medium hover:underline decoration-1"
            >
              {post.author.name}
            </Link>
          </h2>
          <div className="flex gap-3">
            <UserImage
              src={post.author.image}
              alt={post.author.name}
              size="size-10"
            />
            <Text post={post} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PostContentTextModal;
