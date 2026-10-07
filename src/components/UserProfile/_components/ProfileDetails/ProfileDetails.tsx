"use client";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import "dayjs/locale/ar";
import EditProfileModal from "../../../modals/EditProfileModal/EditProfileModal";
import { UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
import ProfileDetailsFooter from "./ProfileDetailsFooter/ProfileDetailsFooter";
import ProfileIdentity from "./ProfileIdentity";
import ProfileStats from "./ProfileStats";
// ====================================================
function ProfileDetails({ user }: { user: UserWithSocialLinkType }) {
  const { setActiveModal, activeModal } = useActiveModal();
  const userSession = useUser();
  return (
    <div className="flex flex-col gap-2 mb-2 ">
      <ProfileIdentity user={user} />
      <ProfileStats user={user} />
      <ProfileDetailsFooter user={user} />
      {userSession.id === user.id && (
        <>
          <button
            onClick={() => setActiveModal("edit_profile")}
            className="text-xs w-fit mt-2 flex items-center gap-2 py-2.5 px-6 bg-gray-300 text-black rounded-md shadow cursor-pointer font-medium buttonShowEditProfileModal hover:bg-gray-400 mytransition"
          >
            تعديل الملف الشخصي
          </button>
          {activeModal === "edit_profile" && userSession.id === user.id && (
            <EditProfileModal user={user} />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileDetails;
