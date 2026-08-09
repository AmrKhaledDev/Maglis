import { PostType } from "@/types/Post.type";
import OptionsCopyLinkBtn from "./OptionsCopyLinkBtn";
import OptionsSavePostBtn from "./OptionsSavePostBtn";
import PostOwnerOptions from "./PostOwnerOptions/PostOwnerOptions";
import PostViewerOptions from "./PostViewerOptions";
import { motion } from "framer-motion";
// ==============================================================
function PostOptionsBox({
  activeMenu,
  post,
}: {
  activeMenu: string;
  post: PostType;
}) {
  return (
    <>
      {activeMenu === post.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bgOptionsBox boxMenu"
        >
          <PostOwnerOptions post={post} />
          <PostViewerOptions post={post} />
          <hr className=" border-zinc-700 opacity-5" />
          <OptionsSavePostBtn post={post} />
          <OptionsCopyLinkBtn post={post} />
        </motion.div>
      )}
    </>
  );
}

export default PostOptionsBox;
