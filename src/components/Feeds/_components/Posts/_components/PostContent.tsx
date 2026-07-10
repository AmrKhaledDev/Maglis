"use client";

import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";
// ====================================================
function PostContent({ post }: { post: any }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        <p className="text-gray-100 text-sm">{post.content}</p>
        <Link target="_blank" className="text-blue-500 hover:underline" dir="auto" href={""}>
          https://www.youtube.com/watch?v=xeSPUQVNBRA&t=2590s
        </Link>
      </div>
      {post.mediaType === "image" && post.media && (
        <div className="w-full h-150 relative overflow-hidden">
          <Image
            src={post.media}
            alt="صورة المنشور"
            fill
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
      )}
      {post.mediaType === "video" && post.media && (
        <div className="w-full h-150 rounded-lg overflow-hidden">
          <ReactPlayer src={post.media} width="100%" height="100%" />
        </div>
      )}
    </div>
  );
}

export default PostContent;
