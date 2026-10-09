import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Privacy } from "@prisma/client";
import { FaGlobeAfrica } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { IoLockClosedSharp } from "react-icons/io5";
// ================================================
function PostPrivacy({ privacy }: { privacy: Privacy }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        {privacy == "PUBLIC" && <FaGlobeAfrica className="size-3" />}
        {privacy == "PRIVATE" && <IoLockClosedSharp className="size-3" />}
        {privacy == "FRIENDS" && <HiUsers className="size-3" />}
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
