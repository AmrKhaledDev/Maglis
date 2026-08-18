import { StoryType } from "@/types/StoryType";
import clsx from "clsx";
import { useState } from "react";
// =======================================================
function StoryContentOverlay({ currentStory }: { currentStory: StoryType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      {currentStory.media && currentStory.contentText && (
        <div
          className={clsx(
            "absolute p-4 min-h-20 bottom-0 bg-black/20 backdrop-blur w-full flex items-center justify-center flex-col gap-2 z-5",
            isExpanded && "backdrop-blur-3xl",
          )}
        >
          <p
            className={clsx(
              "leading-8 [word-break:break-word]",
              !isExpanded && "line-clamp-3",
            )}
          >
            {currentStory.contentText}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={currentStory.contentText.trim().length < 273}
            className="font-semibold disabled:hidden cursor-pointer hover:underline"
          >
            {isExpanded ? "عرض أقل" : " عرض المزيد"}
          </button>
        </div>
      )}
    </>
  );
}

export default StoryContentOverlay;
