"use client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import EditProfileImageModal from "./EditProfileImageModal";
import { User } from "@prisma/client";
import { useUser } from "@/providers/UserProvider";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ===============================================
function ProfileCover({ user }: { user: User }) {
  const sessionUser = useUser();
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="bg-white/5 h-70 shadow relative">
      <Image
        src={user.cover || "/cover_default.jpg"}
        alt="cover"
        fill
        className="object-cover"
      />
      <span className="absolute inset-0 bg-black/30" />
      {user.id === sessionUser.id && (
        <>
          <button
            onClick={() => setActiveModal("edit_cover_modal")}
            className="absolute cursor-pointer left-3 outline outline-offset-2 mytransition hover:bg-gray-300 hover:outline-gray-300 outline-white flex items-center gap-2 bottom-3 bg-gray-200 shadow rounded text-xs text-black font-semibold py-1 px-2"
          >
            <ImageIcon className="size-4" /> تعديل الصورة
          </button>
          {activeModal == "edit_cover_modal" && (
            <EditProfileImageModal
              typeImage="COVER"
              image={user.cover}
              user={user}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileCover;
