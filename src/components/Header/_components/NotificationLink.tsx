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
            className="hover:scale-105 mytransition active:scale-95 relative size-10 rounded-full flex items-center justify-center"
          >
            <Bell className="size-6" strokeWidth={1} />
            <span className="absolute top-0.5 right-1 size-4 bg-red-700 rounded-full flex items-center justify-center text-xs shadow-lg">
              1
            </span>
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
