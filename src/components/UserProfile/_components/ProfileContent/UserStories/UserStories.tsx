import { GetUserStoriesAction } from "@/actions/User/GetUserStories.action";
import { useQuery } from "@tanstack/react-query";
import ProfileLoader from "../ProfileLoader";
import NoDataMessage from "../NoDataMessage";
import StoryOptions from "@/components/Feeds/_components/Stories/_components/StoryViewer/StoryOptions";
import StoryImage from "./StoryImage";
import Storyvideo from "./Storyvideo";
// ==============================================================
function UserStories({ userId }: { userId: string }) {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetUserStoriesAction(userId);
      if (!result.success) return;
      return result.stories || [];
    },
    queryKey: ["user_stories", userId],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="w-full flex items-center justify-center">
      {data && data.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 w-full">
          {data.map((story) => (
            <div
              key={story.id}
              className="relative h-120 group rounded-xl overflow-hidden shadow"
            >
              <StoryImage story={story} />
              <Storyvideo story={story} />
              <div className="absolute left-1 top-1 z-3">
                <StoryOptions story={story} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataMessage message="حالياً لا يوجد أي قصص." />
      )}
    </div>
  );
}

export default UserStories;
