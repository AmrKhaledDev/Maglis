import { DeleteStoryAction } from "@/actions/Story/DeleteStory.action";
import { EditStoryPrivacyAction } from "@/actions/Story/EditStoryPrivacy.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { StoryType } from "@/types/StoryType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Ellipsis, Eye, EyeOff, Trash2 } from "lucide-react";
// ===================================================
function StoryOptions({ story }: { story: StoryType }) {
  const userSession = useUser();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const { setActiveModal } = useActiveModal();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleDeleteStory, isPending: loadingDelete } = useMutation({
    mutationFn: async () => {
      const result = await DeleteStoryAction(story.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_stories", userSession.id],
      });
      setActiveModal(null);
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  const { mutate: handleUpdatePrivacy, isPending: loadingUpdate } = useMutation(
    {
      mutationFn: async () => {
        const result = await EditStoryPrivacyAction(story.id);
        if (!result.success) throw new Error(result.message);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user_stories", userSession.id],
        });
      },
      onError: (err: Error) => {
        setToast({
          open: true,
          message: err.message,
          type: "error",
        });
      },
    },
  );
  return (
    <>
      {userSession.id === story.userId && (
        <div className="relative">
          <button
            onClick={() => setActiveMenu("story_options")}
            className="cursor-pointer btnActiveMenu"
          >
            <Ellipsis className="size-5" strokeWidth={1.5} />
          </button>
          {activeMenu === "story_options" && (
            <div className=" absolute backdrop-blur-3xl left-0 p-2 w-fit shadow-2xl flex flex-col gap-1 bg-white/10 rounded-xl whitespace-nowrap z-9 font-semibold">
              <button
                disabled={loadingDelete}
                onClick={() => handleDeleteStory()}
                className="storyBtnOptionStyle button"
              >
                <Trash2 className="postBtnOptIcon" /> حذف
              </button>
              <button
                disabled={loadingUpdate}
                onClick={() => handleUpdatePrivacy()}
                className={clsx(
                  "storyBtnOptionStyle button",
                  story.isPrivate && "text-yellow-600",
                )}
              >
                {story.isPrivate ? (
                  <>
                    <Eye className="postBtnOptIcon" />
                    إظهار القصة
                  </>
                ) : (
                  <>
                    <EyeOff className="postBtnOptIcon" />
                    إخفاء القصة
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default StoryOptions;
