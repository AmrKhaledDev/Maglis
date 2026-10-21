import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { redirect } from "next/navigation";
import StoryContentOverlay from "./ContentOverlay";
import StoryViewerStories from "./Stories";
import StoryViewers from "./StoryViewers/Viewers";
import StoryOptions from "../../../../../StoryOptions/StoryOptions";
import StoryAuthor from "./Author";
import Image from "next/image";
import { Story } from "@prisma/client";
import { UserStoryType } from "@/types/UserStoryType";
import Author from "./Author";
import Stories from "./Stories";
import ContentOverlay from "./ContentOverlay";
import Viewers from "./StoryViewers/Viewers";
// =======================================================
function StoryViewer({
  user,
  stories,
}: {
  user: UserStoryType;
  stories: Story[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStory = stories[currentIndex] ?? stories[0];
  const { setActiveModal } = useActiveModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) return;
  if (stories.length < 1) return redirect("/");
  return createPortal(
    <div className="fixed bg-black z-50 inset-0 backdrop-blur-3xl">
      <div className="absolute inset-0 backdrop-blur-xl z-2 bg-black/40 flex items-center justify-center">
        <div className="w-130 h-full relative">
          <Author story={currentStory} user={user} />
          <Stories stories={stories} setCurrentIndex={setCurrentIndex} />
          <ContentOverlay currentStory={currentStory} />
          <Viewers story={currentStory} />
        </div>
      </div>
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
        <StoryOptions story={currentStory} />
        <button
          onClick={() => setActiveModal(null)}
          className="cursor-pointer hover:bg-white/10 p-2 rounded-full shadow"
        >
          <X className="size-5.5" />
        </button>
      </div>
      {currentStory.media &&
        !currentStory.contentText &&
        currentStory.mediaType === "IMAGE" && (
          <div>
            <Image
              src={currentStory.media}
              alt="صورة"
              fill
              className="object-cover"
            />
          </div>
        )}
    </div>,
    document.body,
  );
}

export default StoryViewer;
