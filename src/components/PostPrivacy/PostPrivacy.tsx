import { Globe, Lock, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Privacy } from "@prisma/client";
// ================================================
function PostPrivacy({ privacy }: { privacy: Privacy }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        {privacy == "PUBLIC" && (
          <Globe className="size-3.5 opacity-80" strokeWidth={1} />
        )}
        {privacy == "PRIVATE" && (
          <Lock className="size-3.5 opacity-80"strokeWidth={1} />
        )}
        {privacy == "FRIENDS" && (
          <Users className="size-3.5 opacity-80" strokeWidth={1}/>
        )}
      </TooltipTrigger>
      <TooltipContent side="top">
        {privacy == "PUBLIC" && "عام"}
        {privacy == "PRIVATE" && "خاص"}
        {privacy == "FRIENDS" && "للأصدقاء"}
      </TooltipContent>
    </Tooltip>
  );
}

export default PostPrivacy;
