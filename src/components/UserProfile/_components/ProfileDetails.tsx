"use client";
import { User } from "@prisma/client";
import { MessageCircle, UserRoundPlus } from "lucide-react";
import { FaUsers } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import { useUser } from "@/providers/UserProvider";
// ====================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function ProfileDetails({ user }: { user: User }) {
  const userSession = useUser();
  return (
    <div className="flex flex-col gap-2 mb-2">
      <h2 className="text-[18px] font-bold text-nowrap">{user.name}</h2>
      {user.id !== userSession.id && (
        <p className="text-[10px] text-green-600 font-bold text-nowrap">
          آخر ظهور {dayjs(user.lastSeenAt).fromNow()}
        </p>
      )}
      {user.nickname && (
        <span className="text-gray-300 font-bold text-sm text-nowrap">
          ( {user.nickname} )
        </span>
      )}
      {user.username && (
        <h4 dir="auto" className="text-xs text-gray-400 w-fit font-semibold">
          @{user.username}
        </h4>
      )}
      <div className="flex items-center gap-4 mt-2">
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5 font-semibold">
          <FaUsers className="text-[17px] text-gray-300" />
          {user.followersCount} متابعين
        </p>
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5 font-semibold">
          <HiUsers className="text-[17px] text-gray-300" />
          {user.followingCount} متابعات
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button className="flex text-xs items-center hover:outline hover:outline-blue-600 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-blue-800 shadow py-1.5 px-3 rounded-full">
          <UserRoundPlus className="size-4" /> طلب صداقة
        </button>
        <button className="flex text-xs items-center hover:outline hover:outline-green-950 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-green-950 shadow py-1.5 px-3 rounded-full">
          <MessageCircle className="size-4" />
          تواصل
        </button>
      </div>
    </div>
  );
}

export default ProfileDetails;
