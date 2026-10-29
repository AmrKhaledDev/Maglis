import StoryType from "@/components/Feeds/_types/Story.type";
import StoryViewersModal from "@/components/modals/StoryViewersModal/StoryViewersModal";
import { useUser } from "@/providers/UserProvider";
import { UserStory } from "@/types/UserStory.type";
import { Eye } from "lucide-react";
import { useState } from "react";
// ========================================================
function ButtonStoryViewers({
  user,
  story,
}: {
  user: UserStory;
  story: StoryType;
}) {
  const userSession = useUser();
  const [showStoryViewers, setShowStoryViewers] = useState("");
  return (
    <>
      {userSession.id === user.id && (
        <>
          <span className="size-0.5 bg-white rounded-full block" />
          <div>
            <button
              onClick={() => setShowStoryViewers(story.id)}
              className="flex items-center gap-0.5 cursor-pointer hover:underline decoration-1"
            >
              <Eye strokeWidth={1.5} className="size-4" />
              <span className="text-[11px]">{story._count.storyViews}</span>
            </button>
            {showStoryViewers === story.id && (
              <StoryViewersModal
                setShowStoryViewers={setShowStoryViewers}
                storyId={story.id}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ButtonStoryViewers;
