"use client";

import { GetFriendRequestsAction } from "@/actions/User/GetFriendRequests.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import RequestUser from "./RequestUser/RequestUser";
import Skeleton from "@/components/Skeletons/FriendRequests/Skeleton";
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
        <div className="flex flex-col gap-4 items-center justify-center">
          <img src="/no-results.png" className="size-25" />
          <div className="flex flex-col items-center gap-1">
            <h2 className="font-medium text-xl">لا يوجد طلبات صداقة حالياً</h2>
            <p className="text-[#9ca1ab]">صندوق الطلبات فارغ.</p>
            <p className="text-[#9ca1ab]">
              عندما يتم إرسال إليك طلب صداقة سيتم عرضه هنا فوراً.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendRequestsList;
