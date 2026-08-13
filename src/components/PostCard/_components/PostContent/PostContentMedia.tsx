import { useState } from "react";
import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
import { PostType } from "@/types/Post.type";
import PostContentMediaItem from "./PostContentMediaItem";
import clsx from "clsx";
// ==============================================
function PostContentMedia({ post }: { post: PostType }) {
  const [showMedia, setShowMedia] = useState({
    open: false,
    preview: "",
  });
  return (
    <div
      className={clsx(post.medias.length > 1 ? "grid grid-cols-2 gap-1" : "")}
    >
      {post.medias.map((item) => (
        <PostContentMediaItem
          key={item.id}
          item={item}
          post={post}
          setShowMedia={setShowMedia}
        />
      ))}
      {showMedia.open && showMedia.preview && (
        <MediaPreviewModal setShowMedia={setShowMedia} showMedia={showMedia} />
      )}
    </div>
  );
}

export default PostContentMedia;
