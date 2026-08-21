import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import clsx from "clsx";
import { FaUsers } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
// ==========================================
function ProfileStats({user}:{user:User}) {
    const userSession = useUser()
  return (
    <>
      <div
        className={clsx(
          "flex items-center gap-4",
          user.id === userSession.id ? "mt-4" : "mt-2",
        )}
      >
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5 font-semibold">
          <FaUsers className="text-[17px] text-gray-300" />
          {user.followersCount} {user.professionalMode ? "متابعين" : "أصدقاء"}
        </p>
        <p className="text-[13px] text-gray-300 flex items-center gap-1.5 font-semibold">
          <HiUsers className="text-[17px] text-gray-300" />
          {user.followingCount} متابعات
        </p>
      </div>
    </>
  );
}

export default ProfileStats;
