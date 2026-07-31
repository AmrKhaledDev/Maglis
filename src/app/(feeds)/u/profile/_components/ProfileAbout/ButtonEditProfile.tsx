"use client";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
// ====================================
function ButtonEditProfile() {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowEditProfileModal, .editProfileModal"))
          setShowEditProfileModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
  return (
    <div>
      <button
        onClick={() => setShowEditProfileModal(true)}
        className="text-gray-400 hover:text-white mytransition cursor-pointer buttonShowEditProfileModal"
      >
        <Pen className="size-5" strokeWidth={1.5} />
      </button>
      {showEditProfileModal && (
        <EditProfileModal setShowEditProfileModal={setShowEditProfileModal} />
      )}
    </div>
  );
}

export default ButtonEditProfile;
4;
