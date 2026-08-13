import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
import { Media } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";
import { PostType } from "@/types/Post.type";
// =========================================================
function PostContentMediaItem({
  item,
  setShowMedia,
  post,
}: {
  item: Media;
  setShowMedia: Dispatch<
    SetStateAction<{
      open: boolean;
      preview: string;
    }>
  >;
  post: PostType;
}) {
  const { playingVideoId, setPlayingVideoId } = usePlayingVideoId();
  const { ref, inView } = useInView({
    threshold: 0.6,
  });
  useEffect(() => {
    if (inView) {
      setPlayingVideoId(item.id);
    } else if (playingVideoId === item.id) {
      setPlayingVideoId("");
    }
  }, [inView]);
  return (
    <div
      ref={ref}
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
          onPlay={() => setPlayingVideoId(item.id)}
          playing={playingVideoId == item.id}
          src={item.url}
          width="100%"
          height="100%"
          controls
        />
      )}
    </div>
  );
}

export default PostContentMediaItem;
