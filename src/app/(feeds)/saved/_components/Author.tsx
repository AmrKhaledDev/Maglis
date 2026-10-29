import UserImage from "@/components/UserImage/UserImage";
import { SavePost } from "@/types/SavePost.type";
import Link from "next/link";
// ===========================================================
function Author({ item }: { item: SavePost }) {
  return (
    <div className="flex items-center gap-2">
      <UserImage src={item.post.author.image} size="size-8" />
      <p className="text-xs text-gray-300 flex items-center gap-2">
        محفوظ من منشور
        <Link
          href={`/u/${item.post.author.id}`}
          className="text-white font-bold hover:underline decoration-1"
        >
          {item.post.author.name}
        </Link>
      </p>
    </div>
  );
}

export default Author;
