import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { Plus } from "lucide-react";
import Image from "next/image";
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
          <Image
            src={userSession.image ?? "/user.jpg"}
            alt="صورتك"
            width={100}
            height={100}
            className="rounded-full shrink-0 size-16 object-cover"
          />
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
