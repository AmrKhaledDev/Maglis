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
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[18px] font-bold text-nowrap">{user.name}</h2>
          {user.nickname && (
            <span className="text-gray-200 font-extrabold text-sm text-nowrap">
              ( {user.nickname} )
            </span>
          )}
        </div>
        {user.id !== userSession.id && (
          <p className="text-[10px] text-green-600 font-bold text-nowrap">
            آخر ظهور {dayjs(user.lastSeenAt).fromNow()}
          </p>
        )}
      </div>
      {user.username && (
        <h4 dir="auto" className="text-xs text-gray-300 w-fit">
          @{user.username}
        </h4>
      )}
    </>
  );
}

export default ProfileIdentity;
