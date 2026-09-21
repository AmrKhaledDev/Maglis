"use client";
import "dayjs/locale/ar";
import ProfileDetailsFooter from "./ProfileDetailsFooter/ProfileDetailsFooter";
import ProfileStats from "./ProfileStats";
import ProfileIdentity from "./ProfileIdentity";
import { UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
import { useEffect, useState } from "react";
import { useUser } from "@/providers/UserProvider";
import EditProfileModal from "../../../modals/EditProfileModal/EditProfileModal";
// ====================================================
function ProfileDetails({ user }: { user: UserWithSocialLinkType }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (
          !e.target.closest(
            ".buttonShowEditProfileModal, .editProfileModal, .buttonCloseSelectCity",
          )
        )
          setShowEditProfileModal(false);
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
  const userSession = useUser();
  return (
    <div className="flex flex-col gap-2 mb-2 ">
      <ProfileIdentity user={user} />
      <ProfileStats user={user} />
      <ProfileDetailsFooter user={user} />
      {userSession.id === user.id && (
        <>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="text-xs w-fit mt-2 flex items-center gap-2 py-2.5 px-6 bg-gray-300 text-black rounded-md shadow cursor-pointer font-medium buttonShowEditProfileModal hover:bg-gray-400 mytransition"
          >
            تعديل الملف الشخصي
          </button>
          {showEditProfileModal && userSession.id === user.id && (
            <EditProfileModal
              setShowEditProfileModal={setShowEditProfileModal}
              showEditProfileModal={showEditProfileModal}
              user={user}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileDetails;
