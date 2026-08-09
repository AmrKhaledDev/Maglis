"use client";
import { useState } from "react";
import VideoCard from "./VideoCard";
import { PostType } from "@/types/Post.type";
// ======================================================
function VideosContainer({ videos }: { videos: PostType[] }) {
  const [playedVideoId, setPlayedVideoId] = useState("");
  return (
    <div className="max-w-230 mx-auto py-10 flex flex-col gap-13">
      {videos.map((video: PostType) => (
        <VideoCard
          key={video.id}
          video={video}
          playedVideoId={playedVideoId}
          setPlayedVideoId={setPlayedVideoId}
        />
      ))}
    </div>
  );
}

export default VideosContainer;
