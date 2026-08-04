"use client";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import {  UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
// ====================================
function ButtonEditProfile({ user }: { user: UserWithSocialLinkType }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowEditProfileModal, .editProfileModal, .buttonCloseSelectCity"))
          setShowEditProfileModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
  return (
    <>
      <button
        onClick={() => setShowEditProfileModal(true)}
        className="text-gray-400 hover:text-white mytransition cursor-pointer buttonShowEditProfileModal"
      >
        <Pen className="size-5" strokeWidth={1.5} />
      </button>
      {showEditProfileModal && (
        <EditProfileModal
          setShowEditProfileModal={setShowEditProfileModal}
          user={user}
        />
      )}
    </>
  );
}

export default ButtonEditProfile;
4;
