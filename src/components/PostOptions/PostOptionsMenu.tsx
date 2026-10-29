import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { Post } from "@/types/Post.type";
import { motion } from "framer-motion";
import CopyPostLinkButton from "./CopyPostLinkButton";
import PostOwnerOptions from "./PostOwnerOptions/PostOwnerOptions";
import PostViewerOptions from "./PostViewerOptions/PostViewerOptions";
import SavePostButton from "../SavePostButton/SavePostButton";
import { Save } from "lucide-react";
// ==============================================================
function PostOptionsMenu({ post }: { post: Post }) {
  const { activeMenu } = useActiveMenu();
  return (
    <>
      {activeMenu === post.id && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgMenuBox boxMenu"
        >
          <PostOwnerOptions post={post} />
          <PostViewerOptions post={post} />
          <hr className=" border-zinc-700 opacity-5" />
          <SavePostButton
            postId={post.id}
            Icon={Save}
            iconStyle="btnOptIcon"
            withText={true}
            saveText="حفظ"
            unSaveText="محفوظ"
            buttonStyle="btnOptBox"
          />
          <CopyPostLinkButton post={post} />
        </motion.div>
      )}
    </>
  );
}

export default PostOptionsMenu;
