import { PostsDBType } from "@/types/PostsDBType";
import Image from "next/image";
import ReactPlayer from "react-player";
import Linkify from "linkify-react";
// ====================================================
function PostContent({ post }: { post: PostsDBType }) {
  return (
    <div className="flex flex-col gap-2">
      <Linkify
        options={{
          target: "_blank",
          rel: "noopener noreferrer",
          attributes: {
            className: "text-sky-500 hover:underline ",
          },
        }}
      >
        <span className="whitespace-pre-line text-sm">{post.content}</span>
      </Linkify>
      {post.medias.length > 0 && (
        <div
          className={`${post.medias.length > 1 ? "grid grid-cols-2 gap-1" : ""}`}
        >
          {post.medias.map((item) => (
            <div
              key={item.id}
              className={`w-full overflow-hidden bg-black rounded-xl relative h-100 `}
            >
              {item.type == "IMAGE" && (
                <Image
                  src={item.url}
                  alt="صورة من المنشور"
                  fill
                  className="object-contain"
                />
              )}
              {item.type == "VIDEO" && (
                <ReactPlayer
                  src={item.url}
                  width="100%"
                  height="100%"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostContent;
