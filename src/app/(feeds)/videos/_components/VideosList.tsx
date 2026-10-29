"use client";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "./VideoCard";
import { useUser } from "@/providers/UserProvider";
import { GetPostsVideosAction } from "@/actions/Post/GetPostsVideos.action";
import VideosSkeleton from "../../../../components/Skeletons/Videos/Skeleton";
import { Post } from "@/types/Post.type";
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
    <div className="max-w-180 mx-auto mb-3">
      {isPending ? (
        <VideosSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          {videos.map((video: Post) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VideosList;
