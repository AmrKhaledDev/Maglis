"use client";
import Image from "next/image";
import { useState } from "react";
import { User } from "@prisma/client";
import { useUser } from "@/providers/UserProvider";
import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
import EditProfileImageModal from "../EditProfileImageModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ===========================================
function ProfileAvatar({ user }: { user: User }) {
  const { activeModal, setActiveModal } = useActiveModal();
  const sessionUser = useUser();
  const [showAvatarModal, setShowAvatarModal] = useState({
    open: false,
    preview: "",
  });
  return (
    <div>
      <button
        onClick={() => {
          if (user.id === sessionUser.id) {
            setActiveModal("edit_avatar_modal");
            return;
          }
          setShowAvatarModal({
            open: true,
            preview: user.image || "/user.jpg",
          });
        }}
        className="relative shrink-0 shadow size-35 -mt-10 cursor-pointer rounded-full"
      >
        <Image
          src={user.image || "/user.jpg"}
          alt="الصورة الشخصية"
          fill
          className="object-cover rounded-full"
        />
      </button>
      {activeModal == "edit_avatar_modal" && user.id === sessionUser.id && (
        <EditProfileImageModal
          typeImage="AVATAR"
          image={user.image}
          user={user}
        />
      )}
      {user.id !== sessionUser.id && showAvatarModal.open && (
        <MediaPreviewModal
          showMedia={showAvatarModal}
          setShowMedia={setShowAvatarModal}
        />
      )}
    </div>
  );
}

export default ProfileAvatar;
