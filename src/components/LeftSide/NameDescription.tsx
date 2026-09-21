import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
// ===========================
function NameDescription({
  name,
  description,
  userId,
}: {
  name: string;
  description: string | null;
  userId: string;
}) {
  const userSession = useUser();
  return (
    <div>
      <Link
        href={userSession.id === userId ? "u/profile" : `/u/${userId}`}
        className="text-sm"
      >
        {name}
      </Link>
      {description && (
        <p className="text-xs text-gray-400 line-clamp-1">{description}</p>
      )}
    </div>
  );
}

export default NameDescription;
