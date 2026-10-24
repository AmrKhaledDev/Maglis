import AlertMessage from "@/components/AlertMessage/AlertMessage";
import Skeleton from "@/components/Skeletons/UserFriends/Skeleton";
import {
  connectionAction,
  connectionMessages,
  connectionQueryKey,
} from "@/data/UserConnections/connectionData";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import NoConnectionsEmptyState from "./NoConnectionsEmptyState";
import UserConnectionCard from "./UserConnectionCard";
// ==================================================================
function UserConnectionsList({
  userId,
  connectionType,
}: {
  userId: string;
  connectionType: "FRIENDS" | "FOLLOWERS" | "FOLLOWINGS";
}) {
  const userSession = useUser();
  const { title, description } = connectionMessages[connectionType];
  const { key } = connectionQueryKey[connectionType];
  const { action } = connectionAction[connectionType];
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await action(userId);
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
    queryKey: [key, userSession.id, userId],
  });
  return (
    <div className="overflow-y-auto h-full">
      {isPending ? (
        <Skeleton />
      ) : data.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {data.map((user) => (
            <UserConnectionCard
              userSession={userSession}
              key={user.id}
              user={user}
            />
          ))}
        </div>
      ) : (
        <NoConnectionsEmptyState title={title} description={description} />
      )}
      {error && <AlertMessage message={error.message} type="error" />}
    </div>
  );
}

export default UserConnectionsList;
