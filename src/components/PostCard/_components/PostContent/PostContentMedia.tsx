import { useState } from "react";
import { Post } from "@/types/Post.type";
import PostContentMediaItem from "./PostContentMediaItem";
import clsx from "clsx";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
// ==============================================
function PostContentMedia({ post }: { post: Post }) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
  });
  return (
    <div
      className={clsx(post.media.length > 1 ? "grid grid-cols-2 gap-1" : "")}
    >
      {post.media.map((item) => (
        <PostContentMediaItem
          key={item.id}
          item={item}
          post={post}
          setShowImage={setShowImage}
        />
      ))}
      {showImage.open && (
        <ImagePreviewModal setShowImage={setShowImage} showImage={showImage} />
      )}
    </div>
  );
}

export default PostContentMedia;
