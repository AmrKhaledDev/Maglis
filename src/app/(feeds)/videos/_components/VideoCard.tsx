"use client";
import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
import { PostType } from "@/types/Post.type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import Author from "./Author";
import Content from "./Content";
import VideoActions from "./VideoActions";
// ====================================================
function VideoCard({ video }: { video: PostType }) {
  const { playingVideoId, setPlayingVideoId } = usePlayingVideoId();
  const { ref, inView } = useInView({
    threshold: 0.6,
  });
  useEffect(() => {
    if (inView) {
      setPlayingVideoId(video.id);
    } else if (playingVideoId === video.id) {
      setPlayingVideoId("");
    }
  }, [inView]);
  return (
    <div key={video.id} className="flex items-center gap-15">
      <VideoActions video={video} />
      <div className="flex-1 flex flex-col gap-5 bg-white/5 p-4 rounded-2xl ring ring-white/10 shadow">
        <div
          ref={ref}
          className="w-full h-150 rounded-md overflow-hidden bg-black shadow"
        >
          <ReactPlayer
            onPlay={() => setPlayingVideoId(video.id)}
            playing={playingVideoId === video.id}
            src={video.media[0].url}
            width="100%"
            height="100%"
            controls
          />
        </div>
        <div className="flex flex-col gap-5 rounded-lg">
          <Content video={video} />
          <Author video={video} />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
