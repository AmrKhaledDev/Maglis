import ReactPlayer from "react-player";
import Image from "next/image";
import { useState } from "react";
import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
import { PostType } from "@/types/Post.type";
// ==============================================
function PostContentMedia({ post }: { post: PostType }) {
  const [showMedia, setShowMedia] = useState({
    open: false,
    preview: "",
  });
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  return (
    <div
      className={`${post.medias.length > 1 ? "grid grid-cols-2 gap-1" : ""}`}
    >
      {post.medias.map((item) => (
        <div
          key={item.id}
          className={`w-full overflow-hidden bg-black rounded-lg relative ${post.medias.length > 1 ? "h-80" : "h-110"} `}
        >
          {item.type == "IMAGE" && (
            <button
            className="cursor-pointer"
              onClick={() =>
                setShowMedia({
                  open: true,
                  preview: item.url,
                })
              }
            >
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
            </button>
          )}
          {item.type == "VIDEO" && (
            <ReactPlayer
              playing={playingVideoId == item.id}
              onPlay={() => setPlayingVideoId(item.id)}
              src={item.url}
              width="100%"
              height="100%"
              controls
            />
          )}
        </div>
      ))}
      {showMedia.open && showMedia.preview && (
        <MediaPreviewModal setShowMedia={setShowMedia} showMedia={showMedia} />
      )}
    </div>
  );
}

export default PostContentMedia;
