import UserImage from "@/components/UserImage/UserImage";
import { UserSearchResultType } from "@/types/UserSearchResult.type";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
// ========================================================
function ConversationUser({ user }: { user: UserSearchResultType }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <UserImage src={user.image} size="size-11" />
        <div>
          <Link
            href={`/u/${user.id}`}
            className="hover:underline hover:decoration-1"
          >
            {user.name}
          </Link>
          <p className="line-clamp-1 text-sm text-gray-400">{user.bio}</p>
        </div>
      </div>
      <Link
        target="_blank"
        href={`/conversations/${user.id}`}
        className="flex items-center gap-2 text-sm py-1 px-4 bg-linear-to-t from-sky-800 to-sky-900 bg-sky-800 shadow hover:from-sky-700 hover:to-sky-600"
      >
        <MessageCircleMore strokeWidth={1} className="size-4.5" />
        مراسلة
      </Link>
    </div>
  );
}

export default ConversationUser;
