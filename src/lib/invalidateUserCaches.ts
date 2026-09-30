import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import { QueryClient } from "@tanstack/react-query";
// ====================================================================
export const invalidateUserCaches = (
  queryClient: QueryClient,
  userSession: SessionWithoutPasswordType,
  ...args: unknown[]
) => {
  queryClient.invalidateQueries({
    queryKey: ["user_posts", userSession.id, ...args],
  });
  queryClient.invalidateQueries({
    queryKey: ["posts", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["posts_videos", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["comments", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["replies"],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_conversations", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_recent_contacts", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_active_stories", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["conversation", userSession.id, ...args],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_stories", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_savedPosts"],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_postsVideos", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_postsPhotos", userSession.id],
  });
  queryClient.invalidateQueries({
    queryKey: ["user_friendRequests", userSession.id],
  });
};
