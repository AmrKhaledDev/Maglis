import { Pencil } from "lucide-react";
import { PostType } from "@/types/Post.type";
import EditPostModal from "../../modals/EditPostModal/EditPostModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ================================================================
function EditPostButton({ post }: { post: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setActiveModal("edit_post_modal");
        }}
        className="btnOptBox"
      >
        <Pencil className="btnOptIcon" /> تعديل
      </button>
      {activeModal == "edit_post_modal" && <EditPostModal post={post} />}
    </div>
  );
}

export default EditPostButton;
