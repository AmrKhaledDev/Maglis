import { Pencil } from "lucide-react";
import { Post } from "@/types/Post.type";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import CreatePostModal from "@/components/modals/CreatePostModal/CreatePostModal";
// ================================================================
function EditPostButton({ post }: { post: Post }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setActiveModal(`edit_post_${post.id}`);
        }}
        className="btnOptBox"
      >
        <Pencil className="btnOptIcon" /> تعديل
      </button>
      {activeModal === `edit_post_${post.id}` && (
        <CreatePostModal currentPost={post} />
      )}
    </div>
  );
}

export default EditPostButton;
