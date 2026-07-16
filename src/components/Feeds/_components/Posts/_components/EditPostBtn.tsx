import { PostDBType } from "@/types/PostDB.type";
import { useState } from "react";
import { Pencil } from "lucide-react";
import EditPostBtn_Modal from "./EditPostBtn_Modal";
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
      {modal && <EditPostBtn_Modal post={post} setModal={setModal} />}
    </div>
  );
}

export default EditPostBtn;
