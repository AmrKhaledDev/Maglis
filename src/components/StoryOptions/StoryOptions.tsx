import { DeleteAction } from "@/actions/Story/Delete.action";
import { EditPrivacyAction } from "@/actions/Story/EditPrivacy.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Story } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { EllipsisVertical, Eye, EyeOff, Trash2 } from "lucide-react";
// ===================================================
function StoryOptions({ story }: { story: Story }) {
  const userSession = useUser();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (typeAction: "HIDDEN_STORY" | "DELETE_STORY") => {
      const action =
        typeAction === "HIDDEN_STORY" ? EditPrivacyAction : DeleteAction;
      const result = await action(story.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  const buttonsOptions = [
    {
      icon: story.isPrivate ? EyeOff : Eye,
      style: story.isPrivate && "text-yellow-600",
      label: story.isPrivate ? "إظهار القصة" : "إخفاء القصة",
      handle: "HIDDEN_STORY",
    },
    { icon: Trash2, style: "", label: "حذف", handle: "DELETE_STORY" },
  ] as const;
  return (
    <>
      {userSession.id === story.userId && (
        <div className="relative">
          <button
            onClick={() => setActiveMenu(story.id)}
            className={clsx("cursor-pointer btnActiveMenu h-5 mt-1.5")}
          >
            <EllipsisVertical className="size-5" />
          </button>
          {activeMenu === story.id && (
            <div className="absolute backdrop-blur-3xl gap-0.5 left-0 p-1.5 w-40 shadow-2xl flex flex-col bg-[#18191a] rounded-xl ring ring-white/5 whitespace-nowrap z-9 text-white">
              {buttonsOptions.map((button) => (
                <button
                  key={button.label}
                  type="button"
                  disabled={isPending}
                  onClick={() => mutate(button.handle)}
                  className={clsx(
                    "flex items-center text-sm gap-3 hover:shadow mytransition font-normal cursor-pointer hover:bg-[#2D2E2E] py-1.5 px-2 rounded-lg",
                    button.style,
                  )}
                >
                  <button.icon className="size-4" />
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default StoryOptions;
