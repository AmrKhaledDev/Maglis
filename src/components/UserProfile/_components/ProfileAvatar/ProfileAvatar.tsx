"use client";
import Image from "next/image";
import { useState } from "react";
import { User } from "@prisma/client";
import { useUser } from "@/providers/UserProvider";
import EditProfileImageModal from "../EditProfileImageModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
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
            url: user.image || "/user.jpg",
          });
        }}
        className="relative shrink-0 shadow size-25 -mt-12 cursor-pointer rounded-full"
      >
        <Image
          src={user.image || "/user.jpg"}
          alt="الصورة الشخصية"
          fill
          className="object-cover rounded-full"
        />
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
