"use client";
import Skeleton from "@/components/Skeletons/Saved/Skeleton";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { SavePost } from "@/types/SavePost.type";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import Card from "./_components/Card";
// ====================================================================
function Saved() {
  const userSession = useUser();
  const { setToast } = useToast();
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get<{
          success: boolean;
          savedPosts: SavePost[];
          message: string;
        }>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/saved`, {
          withCredentials: true,
        });
        const { success, savedPosts, message } = data;
        if (!success || !savedPosts) {
          setToast({
            open: true,
            message: message || "يتعذر جلب محفوظاتك.",
            type: "error",
          });
          return [];
        }
        return savedPosts;
      } catch (error) {
        console.error("Failed get saved posts", error);
        if (isAxiosError(error)) {
          throw new Error(
            error.response?.data.message || "حدث خطأ أثناء جلب محفوظاتك.",
          );
        }
      }
    },
    queryKey: ["user_savedPosts", userSession.id],
  });
  if (error) setToast({ open: true, type: "error", message: error.message });
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
