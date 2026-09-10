import { useActiveModal } from "@/providers/ActiveModalProvider";
import { PostType } from "@/types/Post.type";
import Linkify from "linkify-react";
import PostContentTextModal from "./PostContentTextModal";
// =======================================
function PostContentText({ post }: { post: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="space-y-3 mb-3 relative">
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
          onClick={() => setActiveModal(post.id)}
          dir="auto"
          className="whitespace-pre-line leading-7 hover:bg-white/1 cursor-pointer mytransition [word-break:break-word] line-clamp-5"
        >
          {post.content}
        </p>
      </Linkify>
      {activeModal === post.id && <PostContentTextModal post={post} />}
    </div>
  );
}

export default PostContentText;
