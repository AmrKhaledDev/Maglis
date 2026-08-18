import { useState } from "react";
import { PostType } from "@/types/Post.type";
import PostContentMediaItem from "./PostContentMediaItem";
import clsx from "clsx";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
// ==============================================
function PostContentMedia({ post }: { post: PostType }) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
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
