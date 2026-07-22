import { PostDBType } from "@/types/PostDB.type";
import ReactPlayer from "react-player";
import Image from "next/image";
// ==============================================
function PostContentMedia({ post }: { post: PostDBType }) {
  return (
    <div
      className={`${post.medias.length > 1 ? "grid grid-cols-2 gap-1" : ""}`}
    >
      {post.medias.map((item) => (
        <div
          key={item.id}
          className={`w-full overflow-hidden bg-black rounded-lg relative ${post.medias.length>1 ? "h-80" :"h-110"} `}
        >
          {item.type == "IMAGE" && (
            <>
              <Image
                src={item.url}
                alt=""
                fill
                className="object-cover blur opacity-30 pointer-events-none"
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

export default PostContentMedia;
