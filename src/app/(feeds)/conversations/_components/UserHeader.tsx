import Link from "next/link";
import UserMemberType from "../_types/UserMember.type";
// ============================================================
function UserHeader({ user }: { user: UserMemberType }) {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      {user.username && (
        <p dir="auto" className="sm:text-xs text-[11px] text-gray-300">
          @{user.username}
        </p>
      )}
      <Link
        href={`/u/${user.id}`}
        dir="auto"
        className="font-medium hover:decoration-1 hover:underline lg:text-[18px] sm:text-[15px] text-sm [word-break:break-word] line-clamp-1"
      >
        {user.name}
      </Link>
      <p className="lg:text-xs text-[11px] text-green-500 flex items-center gap-1.5 ">
        <span className="size-1.5 rounded-full bg-green-600 block" />
        متصل الآن
      </p>
      <p className="text-center sm:line-clamp-3 line-clamp-4 w-[98%] [word-break:break-word] lg:text-sm text-xs text-gray-200">
        {user.bio}
      </p>
    </div>
  );
}

export default UserHeader;
