"use client";
import { SearchUsersForConversationAction } from "@/actions/Search/SearchUsersForConversation.action";
import { GetIntialUsersAction } from "@/actions/User/GetInitialUsers.action";
import Skeleton from "@/components/Skeletons/StartConversationModal/Skeleton";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import ConversationUser from "./ConversationUser";
import Header from "./Header";
import NoUsersFound from "./NoUsersFound";
import Search from "./Search";
// ===============================================================
function StartConversationModal() {
  const { setToast } = useToast();
  const userSession = useUser();
  const [searchText, setSearchText] = useState("");
  const { setActiveModal } = useActiveModal();
  const { data: intialUsers = [], isPending: loading_1 } = useQuery({
    queryFn: async () => {
      const result = await GetIntialUsersAction();
      if (!result.success) {
        setToast({
          open: true,
          message: result.message || "حدث خطأ غير متوقع.",
          type: "error",
        });
        return result.users;
      }
      return result.users;
    },
    queryKey: ["intial_users", userSession.id],
  });
  const { data: usersResultSearch = [], isPending: loading_2 } = useQuery({
    queryFn: async () => {
      const result = await SearchUsersForConversationAction(searchText);
      if (!result.success) {
        setToast({
          open: true,
          message: result.message || "حدث خطأ ما أثناء البحث عن مستخدمين.",
          type: "error",
        });
        return result.users;
      }
      return result.users;
    },
    queryKey: ["usersResultSearch", userSession.id, searchText],
    enabled: searchText.trim().length > 0,
  });
  const isSearching = searchText.trim().length > 0;
  const loading = isSearching ? loading_2 : loading_1;
  const users = isSearching ? usersResultSearch : intialUsers;
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-[3px] z-200 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-130 shadow-2xl shadow-black h-fit modalBgColor rounded-2xl overflow-hidden"
      >
        <Header />
        <div className="p-5 flex flex-col gap-6">
          <Search searchText={searchText} setSearchText={setSearchText} />
          <div className="flex flex-col gap-4">
            <div className="max-h-90 overflow-y-auto flex flex-col gap-4">
              {loading ? (
                <Skeleton />
              ) : users.length > 0 ? (
                users.map((user) => (
                  <ConversationUser key={user.id} user={user} />
                ))
              ) : (
                <NoUsersFound />
              )}
            </div>
            <p className="text-xs text-yellow-500">
              يرجى الالتزام بآداب الحوار واحترام الآخرين. يُمنع نشر أي محتوى
              يتضمن سبًا أو قذفًا أو إساءة أو تقليلًا من الآخرين. في حال مخالفة
              هذه السياسة، قد يتم حذف المنشور، وقد يؤدي تكرار المخالفات أو شدتها
              إلى إيقاف الحساب بشكل دائم.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StartConversationModal;
