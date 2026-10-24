import { Story } from "@prisma/client";
import { Volume2, VolumeX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ==================================================
function ButtonSound({
  muteStoryVideo,
  setMuteStoryVideo,
  story,
}: {
  muteStoryVideo: string;
  setMuteStoryVideo: Dispatch<SetStateAction<string>>;
  story: Story;
}) {
  return (
    <button
      onClick={() =>
        setMuteStoryVideo((prev) => (prev === story.id ? "" : story.id))
      }
      className="h-5 mr-1 cursor-pointer"
    >
      {muteStoryVideo === story.id ? (
        <VolumeX className="size-5" />
      ) : (
        <Volume2 className="size-5" />
      )}
    </button>
  );
}

export default ButtonSound;
