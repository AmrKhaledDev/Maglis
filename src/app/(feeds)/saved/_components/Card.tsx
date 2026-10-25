import React from "react";
import Media from "./Media";
import Link from "next/link";
import MetaData from "./MetaData";
import Author from "./Author";
import { IoBookmarkSharp } from "react-icons/io5";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import { SavePostType } from "@/types/SavePost.type";
import Actions from "./Actions";
// ==============================================================================
dayjs.extend(relativeTime);
dayjs.locale("ar");
function Card({ item }: { item: SavePostType }) {
  return (
    <div className="flex items-center gap-5">
      <Media item={item} />
      <div className="flex flex-col gap-1 w-full">
        <Link
          target="_blank"
          href={`/post/${item.postId}`}
          className="font-bold text-[17px] line-clamp-2 hover:underline decoration-1"
        >
          {item.post.content}
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <MetaData item={item} />
            <Author item={item} />
          </div>
          <p className="text-[10px] font-semibold pl-2 text-green-600 flex items-center gap-0.5">
            <IoBookmarkSharp className="size-4.5 pb-1" />
            حُفظ {dayjs(item.createdAt).fromNow()}
          </p>
        </div>
        <Actions item={item} />
      </div>
    </div>
  );
}

export default Card;
