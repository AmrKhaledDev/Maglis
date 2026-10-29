import UserImage from "@/components/UserImage/UserImage";
import { UserSearchResult } from "@/types/UserSearchResult.type";
import clsx from "clsx";
import Link from "next/link";
// ==============================================================================
function UsersSearchResult({
  searchValue,
  data,
}: {
  searchValue: string;
  data: UserSearchResult[];
}) {
  return (
    <div
      className={clsx(
        "p-3 absolute modalBgColor w-full rounded-lg mt-1 shadow-2xl flex flex-col gap-3",
        (!searchValue.trim() || !data) && "hidden",
      )}
    >
      {data.map((user) => (
        <Link
          href={`/u/${user.id}`}
          key={user.id}
          className="flex items-center gap-2 hover:bg-slate-800"
        >
          <UserImage src={user.image} alt={user.name} size="size-9" />
          <div className="flex items-center gap-1.5">
            <h2
              dir="auto"
              className="text-sm font-semibold text-gray-200 line-clamp-1 [word-break:break-word]"
            >
              {user.name}
            </h2>
            {user.bio && (
              <>
                <span className="size-0.75 shadow rounded-full bg-gray-500 shrink-0" />
                <p className="line-clamp-1 text-xs font-normal text-gray-300">
                  {user.bio}
                </p>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default UsersSearchResult;
