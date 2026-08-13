import ReactPlayer from "react-player";
import NoDataMessage from "./NoDataMessage";
import { useQuery } from "@tanstack/react-query";
import { GetUserVideosAction } from "@/actions/User/GetUserVideos.action";
import ProfileLoader from "./ProfileLoader";
import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
// ==========================================================
function UserVideos({ userId }: { userId: string }) {
  const { playingVideoId, setPlayingVideoId } = usePlayingVideoId();
  const {
    data: media,
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await GetUserVideosAction(userId);
      if (!result.success || !result.media)
        throw new Error(
          result.message || "حدث خطأ أثناء جلب الفيديوهات الخاصة بك.",
        );
      return result.media;
    },
    queryKey: ["user_postsVideos", userId],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="w-full justify-center flex">
      {media && media.length > 0 ? (
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
      ) : (
        <NoDataMessage
          message={error?.message || "حالياً لا يوجد أي فيديوهات."}
        />
      )}
    </div>
  );
}

export default UserVideos;
