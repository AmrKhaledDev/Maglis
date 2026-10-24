import UserImage from "@/components/UserImage/UserImage";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { UserStoryType } from "@/types/UserStoryType";
import StoryViewer from "./StoryViewer/StoryViewer";
import { usePlayingVideoId } from "@/providers/PlayingVideoIdProvider";
// ====================================
function StoryCard({ userWithStories }: { userWithStories: UserStoryType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  const { setPlayingVideoId } = usePlayingVideoId();
  if (!userWithStories.stories || userWithStories.stories.length < 1)
    return null;
  return (
    <>
      <button
        onClick={() => {
          setActiveModal(userWithStories.id);
          setPlayingVideoId(null);
        }}
        className="flex flex-col items-center gap-2 justify-center shrink-0 cursor-pointer"
      >
        <span className="p-0.5 size-17 shrink-0 rounded-full bg-linear-to-r from-[#d7bc86] to-purple-500 shadow-[0_0_5px_purple] mytransition">
          <UserImage src={userWithStories.image} size="size-full" />
        </span>
        <span
          dir="auto"
          className="text-xs line-clamp-1 [word-break:break-word]"
        >
          {userWithStories.name}
        </span>
      </button>
      {activeModal === userWithStories.id && (
        <StoryViewer stories={userWithStories.stories} user={userWithStories} />
      )}
    </>
  );
}

export default StoryCard;
