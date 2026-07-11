import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell } from "lucide-react";
import Link from "next/link";
// ===============================================
function NotificationLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={"/notification"}
            className="bg-white/10 shadow bac hover:scale-105 mytransition active:scale-95 ring ring-gray-50/15 relative size-10 rounded-full flex items-center justify-center"
          >
            <Bell className="size-6"/>
            <span className="absolute -top-px -right-px size-3 bg-cyan-300 rounded-full shadow" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>الإشعارات</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default NotificationLink;
