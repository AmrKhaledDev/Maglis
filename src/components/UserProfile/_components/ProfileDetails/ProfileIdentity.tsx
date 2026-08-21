import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// =================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function ProfileIdentity({ user }: { user: User }) {
  const userSession = useUser();
  return (
    <>
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
    </>
  );
}

export default ProfileIdentity;
