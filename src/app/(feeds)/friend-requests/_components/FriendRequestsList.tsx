"use client";

import { GetFriendRequestsAction } from "@/actions/User/GetFriendRequests.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import RequestUser from "./RequestUser/RequestUser";
import Skeleton from "@/components/Skeletons/FriendRequests/Skeleton";
import Image from "next/image";
// ======================================================================================
function FriendRequestsList() {
  const userSession = useUser();
  const { setToast } = useToast();
  const { data: requests = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetFriendRequestsAction();
      if (!result.success) {
        setToast({
          open: true,
          message:
            result.message || "حدث خطأ أثناء جلب طلبات الصداقة الخاصة بك.",
          type: "error",
        });
        return result.requests;
      }
      return result.requests || [];
    },
    queryKey: ["user_friendRequests", userSession.id],
  });
  return (
    <div className="flex flex-col gap-7">
      {isPending ? (
        <Skeleton />
      ) : requests.length > 0 ? (
        requests.map((request) => (
          <RequestUser key={request.id} request={request} />
        ))
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mb-2">
          <Image
            src="/no-results.png"
            className="size-20"
            alt="icon"
            width={100}
            height={100}
          />
          <h2 className="font-light text-xl text-gray-100">لا يوجد طلبات صداقة حالياً</h2>
        </div>
      )}
    </div>
  );
}

export default FriendRequestsList;
