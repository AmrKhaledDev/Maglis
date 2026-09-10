import { ShowMediaInProfileAction } from "@/actions/Post/ShowMediaInProfile.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Images } from "lucide-react";
// ==========================================================================================
function ShowMediaInProfileButton({ post }: { post: PostType }) {
  const { setToast } = useToast();
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await ShowMediaInProfileAction(post.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
    },
    onError: (error: Error) => {
      setToast({
        open: true,
        message: error.message,
        type: "error",
      });
    },
  });
  return (
    <>
      {post.medias.length > 0 && (
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className={clsx(
            "btnOptBox",
            post.showMediaInProfile && "text-red-500",
          )}
        >
          <Images className="btnOptIcon" />
          {post.showMediaInProfile ? "إخفاء الوسائط" : "إظهار الوسائط"}
        </button>
      )}
    </>
  );
}

export default ShowMediaInProfileButton;
