"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditAvatarModal from "../EditProfileImageModal";
import { User } from "@prisma/client";
import { useUser } from "@/providers/UserProvider";
import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
// ===========================================
function ProfileAvatar({ user }: { user: User }) {
  const sessionUser = useUser();
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState({
    open: false,
    preview: "",
  });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonOpenModalEditAvatar, .modalEditAvatar"))
          setShowEditAvatarModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          if (user.id === sessionUser.id) {
            setShowEditAvatarModal(true);
            return;
          }
          setShowAvatarModal({
            open: true,
            preview: user.image || "/user.jpg",
          });
        }}
        className="buttonOpenModalEditAvatar relative shrink-0 shadow size-35 -mt-10 cursor-pointer rounded-full"
      >
        <Image
          src={user.image || "/user.jpg"}
          alt="الصورة الشخصية"
          fill
          className="object-cover rounded-full"
        />
      </button>
      {showEditAvatarModal && user.id === sessionUser.id && (
        <EditAvatarModal
          typeImage="AVATAR"
          setShowEditProfileImageModal={setShowEditAvatarModal}
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
