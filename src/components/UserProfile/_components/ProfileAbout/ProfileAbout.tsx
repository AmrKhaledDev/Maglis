"use client";
import ButtonEditProfile from "./ButtonEditProfile";
import { useUser } from "@/providers/UserProvider";
import { infos } from "@/data/Profile/userInfos";
import { UserWithSocialLinkType } from "../../_types/UserWithSocialLink.type";
// ======================================================================
function ProfileAbout({ user }: { user: UserWithSocialLinkType }) {
  const sessionUser = useUser();
  return (
    <div className="p-2 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-200 text-sm">معلومات شخصية</h2>
        {user.id === sessionUser.id && <ButtonEditProfile user={user} />}
      </div>
      <div className="flex flex-col gap-5 w-full">
        <p className=" text-gray-400 text-sm">
          نبذة شخصية :
          <span className="mr-1 text-gray-300 text-xs">
            {user.bio || "لا يوجد نبذة شخصية حالياً"}
          </span>
        </p>
        <div className="grid grid-cols-2 gap-y-4">
          {infos(user).map(
            (info) =>
              info.icon &&
              info.value && (
                <div
                  key={info.id}
                  className="flex items-center gap-1.5 text-gray-300 text-xs"
                >
                  <info.icon className="size-5 p-1 bg-gray-200 text-slate-800 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <p className="text-gray-400">{info.label}</p>
                    <span className="text-gray-100 font-semibold">
                      {info.value}
                    </span>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileAbout;
