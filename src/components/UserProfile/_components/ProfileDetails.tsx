"use client";
import { User } from "@prisma/client";
import { Ban, MessageCircle, UserRoundPlus } from "lucide-react";
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
  const sessionUser = useUser();
  return (
    <div className="space-y-1.5 my-2">
      <div className="flex items-center gap-2 flex-wrap">
        <h2 className="text-2xl font-bold text-nowrap">{user.name}</h2>
        {user.id !== sessionUser.id && (
          <p className="text-[10px] text-green-600 font-bold text-nowrap">
            آخر ظهور {dayjs(user.lastSeenAt).fromNow()}
          </p>
        )}
        {user.nickname && (
          <span className="text-gray-300 font-bold text-[18px] text-nowrap">
            ( {user.nickname} )
          </span>
        )}
      </div>
      {user.username && (
        <h4 className="text-sm text-gray-300 w-fit">{user.username}@</h4>
      )}
      <div className="flex items-center gap-4 mt-5">
        <p className="text-[13px] text-gray-200 flex items-center gap-1.5">
          <FaUsers className="text-[17px] text-gray-300" />
          {user.followersCount} متابعين
        </p>
        <p className="text-[13px] text-gray-200 flex items-center gap-1.5">
          <HiUsers className="text-[17px] text-gray-300" />
          {user.followingCount} متابعات
        </p>
      </div>
      {user.id !== sessionUser.id && (
        <div className="mt-5 flex items-center gap-1.5">
          <button className="flex text-xs items-center hover:outline hover:outline-blue-600 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-blue-800 shadow py-1.5 px-3 rounded-full">
            <UserRoundPlus className="size-4" /> طلب صداقة
          </button>
          <button className="flex text-xs items-center hover:outline hover:outline-blue-600 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-blue-800 shadow py-1.5 px-3 rounded-full">
            <MessageCircle className="size-4" />
            تواصل
          </button>
          <button className="flex text-xs mr-2 items-center hover:outline hover:outline-red-600 outline-offset-2 gap-2 cursor-pointer text-red-200 font-semibold bg-red-800 shadow py-1.5 px-3 rounded-full">
            <Ban className="size-4" />
            حظر
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
