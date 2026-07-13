import { PostDBType } from "@/types/PostDBType";
import ReactPlayer from "react-player";
import Image from "next/image";
// ==============================================
function PostContent_Media({ post }: { post: PostDBType }) {
  return (
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
            <ReactPlayer src={item.url} width="100%" height="100%" controls />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostContent_Media;
