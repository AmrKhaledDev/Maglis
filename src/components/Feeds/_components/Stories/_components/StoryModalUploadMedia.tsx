import { CloudDownload, ImageUp } from "lucide-react";
// ========================================
function StoryModalUploadMedia() {
  return (
    <div className="flex flex-col gap-3">
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
      <label
        htmlFor="upload_photo"
        className="w-full cursor-pointer hover:bg-gray-900/80 mytransition rounded-lg bg-gray-900/50 border border-white/20 border-dashed h-55 flex flex-col gap-2 justify-center items-center"
      >
        <CloudDownload className="size-15 bg-blue-800/30 rounded-full text-blue-700 p-3" />
        <h2 className="text-xl font-semibold text-gray-200">اضغط للاختيار</h2>
        <p className="text-xs text-gray-400">
          صورة حتى - 10MB
          <br />
          فيديو حتى - 100MB
        </p>
      </label>
      <input
        accept="image/png,image/jpeg,image/webp"
        type="file"
        id="upload_photo"
        className="hidden"
        hidden
      />
    </div>
  );
}

export default StoryModalUploadMedia;
