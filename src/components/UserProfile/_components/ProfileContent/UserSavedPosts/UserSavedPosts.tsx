import { GetUserSavedPostsAction } from "@/actions/User/GetUserSavedPosts.action";
import { useQuery } from "@tanstack/react-query";
import "dayjs/locale/ar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import NoDataMessage from "../NoDataMessage";
import ProfileLoader from "../ProfileLoader";
import SavedPostAuthor from "./SavedPostAuthor";
import SavedPostBookmarkButton from "./SavedPostBookmarkButton";
import SavedPostContent from "./SavedPostContent";
// ============================================================================
function UserSavedPosts({ userId }: { userId: string }) {
  const {
    data: savedPosts,
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await GetUserSavedPostsAction(userId);
      if (!result.success || !result.savedPosts) return;
      return result.savedPosts;
    },
    queryKey: ["user_savedPosts", userId],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="w-full flex justify-center">
      {savedPosts && savedPosts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3  w-full">
          {savedPosts.map((saveItem) => (
            <div
              key={saveItem.id}
              className="p-3 shadow h-fit overflow-hidden bg-white/5 ring ring-gray-50/8 rounded-lg"
            >
              <div className="flex justify-between">
                <SavedPostAuthor saveItem={saveItem} />
                <div className="flex items-center gap-1">
                  <Link
                    target="_blank"
                    href={`/post/${saveItem.postId}`}
                    className="size-4 group-disabled:fill-gray-400 cursor-pointer hover:scale-103 mytransition text-gray-400 hover:text-white"
                  >
                    <ExternalLink
                      strokeWidth={1}
                      className="size-4 group-disabled:fill-gray-400"
                    />
                  </Link>
                  <SavedPostBookmarkButton saveItem={saveItem} />
                </div>
              </div>
              <SavedPostContent saveItem={saveItem} />
            </div>
          ))}
        </div>
      ) : (
        <NoDataMessage
          message={error?.message || "حالياً لا يوجد أي منشورات محفوظة."}
        />
      )}
    </div>
  );
}

export default UserSavedPosts;
