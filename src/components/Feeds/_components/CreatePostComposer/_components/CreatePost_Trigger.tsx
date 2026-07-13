import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// ================================================================
function CreatePost_Trigger({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useUser();
  return (
    <div className="flex items-center gap-2 w-full">
      <Image
        src={user.image || "/user.jpg"}
        alt="صورتك"
        width={50}
        height={50}
        className="size-9 shrink-0 rounded-full object-cover"
      />
      <button
        onClick={() => setIsOpen(true)}
        className="p-3.5 flex-1 text-sm hover:border-gray-50/40 mytransition rounded-full border border-gray-50/20 text-gray-400 font-semibold cursor-pointer text-start"
      >
        بماذا تفكر اليوم؟
      </button>
    </div>
  );
}

export default CreatePost_Trigger;
