import StoryOptions from "@/components/StoryOptions/StoryOptions";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { Story } from "@prisma/client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import ButtonPlay from "./ButtonPlay";
import ButtonSound from "./ButtonSound";
// ==================================================================================
function StoryControls({
  story,
  muteStoryVideo,
  setMuteStoryVideo,
}: {
  story: Story;
  muteStoryVideo: string;
  setMuteStoryVideo: Dispatch<SetStateAction<string>>;
}) {
  const { setActiveModal } = useActiveModal();  
  return (
    <div className="flex items-center gap-1">
      {story.media && story.mediaType === "VIDEO" && (
        <>
          <ButtonPlay story={story} />
          <ButtonSound
            setMuteStoryVideo={setMuteStoryVideo}
            muteStoryVideo={muteStoryVideo}
            story={story}
          />
        </>
      )}
      <StoryOptions story={story} />
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setActiveModal(null)}
        className="cursor-pointer h-5"
      >
        <X className="size-5" />
      </motion.button>
    </div>
  );
}

export default StoryControls;
