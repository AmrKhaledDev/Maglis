import { PostDBType } from "@/types/Post.type";
import { useState } from "react";
import { Pencil } from "lucide-react";
import EditPostBtnModal from "./EditPostBtnModal";
// ================================================================
function EditPostBtn({ post }: { post: PostDBType }) {
  const [modal, setModal] = useState(false);
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setModal(true);
        }}
        className="postBtnAct"
      >
        <Pencil className="postBtnActIcon" /> تعديل
      </button>
      {modal && <EditPostBtnModal post={post} setModal={setModal} />}
    </div>
  );
}

export default EditPostBtn;
