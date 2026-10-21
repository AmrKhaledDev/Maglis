"use client";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import UserImage from "@/components/UserImage/UserImage";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { useState } from "react";
import EditProfileImageModal from "../../modals/EditProfileImageModal/EditProfileImageModal";
// ===========================================
function ProfileAvatar({ user }: { user: User }) {
  const { activeModal, setActiveModal } = useActiveModal();
  const userSession = useUser();
  const [showAvatar, setShowAvatar] = useState({
    open: false,
    url: "",
  });
  return (
    <div>
      <button
        onClick={() => {
          if (user.id === userSession.id) {
            setActiveModal("edit_avatar_modal");
            return;
          }
          setShowAvatar({
            open: true,
            url: user.image || "/user_default.jpeg",
          });
        }}
        className="relative shrink-0 shadow -mt-12 cursor-pointer rounded-full bg-black/20 backdrop-blur-2xl"
      >
        <UserImage src={user.image} size="size-25" />
      </button>
      {activeModal == "edit_avatar_modal" && user.id === userSession.id && (
        <EditProfileImageModal
          typeImage="AVATAR"
          image={user.image}
          user={user}
        />
      )}
      {user.id !== userSession.id && showAvatar.open && (
        <ImagePreviewModal
          showImage={showAvatar}
          setShowImage={setShowAvatar}
        />
      )}
    </div>
  );
}

export default ProfileAvatar;
