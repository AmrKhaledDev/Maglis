import ReactPlayer from "react-player";
import VideoActions from "./VideoActions";
import VideoAuthor from "./VideoAuthor";
import VideoContent from "./VideoContent";
import { Dispatch, SetStateAction } from "react";
import { PostType } from "@/types/Post.type";
// ====================================================
function VideoCard({
  video,
  playedVideoId,
  setPlayedVideoId,
}: {
  video: PostType;
  playedVideoId: string;
  setPlayedVideoId: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div key={video.id} className="flex items-center gap-10">
      <VideoActions video={video} />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="w-full h-100 rounded-md overflow-hidden bg-black shadow">
          <ReactPlayer
            onPlay={() => setPlayedVideoId(video.id)}
            playing={playedVideoId === video.id}
            src={video.medias[0].url}
            width="100%"
            height="100%"
            controls
          />
        </div>
        <div className="flex flex-col gap-5 bg-black/40 p-5 shadow rounded-lg">
          <VideoContent video={video} />
          <VideoAuthor video={video} />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
