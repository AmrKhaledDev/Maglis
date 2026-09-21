import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { PostType } from "@/types/Post.type";
import { motion } from "framer-motion";
import CopyPostLinkButton from "./CopyPostLinkButton";
import PostOwnerOptions from "./PostOwnerOptions/PostOwnerOptions";
import PostViewerOptions from "./PostViewerOptions/PostViewerOptions";
import SavePostButton from "./SavePostButton";
// ==============================================================
function PostOptionsMenu({
  post,
}: {
  post: PostType;
}) {
  const {activeMenu} = useActiveMenu()
  return (
    <>
      {activeMenu === post.id && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bgOptionsBox boxMenu"
        >
          <PostOwnerOptions post={post} />
          <PostViewerOptions post={post} />
          <hr className=" border-zinc-700 opacity-5" />
          <SavePostButton post={post} />
          <CopyPostLinkButton post={post} />
        </motion.div>
      )}
    </>
  );
}

export default PostOptionsMenu;
