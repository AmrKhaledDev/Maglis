import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
import { StoryType } from "@/types/StoryType";
import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import ReactPlayer from "react-player";
// =======================================================
function Storyvideo({ story }: { story: StoryType }) {
  const { playingVideoId, setPlayingVideoId } = usePlayingVideoId();
  return (
    <>
      {story.media && story.mediaType === "VIDEO" && (
        <div onClick={() => {}} className="w-full h-full relative bg-gray-900">
          <ReactPlayer
            playing={playingVideoId == story.id}
            src={story.media}
            width="100%"
            height="100%"
            onEnded={() => setPlayingVideoId(null)}
          />
          <button
            onClick={() =>
              setPlayingVideoId((prev) => (prev == story.id ? null : story.id))
            }
            className={clsx(
              "absolute top-1/2 mytransition -translate-x-1/2 -translate-y-1/2 z-2 left-1/2 p-4 bg-black/50 backdrop-blur-2xl hover:bg-black/80 rounded-full shadow cursor-pointer",
              playingVideoId === story.id &&
                "opacity-0 group-hover:opacity-100",
            )}
          >
            {playingVideoId === story.id ? (
              <Pause className="size-5" strokeWidth={1.5} />
            ) : (
              <Play className="size-5" strokeWidth={1.5} />
            )}
          </button>
          <span className="absolute inset-0 z-1 bg-black/20" />
        </div>
      )}
    </>
  );
}

export default Storyvideo;
