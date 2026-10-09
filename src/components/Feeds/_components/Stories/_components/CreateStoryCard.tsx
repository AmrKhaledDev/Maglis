import UserImage from "@/components/UserImage/UserImage";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { Plus } from "lucide-react";
// ===================================================================
function CreateStoryCard() {
  const userSession = useUser();
  const { setActiveModal } = useActiveModal();
  return (
    <>
      <div className="flex! flex-col items-center gap-2 justify-center">
        <button
          onClick={() => setActiveModal("create_story_modal")}
          className="relative cursor-pointer"
        >
          <UserImage src={userSession.image} size="size-16" />
          <Plus
            className="absolute -bottom-1.5 left-0.5 bg-black text-white rounded-full p-1 size-6"
            strokeWidth={1.5}
          />
        </button>
        <p className="text-xs">قصتك</p>
      </div>
    </>
  );
}

export default CreateStoryCard;
