import { Post } from "@/types/Post.type";
import Linkify from "linkify-react";
// ===============================================
function Text({ post }: { post: Post }) {
  return (
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
        className="whitespace-pre-line text-[18px] leading-8 [word-break:break-word] max-h-100 overflow-y-auto"
      >
        {post.content}
      </p>
    </Linkify>
  );
}

export default Text;
