import { UserSearchResult } from "@/types/UserSearchResult.type";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa6";
// ===========================================================================
function UserIdentityInfo({ user }: { user: UserSearchResult }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2">
        <Link
          href={`/u/${user.id}`}
          className="text-xl font-medium hover:underline decoration-1"
        >
          {user.name}
        </Link>
        {user.nickname && (
          <p className="text-xs font-bold opacity-70">( {user.nickname} )</p>
        )}
        {user.isPermanentlyBanned && user.role === "USER" && (
          <p className="bg-red-900/30 text-red-600 py-1 px-2 rounded-full text-xs font-medium mr-1">
            محظور نهائياً
          </p>
        )}
        {user.role === "SUPER_ADMIN" && (
          <p className="bg-green-900/30 text-green-600 py-1 px-2 rounded-full text-xs font-medium mr-1 flex items-center gap-1">
            <FaUserShield />
            مدير
          </p>
        )}
        {user.role === "ADMIN" && (
          <p className="bg-blue-900/30 text-blue-600 py-1 px-2 rounded-full text-xs font-medium mr-1">
            مسؤول
          </p>
        )}
      </div>
      <p className="text-xs">{user.username}@</p>
    </div>
  );
}

export default UserIdentityInfo;
