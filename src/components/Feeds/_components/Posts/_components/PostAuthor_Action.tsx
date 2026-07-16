import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDB.type";
import { UserPlus } from "lucide-react";
// =====================================================
function PostAuthor_Actions({ post }: { post: PostDBType }) {
  const user = useUser();
  return (
    <>
      {user.id !== post.authorId ? (
        post.author.professionalMode ? (
          <button className="text-xs shadow flex items-center gap-2 hover:text-blue-500 bg-blue-700/50 text-blue-300 mytransition active:scale-98 hover:bg-blue-700/20 py-1 px-2 rounded cursor-pointer font-semibold">
            متابعة
          </button>
        ) : (
          <button className="text-xs shadow flex items-center gap-2 hover:text-cyan-500 bg-cyan-700/50 text-cyan-300 mytransition active:scale-98 hover:bg-cyan-700/20 py-1 px-2 rounded cursor-pointer font-semibold">
            <UserPlus className="size-4" /> إضافة صديق
          </button>
        )
      ) : (
        ""
      )}
    </>
  );
}

export default PostAuthor_Actions;
