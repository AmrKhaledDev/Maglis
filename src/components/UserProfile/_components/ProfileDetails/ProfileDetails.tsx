"use client";
import { User } from "@prisma/client";
import "dayjs/locale/ar";
import ProfileDetailsFooter from "./ProfileDetailsFooter";
import ProfileStats from "./ProfileStats";
import ProfileIdentity from "./ProfileIdentity";
// ====================================================
function ProfileDetails({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-2 mb-2 ">
      <ProfileIdentity user={user} />
      <ProfileStats user={user} />
      <ProfileDetailsFooter user={user} />
    </div>
  );
}

export default ProfileDetails;
