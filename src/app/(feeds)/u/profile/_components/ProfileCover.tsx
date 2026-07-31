"use client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditProfileImageModal from "./EditProfileImageModal";
import { useUser } from "@/providers/UserProvider";
// ===============================================
function ProfileCover() {
  const [showEditCoverModal, setShowEditCoverModal] = useState(false);
  const user = useUser();
  return (
    <div className="bg-white/5 h-90 shadow relative">
      <Image
        src={user.cover || "/cover_default.jpg"}
        alt="cover"
        fill
        className="object-cover"
      />
      <span className="absolute inset-0 bg-black/30" />
      <button
        onClick={() => setShowEditCoverModal(true)}
        className="absolute cursor-pointer left-3 outline outline-offset-2 mytransition hover:bg-gray-300 hover:outline-gray-300 outline-white flex items-center gap-2 bottom-3 bg-gray-200 shadow rounded text-sm text-black font-semibold py-1 px-2"
      >
        <ImageIcon className="size-5" /> تعديل الصورة
      </button>
      {showEditCoverModal && (
        <EditProfileImageModal
          setShowEditProfileImageModal={setShowEditCoverModal}
          typeImage="COVER"
          image={user.cover}
        />
      )}
    </div>
  );
}

export default ProfileCover;
