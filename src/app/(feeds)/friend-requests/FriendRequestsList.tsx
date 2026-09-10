"use client";

import { GetFriendRequestsAction } from "@/actions/User/GetFriendRequests.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import RequestUser from "./RequestUser/RequestUser";
import Skeleton from "./Skeleton";
// =====================================================
function FriendRequestsList() {
  const userSession = useUser();
  const { setToast } = useToast();
  const { data: requests, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetFriendRequestsAction();
      if (!result.success)
        return setToast({
          open: true,
          message:
            result.message || "حدث خطأ أثناء جلب طلبات الصداقة الخاصة بك.",
          type: "error",
        });
      return result.requests || [];
    },
    queryKey: ["user_friendRequests", userSession.id],
  });
  return (
    <div className="flex flex-col gap-7">
      {isPending ? (
        <Skeleton />
      ) : (
        requests &&
        requests.map((request) => (
          <RequestUser key={request.id} request={request} />
        ))
      )}
    </div>
  );
}

export default FriendRequestsList;
