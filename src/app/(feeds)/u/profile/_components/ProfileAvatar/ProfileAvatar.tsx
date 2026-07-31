"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditAvatarModal from "../EditProfileImageModal";
import { useUser } from "@/providers/UserProvider";
// ===========================================
function ProfileAvatar() {
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);
  const user = useUser();
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonOpenModalEditAvatar, .modalEditAvatar"))
          setShowEditAvatarModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
  return (
    <div>
      <button
        onClick={() => setShowEditAvatarModal(true)}
        className="buttonOpenModalEditAvatar relative shrink-0 shadow size-35 -mt-10 cursor-pointer rounded-full"
      >
        <Image
          src={user.image || "/user.jpg"}
          alt="الصورة الشخصية"
          fill
          className="object-cover rounded-full"
        />
      </button>
      {showEditAvatarModal && (
        <EditAvatarModal
          typeImage="AVATAR"
          setShowEditProfileImageModal={setShowEditAvatarModal}
          image={user.image}
        />
      )}
    </div>
  );
}

export default ProfileAvatar;
