import { SavePostDBType } from "@/types/SavePost.type";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
// ===========================================================================
function UserSavedPostsMedia({ saveItem }: { saveItem: SavePostDBType }) {
  const [playingVideoId, setPlayingVideoId] = useState("");
  return (
    <div
      className={clsx(
        saveItem.post.medias.length > 1 && "grid grid-cols-2 gap-1",
      )}
    >
      {saveItem.post.medias.map((item) => (
        <button
          key={item.id}
          className={`w-full overflow-hidden bg-black rounded-lg relative ${saveItem.post.medias.length > 1 ? "h-30" : "h-60"}`}
        >
          {item.type == "IMAGE" && (
            <>
              <Image
                src={item.url}
                alt=""
                fill
                className="object-cover blur opacity-30 pointer-events-none"
              />
              <Image
                src={item.url}
                alt="صورة من المنشور"
                fill
                className="object-contain relative z-8"
              />
            </>
          )}
          {item.type == "VIDEO" && (
            <ReactPlayer
              playing={playingVideoId == item.id}
              onPlay={() => setPlayingVideoId(item.id)}
              src={item.url}
              width="100%"
              height="100%"
              controls
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default UserSavedPostsMedia;
