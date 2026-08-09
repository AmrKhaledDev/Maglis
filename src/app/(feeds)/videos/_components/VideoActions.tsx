import VideoLikeBtn from "./VideoLikeBtn";
import { MessageCircle } from "lucide-react";
import VideoSaveBtn from "./VideoSaveBtn";
import VideoOptions from "./VideoOptions";
import { PostType } from "@/types/Post.type";
// ====================================================================
function VideoActions({ video }: { video: PostType }) {
  return (
    <div className="flex items-center flex-col gap-3">
      <VideoLikeBtn video={video} />
      <button className="videoBtnActionStyle">
        <MessageCircle className="size-7" />
      </button>
      <VideoSaveBtn video={video} />
      <VideoOptions video={video} />
    </div>
  );
}

export default VideoActions;
