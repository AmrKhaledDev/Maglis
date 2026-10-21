import { PostType } from "@/types/Post.type";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import Header from "./Header";
import Text from "./Text";
// ==============================================================
function PostContentTextModal({ post }: { post: PostType }) {  
  return createPortal(
    <div className="fixed flex items-center justify-center inset-0 bg-black/30  z-100">
      <div className="modalBgColor max-w-200 min-w-70 p-5 rounded-xl shadow flex flex-col gap-8">
        <Header />
        <div className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-xs text-gray-200">
            من منشور
            <Link href={`/u/${post.authorId}`} className="font-medium">
              {post.author.name}
            </Link>
          </h2>
          <div className="flex gap-3">
            <div className="size-10 relative shrink-0">
              <Image
                src={post.author.image || "/user.jpg"}
                alt={post.author.name}
                className="rounded-full object-cover"
                fill
              />
            </div>
            <Text post={post} />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PostContentTextModal;
