import { Pencil } from "lucide-react";
import { PostType } from "@/types/Post.type";
import EditPostModal from "../EditPostModal/EditPostModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ================================================================
function EditPostBtn({ post }: { post: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setActiveModal("edit_post_modal");
        }}
        className="postBtnOpt"
      >
        <Pencil className="postBtnOptIcon" /> تعديل
      </button>
      {activeModal == "edit_post_modal" && <EditPostModal post={post} />}
    </div>
  );
}

export default EditPostBtn;
