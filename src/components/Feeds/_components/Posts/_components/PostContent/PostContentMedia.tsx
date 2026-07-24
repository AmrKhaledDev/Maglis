import { PostDBType } from "@/types/PostDB.type";
import ReactPlayer from "react-player";
import Image from "next/image";
import { useState } from "react";
import ShowMediaUploaded from "@/components/ShowMediaUploaded/ShowMediaUploaded";
// ==============================================
function PostContentMedia({ post }: { post: PostDBType }) {
  const [showMedia, setShowMedia] = useState({
    open: false,
    preview: "",
    mediaType: "",
  });
  return (
    <div
      className={`${post.medias.length > 1 ? "grid grid-cols-2 gap-1" : ""}`}
    >
      {post.medias.map((item) => (
        <button
          onClick={() =>
            setShowMedia({
              open: true,
              preview: item.url,
              mediaType: item.type == "IMAGE" ? "image" : "video",
            })
          }
          key={item.id}
          className={`w-full overflow-hidden bg-black rounded-lg relative ${post.medias.length > 1 ? "h-80" : "h-110"} `}
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
        </button>
      ))}
      {showMedia.open && showMedia.preview && (
        <ShowMediaUploaded setShowMedia={setShowMedia} showMedia={showMedia} />
      )}
    </div>
  );
}

export default PostContentMedia;
