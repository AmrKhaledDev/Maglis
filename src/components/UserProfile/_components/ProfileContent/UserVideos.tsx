import { GetVideosAction } from "@/actions/User/GetVideos.action";
import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import ProfileLoader from "./ProfileLoader";
// ==========================================================
function UserVideos({ userId }: { userId: string }) {
  const { playingVideoId, setPlayingVideoId } = usePlayingVideoId();
  const { data: media = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetVideosAction(userId);
      if (!result.success || !result.media) return;
      return result.media;
    },
    queryKey: ["user_postsVideos", userId],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="w-full justify-center flex">
      <div className="grid grid-cols-3 gap-4 w-full">
        {media.map((video) => (
          <button
            key={video.id}
            className="overflow-hidden group relative rounded-xl cursor-pointer"
          >
            <ReactPlayer
              src={video.url}
              width="100%"
              height="100%"
              className="object-cover "
              controls
              playing={playingVideoId === video.id}
              onPlay={() => setPlayingVideoId(video.id)}
              onPause={() => {
                if (playingVideoId === video.id) {
                  setPlayingVideoId(null);
                }
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserVideos;
