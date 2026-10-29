import UserImage from "@/components/UserImage/UserImage";
import { SavePost } from "@/types/SavePost.type";
import Image from "next/image";
import Link from "next/link";
import { TbPlayerPlayFilled } from "react-icons/tb";
import ReactPlayer from "react-player";
// ================================================
function Media({ item }: { item: SavePost }) {
  const post = item.post;
  const media = post.media[0];
  return (
    <Link
      target="_blank"
      href={`/post/${item.postId}`}
      className="size-35 rounded-xl overflow-hidden shrink-0 relative"
    >
      {media ? (
        <>
          {media.type === "IMAGE" && (
            <Image
              src={item.post.media[0].url}
              alt="صورة"
              fill
              className="object-cover"
            />
          )}
          {media.type === "VIDEO" && (
            <>
              <ReactPlayer
                src={media.url}
                width="100%"
                height="100%"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-1" />
              <TbPlayerPlayFilled className="absolute z-1 p-3 bg-black/30 rounded-full border-2 text-xl border-white size-12 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </>
          )}
        </>
      ) : (
        <UserImage src={item.post.author.image} size="size-full" />
      )}
    </Link>
  );
}

export default Media;
