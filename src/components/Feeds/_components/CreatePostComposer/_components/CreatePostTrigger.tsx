import UserImage from "@/components/UserImage/UserImage";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
// ================================================================
function CreatePostTrigger() {
  const userSession = useUser();
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center gap-3 w-full">
      <Link href={"/u/profile"}>
        <UserImage imageUrl={userSession.image} size="size-10" />
      </Link>
      <button
        onClick={() => setActiveModal("create_post_modal")}
        className="px-5 py-3 flex-1 bg-white/3 shadow  hover:bg-white/5 rounded-full text-gray-300 hover:text-white cursor-pointer text-start"
      >
        {`أهلًا ${userSession.name}، بماذا تفكر اليوم؟`}
      </button>
    </div>
  );
}

export default CreatePostTrigger;
