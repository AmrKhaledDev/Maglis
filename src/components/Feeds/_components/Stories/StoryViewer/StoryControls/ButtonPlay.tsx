import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
import { Story } from "@prisma/client";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";
// =========================================================================
function ButtonPlay({ story }: { story: Story }) {
  const { playingVideoId, setPlayingVideoId } = usePlayingVideoId();
  useEffect(() => {
    if (story) {
      setPlayingVideoId(story.id);
    }
  }, [setPlayingVideoId, story]);
  return (
    <button
      onClick={() =>
        setPlayingVideoId((prev) => (prev === story.id ? "" : story.id))
      }
      className="cursor-pointer h-5"
    >
      {playingVideoId === story.id ? (
        <IoIosPause className="size-4.5" />
      ) : (
        <FaPlay className="size-4 " />
      )}
    </button>
  );
}

export default ButtonPlay;
