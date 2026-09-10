"use client";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { PostType } from "@/types/Post.type";
import { useUser } from "@/providers/UserProvider";
import { GetPostsVideosAction } from "@/actions/Post/GetPostsVideos.action";
import VideosSkeleton from "./Skeleton";
// ======================================================
function VideosList() {
  const userSession = useUser();
  const { data: videos = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetPostsVideosAction();
      return result || [];
    },
    queryKey: ["posts_videos", userSession.id],
  });
  return (
    <div className="max-w-180 mx-auto">
      {isPending ? (
        <VideosSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          {videos.map((video: PostType) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VideosList;
