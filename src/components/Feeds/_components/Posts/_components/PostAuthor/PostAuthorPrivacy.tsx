import { Globe, Lock, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PostDBType } from "@/types/PostDB.type";
// ================================================
function PostAuthorPrivacy({ post }: { post: PostDBType }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        {post.privacy == "PUBLIC" && (
          <Globe className="size-3.5 text-gray-300" strokeWidth={1.5} />
        )}
        {post.privacy == "PRIVATE" && (
          <Lock className="size-3.5 text-gray-300"strokeWidth={1.5} />
        )}
        {post.privacy == "FRIENDS" && (
          <Users className="size-3.5 text-gray-300" strokeWidth={1.5}/>
        )}
      </TooltipTrigger>
      <TooltipContent side="left">
        {post.privacy == "PUBLIC" && "عام"}
        {post.privacy == "PRIVATE" && "خاص"}
        {post.privacy == "FRIENDS" && "للأصدقاء"}
      </TooltipContent>
    </Tooltip>
  );
}

export default PostAuthorPrivacy;
