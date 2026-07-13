import { PostDBType } from "@/types/PostDBType";
import Linkify from "linkify-react";
// =======================================
function PostContent_Text({post}:{post:PostDBType}) {
  return (
    <div className="space-y-5">
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
          className="whitespace-pre-line text-sm [word-break:break-word] line-clamp-5"
        >
          {post.content}
        </p>
      </Linkify>
      {post.content && post.content?.length > 1000 && (
        <button className="text-sm font-semibold text-zinc-400 cursor-pointer hover:text-zinc-300 mytransition">
          عرض المنشور
        </button>
      )}
    </div>
  );
}

export default PostContent_Text;
