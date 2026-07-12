import Image from "next/image";
import ReactPlayer from "react-player";
import Linkify from "linkify-react";
import { PostDBType } from "@/types/PostDBType";
// ====================================================
function PostContent({ post }: { post: PostDBType }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Linkify
        options={{
          target: "_blank",
          rel: "noopener noreferrer",
          attributes: {
            className: "text-sky-500 hover:underline ",
          },
        }}
      >
        <p dir="auto" className="whitespace-pre-line text-sm">
          {post.content}
        </p>
      </Linkify>
      {post.medias.length > 0 && (
        <div
          className={`${post.medias.length > 1 ? "grid grid-cols-2 gap-1" : ""}`}
        >
          {post.medias.map((item) => (
            <div
              key={item.id}
              className={`w-full overflow-hidden bg-black rounded-lg relative h-100 `}
            >
              {item.type == "IMAGE" && (
                <>
                  <Image
                    src={item.url}
                    alt=""
                    fill
                    className="object-cover blur-xl opacity-30 pointer-events-none"
                  />
                  <Image
                    src={item.url}
                    alt="صورة من المنشور"
                    fill
                    className="object-contain relative z-8"
                  />
                </>
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
