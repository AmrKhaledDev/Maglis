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
          <Globe className="size-3.5 text-gray-300" strokeWidth={1.5} />
        )}
        {privacy == "PRIVATE" && (
          <Lock className="size-3.5 text-gray-300"strokeWidth={1.5} />
        )}
        {privacy == "FRIENDS" && (
          <Users className="size-3.5 text-gray-300" strokeWidth={1.5}/>
        )}
      </TooltipTrigger>
      <TooltipContent side="left">
        {privacy == "PUBLIC" && "عام"}
        {privacy == "PRIVATE" && "خاص"}
        {privacy == "FRIENDS" && "للأصدقاء"}
      </TooltipContent>
    </Tooltip>
  );
}

export default PostPrivacy;
