"use client";
import { infos } from "@/data/userInfos";
import { UserWithSocialLink } from "../../_types/UserWithSocialLink.type";
import Linkify from "linkify-react";
// ======================================================================
function ProfileAbout({ user }: { user: UserWithSocialLink }) {
  return (
    <div className="p-2 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-200 text-sm">معلومات شخصية</h2>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <p className=" text-gray-400 text-sm">
          نبذة شخصية :
          <Linkify
            options={{
              target: "_blank",
              attributes: {
                className: "text-sky-500 hover:underline ",
              },
            }}
          >
            <span className="mr-1 text-gray-300 text-xs">
              {user.bio || "لا يوجد نبذة شخصية حالياً"}
            </span>
          </Linkify>
        </p>
        <div className="flex items-center flex-wrap gap-5">
          {infos(user).map(
            (info) =>
              info.icon &&
              info.value && (
                <div
                  key={info.id}
                  className="flex items-center gap-2 text-gray-300 text-xs"
                >
                  <info.icon className="size-6 p-1 bg-gray-200 text-slate-800 rounded-full" />
                  <div className="flex items-center gap-1">
                    <p className="text-gray-400">{info.label}</p>
                    <span className="text-gray-100 font-medium [word-break:break-word] line-clamp-1">
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
