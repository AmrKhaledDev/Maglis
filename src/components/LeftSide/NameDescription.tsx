import Link from "next/link";
// ===========================
function NameDescription({
  name,
  description,
  userId,
}: {
  name: string;
  description?: string | null;
  userId: string;
}) {
  return (
    <div>
      <Link
        href={`/u/${userId}`}
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
