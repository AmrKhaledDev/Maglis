"use client";
import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import VideosSkeleton from "../../../../components/Skeletons/Videos/Skeleton";
import VideoCard from "./VideoCard";
// ======================================================
function VideosList() {
  const userSession = useUser();
  const { data: videos = [], isPending } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get<{ success: boolean; videos: Post[] }>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/videos`,
          {
            withCredentials: true,
          },
        );
        return data.videos || [];
      } catch (error) {
        console.error(error);
        return [];
      }
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
