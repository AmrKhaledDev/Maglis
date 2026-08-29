import Image from "next/image";
import StoryViewer from "./StoryViewer/StoryViewer";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { UserStoryType } from "@/types/UserStoryType";
// ====================================
function StoryCard({ userWithStories }: { userWithStories: UserStoryType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  if (!userWithStories.stories || userWithStories.stories.length < 1)
    return null;
  return (
    <>
      <div
        onClick={() => setActiveModal(userWithStories.id)}
        className="flex flex-col items-center gap-2 justify-center shrink-0"
      >
        <div className="p-0.5  size-17 shrink-0 rounded-full bg-linear-to-r from-[#d7bc86] to-purple-500 shadow-[0_0_5px_purple] mytransition">
          <div className="relative size-full rounded-full ">
            <Image
              src={userWithStories.image || "/user.jpg"}
              alt="user image"
              fill
              priority
              className="object-cover rounded-full cursor-pointer"
            />
          </div>
        </div>
        <p dir="auto" className="text-xs line-clamp-1 [word-break:break-word]">
          {userWithStories.name}
        </p>
      </div>
      {activeModal === userWithStories.id && (
        <StoryViewer stories={userWithStories.stories} user={userWithStories} />
      )}
    </>
  );
}

export default StoryCard;
