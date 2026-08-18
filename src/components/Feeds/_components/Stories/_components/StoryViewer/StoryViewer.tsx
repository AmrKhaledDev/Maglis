import { StoryType } from "@/types/StoryType";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { redirect } from "next/navigation";
import StoryContentOverlay from "./StoryContentOverlay";
import StoryViewerStories from "./StoryViewerStories";
import StoryViewers from "./StoryViewers/StoryViewers";
import StoryOptions from "./StoryOptions";
import StoryAuthor from "./StoryAuthor";
import Image from "next/image";
// =======================================================
function StoryViewer({ stories }: { stories: StoryType[] }) {
  if (stories.length < 1) return redirect("/");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStory = stories[currentIndex] ?? stories[0];
  const { setActiveModal } = useActiveModal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return createPortal(
    <div className="fixed bg-black z-50 inset-0 backdrop-blur-3xl">
      <div className="absolute inset-0 backdrop-blur-xl z-2 bg-black/40 flex items-center justify-center">
        <div className="w-130 h-full relative">
          <StoryAuthor story={currentStory} />
          <StoryViewerStories
            stories={stories}
            setCurrentIndex={setCurrentIndex}
          />
          <StoryContentOverlay currentStory={currentStory} />
          <StoryViewers story={currentStory} />
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
