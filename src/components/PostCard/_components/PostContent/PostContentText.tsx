import { PostType } from "@/types/Post.type";
import clsx from "clsx";
import Linkify from "linkify-react";
import { useState } from "react";
// =======================================
function PostContentText({ post }: { post: PostType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="space-y-3 mb-3">
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
          className={clsx(
            "whitespace-pre-line text-sm [word-break:break-word] ",
            isExpanded ? "" : "line-clamp-4",
          )}
        >
          {post.content}
        </p>
      </Linkify>
      {post.content && post.content?.length > 1000 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-semibold text-zinc-400 cursor-pointer hover:text-zinc-300 mytransition"
        >
          {isExpanded ? "عرض أقل" : " عرض المزيد"}
        </button>
      )}
    </div>
  );
}

export default PostContentText;
