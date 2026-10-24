import { GetStoriesAction } from "@/actions/User/GetStories.action";
import StoryOptions from "@/components/StoryOptions/StoryOptions";
import { useQuery } from "@tanstack/react-query";
import StoryImage from "./StoryImage";
import Storyvideo from "./Storyvideo";
// ==============================================================
function UserStories({ userId }: { userId: string }) {
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetStoriesAction(userId);
      if (!result.success) return;
      return result.stories || [];
    },
    queryKey: ["user_stories", userId],
  });
  return (
    <div className="w-full flex items-center justify-center">
      {isPending ? (
        <div className="grid grid-cols-2 gap-3 w-full">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className="h-100 rounded-xl shadow bg-white/7 animate-pulse"
              />
            ))}
        </div>
      ) : (
        data.length > 0 && (
          <div className="grid grid-cols-2 gap-3 w-full">
            {data.map((story) => (
              <div
                key={story.id}
                className="relative h-120 group rounded-md overflow-hidden shadow"
              >
                <StoryImage story={story} />
                <Storyvideo story={story} />
                <div className="absolute left-1 top-1 z-3">
                  <StoryOptions story={story} />
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default UserStories;
