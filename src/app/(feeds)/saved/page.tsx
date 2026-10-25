"use client";
import { GetSavedPostsAction } from "@/actions/User/GetSavedPosts.action";
import Skeleton from "@/components/Skeletons/Saved/Skeleton";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import Card from "./_components/Card";
// ====================================================================
function Saved() {
  const userSession = useUser();
  const { setToast } = useToast();
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetSavedPostsAction();
      if (!result.success) {
        setToast({
          open: true,
          message: result.message || "يتعذر جلب محفوظاتك.",
          type: "error",
        });
        return;
      }
      if (result.notAuthenticated) return redirect("/login");
      return result.savedPosts;
    },
    queryKey: ["user_stories", userSession.id],
  });
  return (
    <main className="flex flex-col gap-10 pb-4">
      <h2 className="font-bold text-xl flex items-center gap-1.5">
        الكل <span>({data.length})</span>
      </h2>
      <div className="flex flex-col gap-4">
        {isPending ? (
          <Skeleton />
        ) : (
          data.map((item) => <Card key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}

export default Saved;
