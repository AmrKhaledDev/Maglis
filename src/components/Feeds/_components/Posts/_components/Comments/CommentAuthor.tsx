import Image from "next/image";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Prisma } from "@prisma/client";
import { PostDBType } from "@/types/PostDB.type";
import { PenLine } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// =========================================================================
dayjs.locale("ar");
dayjs.extend(relativeTime);
function CommentAuthor({
  user,
  post,
}: {
  user: Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      image: true;
      username: true;
    };
  }>;
  post: PostDBType;
}) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={user.image ?? "/user.jpg"}
        alt="صورة المستخدم"
        width={60}
        height={60}
        className="object-cover shrink-0 size-8 rounded-full"
      />
      <div className="w-full">
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold">{user.name}</h2>
          <span className="size-[2.5px] rounded-full block bg-white opacity-25" />
          <h4 dir="auto" className="text-xs text-slate-300">
            @{user.username}
          </h4>
          {post.authorId == user.id && (
            <Tooltip>
              <TooltipTrigger>
                <p className="mr-3 text-xs rounded-full text-slate-400">
                  <PenLine className="size-3.5" strokeWidth={1.5} />
                </p>
              </TooltipTrigger>
              <TooltipContent side="left">الناشر</TooltipContent>
            </Tooltip>
          )}
        </div>
        <p className="text-[10px] text-slate-300">
          {dayjs(new Date()).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default CommentAuthor;
