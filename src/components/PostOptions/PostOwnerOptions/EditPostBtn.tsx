import { useState } from "react";
import { Pencil } from "lucide-react";
import { PostType } from "@/types/Post.type";
import EditPostModal from "../EditPostModal/EditPostModal";
// ================================================================
function EditPostBtn({ post }: { post: PostType }) {
  const [showModalEditPost, setShowModalEditPost] = useState(false);
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setShowModalEditPost(true);
        }}
        className="postBtnAct"
      >
        <Pencil className="postBtnActIcon" /> تعديل
      </button>
      {showModalEditPost && (
        <EditPostModal
          post={post}
          setShowModalEditPost={setShowModalEditPost}
        />
      )}
    </div>
  );
}

export default EditPostBtn;
