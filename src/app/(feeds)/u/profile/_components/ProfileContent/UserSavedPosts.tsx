import { useState } from "react";
import NoDataMessage from "./NoDataMessage";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import PostPrivacy from "@/components/PostPrivacy/PostPrivacy";
import Linkify from "linkify-react";
import ReactPlayer from "react-player";
import { Bookmark } from "lucide-react";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { GetUserSavedPostsAction } from "@/actions/User/GetUserSavedPosts.action";
import ProfileLoader from "./ProfileLoader";
// =============================================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function UserSavedPosts() {
  const user = useUser();
  const [playingVideoId, setPlayingVideoId] = useState("");
  const {
    data: savedPosts,
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await GetUserSavedPostsAction(user.id);
      if (!result.success || !result.savedPosts)
        throw new Error(
          result.message || "حدث خطأ أثناء جلب المنشورات المحفوظة.",
        );
      return result.savedPosts;
    },
    queryKey: ["user_savedPosts"],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="w-full flex justify-center">
      {savedPosts && savedPosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {savedPosts.map((saveItem) => (
            <div
              key={saveItem.id}
              className="p-3 shadow h-fit overflow-hidden bg-white/5 ring ring-gray-50/8 rounded-lg"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={saveItem.post.author.image || "/user.jpg"}
                    alt="صورة المستخدم"
                    width={50}
                    height={50}
                    className="size-9 rounded-full shrink-0 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-semibold text-sm text-gray-100 line-clamp-1 [word-break:break-word]">
                        {saveItem.post.author.name}
                      </h2>
                      <span className="size-[3.5px] rounded-full bg-white block opacity-5 shrink-0" />
                      <PostPrivacy privacy={saveItem.post.privacy} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {saveItem.post.author.username && (
                        <>
                          <p dir="auto" className="text-[11px] text-gray-400">
                            @{saveItem.post.author.username}
                          </p>
                          <span className="size-[3.5px] rounded-full bg-white block opacity-5 shrink-0" />
                        </>
                      )}
                      <p className="text-[11px] text-slate-400 font-normal">
                        {dayjs(saveItem.post.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
                <button className="h-fit cursor-pointer hover:scale-110 mytransition active:scale-90">
                  <Bookmark
                    strokeWidth={1}
                    className="size-4 fill-green-500 text-green-500"
                  />
                </button>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                <Linkify
                  options={{
                    target: "_blank",
                    rel: "noopener noreferrer",
                    attributes: {
                      className: "text-sky-500 hover:underline ",
                    },
                  }}
                >
                  <p
                    dir="auto"
                    className="whitespace-pre-line text-xs [word-break:break-word] line-clamp-1"
                  >
                    {saveItem.post.content}
                  </p>
                </Linkify>
                <div
                  className={`${saveItem.post.medias.length > 1 && "grid grid-cols-2 gap-1"}`}
                >
                  {saveItem.post.medias.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full overflow-hidden bg-black rounded-lg relative ${saveItem.post.medias.length > 1 ? "h-30" : "h-60"}`}
                    >
                      {item.type == "IMAGE" && (
                        <>
                          <Image
                            src={item.url}
                            alt=""
                            fill
                            className="object-cover blur opacity-30 pointer-events-none"
                          />
                          <Image
                            src={item.url}
                            alt="صورة من المنشور"
                            fill
                            className="object-contain relative z-8"
                          />
                        </>
                      )}
                      {item.type == "VIDEO" && (
                        <ReactPlayer
                          playing={playingVideoId == item.id}
                          onPlay={() => setPlayingVideoId(item.id)}
                          src={item.url}
                          width="100%"
                          height="100%"
                          controls
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataMessage
          message={error?.message || "حالياً لا يوجد أي منشورات محفوظة."}
        />
      )}
    </div>
  );
}

export default UserSavedPosts;
