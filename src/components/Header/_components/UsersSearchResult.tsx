import { useUser } from "@/providers/UserProvider";
import { UserSearchResult } from "@/types/UserSearchResult.type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
// ==============================================================================
function UsersSearchResult({
  searchValue,
  data,
}: {
  searchValue: string;
  data: UserSearchResult[] | null;
}) {
  const userSession = useUser();
  return (
    <div
      className={clsx(
        "p-3 absolute ring ring-gray-50/2 bg-gray-800 w-full rounded-2xl mt-1 shadow-2xl flex flex-col gap-2",
        (!searchValue.trim() || !data) && "hidden",
      )}
    >
      {data &&
        data.map((user) => (
          <Link
            href={userSession.id === user.id ? "/u/profile" : `/u/${user.id}`}
            key={user.id}
            className="flex items-center gap-3 hover:bg-slate-900 mytransition"
          >
            <Image
              src={user.image || "/user.jpg"}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-full object-cover size-9 shrink-0"
            />
            <div className="flex items-center gap-1.5">
              <h2 className="text-nowrap text-sm font-semibold text-gray-200">
                {user.name}
              </h2>
              {user.id === userSession.id && (
                <>
                  <span className="size-0.75 shadow rounded-full bg-gray-500 shrink-0" />
                  <h3 className="font-semibold text-xs text-green-600">أنت</h3>
                </>
              )}
              <span className="size-0.75 shadow rounded-full bg-gray-500 shrink-0" />
              <p className="line-clamp-1 text-xs font-normal text-gray-300">
                {user.bio}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default UsersSearchResult;
