import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { useFormContext, useWatch } from "react-hook-form";
import { TiPin } from "react-icons/ti";
// ==================================================
function TogglePinButton({ disabled }: { disabled: boolean }) {
  const { control, setValue } = useFormContext();
  const isPinnedToProfile = useWatch({
    control,
    name: "isPinnedToProfile",
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          disabled={disabled}
          type="button"
          onClick={() => setValue("isPinnedToProfile", !isPinnedToProfile)}
          className={clsx(
            "not-disabled:cursor-pointer mytransition text-2xl not-disabled:hover:text-white -rotate-45 ",
            isPinnedToProfile ? "text-emerald-500" : "text-gray-500 ",
          )}
        >
          <TiPin />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isPinnedToProfile
          ? "إلغاء التثبيت من الملف الشخصي"
          : "تثبيت في الملف الشخصي"}
      </TooltipContent>
    </Tooltip>
  );
}

export default TogglePinButton;
