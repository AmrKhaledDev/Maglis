import { Story } from "@prisma/client";
import clsx from "clsx";
// =====================================================
function ProgressBar({
  stories,
  currentIndex,
}: {
  stories: Story[];
  currentIndex: number;
}) {
  return (
    <>
      {stories.length > 1 && (
        <div dir="ltr" className="flex items-center w-full z-20 gap-2">
          {stories.map((_, i) => (
            <span
              key={i}
              className={clsx(
                "flex-1 block h-0.5 rounded-full shadow",
                currentIndex == i ? "bg-white" : "bg-[#e1e3d569]",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ProgressBar;
