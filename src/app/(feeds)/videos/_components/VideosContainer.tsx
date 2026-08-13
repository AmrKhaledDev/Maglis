import VideoCard from "./VideoCard";
import { PostType } from "@/types/Post.type";
// ======================================================
function VideosContainer({ videos }: { videos: PostType[] }) {
  return (
    <div className="max-w-160 mx-auto py-5 flex flex-col gap-6">
      {videos.map((video: PostType) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideosContainer;
