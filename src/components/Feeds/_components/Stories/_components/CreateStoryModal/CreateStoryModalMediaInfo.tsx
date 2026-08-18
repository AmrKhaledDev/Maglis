import { ImageUp } from "lucide-react";
// ==========================================
function StoryModalMediaInfo() {
  return (
    <div className="flex gap-2.5">
      <ImageUp
        strokeWidth={1.5}
        className="p-1 size-6.5 ring ring-sky-300/30 rounded-md bg-gray-700 text-sky-500 shadow"
      />
      <div>
        <h2 className="font-semibold">صورة / فيديو</h2>
        <p className="text-xs text-gray-300 font-normal">
          أختر صورة / فيديو من جهازك لعرضها.
        </p>
      </div>
    </div>
  );
}

export default StoryModalMediaInfo;
