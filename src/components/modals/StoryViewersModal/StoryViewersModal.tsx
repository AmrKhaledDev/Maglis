import { GetViewersAction } from "@/actions/Story/GetViewers.action";
import Skeleton from "@/components/Skeletons/StoryViewersModal/Skeleton";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import Header from "./Header";
import NoViewers from "./NoViewers";
import ViewerCard from "./ViewerCard";
// =================================================================
function StoryViewersModal({
  setShowStoryViewers,
  storyId,
}: {
  setShowStoryViewers: Dispatch<SetStateAction<string>>;
  storyId: string;
}) {
  const userSession = useUser();
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetViewersAction(storyId);
      if (!result.success) throw new Error(result.message);
      if (result.notAuthenticated) return redirect("/login");
      return result.viewers;
    },
    queryKey: ["story_viewers", userSession.id, storyId],
  });
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex pt-30 justify-center z-200 backdrop-blur-[1px]">
      <div className="w-110 max-h-130 h-fit p-5 modalBgColor rounded-2xl shadow-xl flex flex-col gap-6">
        <Header
          data={data}
          isPending={isPending}
          setShowStoryViewers={setShowStoryViewers}
        />
        <div className="overflow-y-auto flex flex-col gap-3 pl-5">
          {isPending ? (
            <Skeleton />
          ) : data.length > 0 ? (
            data.map((viewer) => <ViewerCard key={viewer.id} viewer={viewer} />)
          ) : (
            <NoViewers />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default StoryViewersModal;
