import Image from "next/image";
import Link from "next/link";
import FollowButton from "../FollowButton/FollowButton";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { PostType } from "@/types/Post.type";
import { useUser } from "@/providers/UserProvider";
import { X } from "lucide-react";
import { useEffect } from "react";
// ====================================================================
function PostLikersModal({ post }: { post: PostType }) {
  const { setActiveModal } = useActiveModal();
  const userSession = useUser();
  const likers = post.likes.sort((a, b) => {
    if (a.userId === userSession.id) return -1;
    if (b.userId === userSession.id) return 1;
    return 0;
  });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".likersMenu, .showLikersButton"))
          setActiveModal(null);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div className="fixed inset-0 backdrop-blur-[5px] z-100 flex items-center justify-center">
      <div className="w-110 max-h-100 bg-slate-800 rounded-2xl p-3 shadow-lg flex flex-col gap-10 likersMenu">
        <div className="flex items-center justify-between">
          <h1 className="flex-1 text-center">
            تسجيلات الإعجاب ({likers.length})
          </h1>
          <button
            onClick={() => setActiveModal(null)}
            className="cursor-pointer text-gray-200 hover:text-white"
          >
            <X strokeWidth={1.5} className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto pl-2 ">
          {likers.map((liker) => (
            <div
              key={liker.userId}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative size-9 shrink-0">
                  <Image
                    src={liker.user.image || "/user.jpg"}
                    alt={liker.user.name}
                    className="object-cover rounded-full"
                    fill
                  />
                </div>
                <div>
                  <Link
                    href={
                      userSession.id === liker.userId
                        ? "/u/profile"
                        : `/u/${liker.userId}`
                    }
                  >
                    {liker.user.name}
                  </Link>
                  <p className="line-clamp-1 text-xs text-gray-300">
                    {liker.user.bio}
                  </p>
                </div>
              </div>
              {userSession.id !== liker.userId &&
                liker.user.professionalMode && (
                  <FollowButton
                    textColor="flex text-nowrap items-center gap-2 py-1.5 px-3 shadow mytransition rounded-xl  text-xs"
                    unfollowColor="bg-gray-600 hover:bg-gray-700"
                    followColor="hover:bg-blue-700 bg-blue-600"
                    followingId={liker.userId}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostLikersModal;
