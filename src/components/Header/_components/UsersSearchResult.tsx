import { UserSearchResultType } from "@/types/UserSearchResult.type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
// ==============================================================================
function UsersSearchResult({
  searchValue,
  data,
}: {
  searchValue: string;
  data: UserSearchResultType[];
}) {
  return (
    <div
      className={clsx(
        "p-3 absolute modalBgColor w-full rounded-2xl mt-1 shadow-2xl flex flex-col gap-3",
        (!searchValue.trim() || !data) && "hidden",
      )}
    >
      {data.map((user) => (
        <Link
          href={`/u/${user.id}`}
          key={user.id}
          className="flex items-center gap-2 hover:bg-slate-800"
        >
          <Image
            src={user.image || "/user.jpg"}
            alt={user.name}
            width={50}
            height={50}
            className="rounded-full object-cover size-9 shrink-0"
          />
          <div className="flex items-center gap-1.5">
            <h2 dir="auto" className="text-sm font-semibold text-gray-200 line-clamp-1 [word-break:break-word]">
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
