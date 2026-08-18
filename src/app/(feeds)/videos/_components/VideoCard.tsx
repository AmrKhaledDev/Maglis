"use client";
import ReactPlayer from "react-player";
import VideoActions from "./VideoActions";
import VideoAuthor from "./VideoAuthor";
import VideoContent from "./VideoContent";
import { useEffect } from "react";
import { PostType } from "@/types/Post.type";
import { useInView } from "react-intersection-observer";
import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
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
            src={video.medias[0].url}
            width="100%"
            height="100%"
            controls
          />
        </div>
        <div className="flex flex-col gap-5 shadow rounded-lg">
          <VideoContent video={video} />
          <VideoAuthor video={video} />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
