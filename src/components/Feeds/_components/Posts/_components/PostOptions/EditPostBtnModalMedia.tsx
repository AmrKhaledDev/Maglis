import { $Enums } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { UseFieldArrayRemove } from "react-hook-form";
import ReactPlayer from "react-player";
// ==================================================
function EditPostBtnModalMedia({
  remove,
  fields,
  loading,
}: {
  remove: UseFieldArrayRemove;
  fields: ({
    preview: string;
    type: $Enums.MediaType;
    file: File | null;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {fields.map((item, i) => (
        <div key={item.id} className="relative size-20">
          {item.type == "IMAGE" && (
            <Image
              src={item.preview}
              fill
              alt="صورة للمنشور"
              className="object-cover rounded"
            />
          )}
          {item.type == "VIDEO" && (
            <ReactPlayer
              src={item.preview}
              width="100%"
              height="100%"
              controls
            />
          )}
          <button
            disabled={loading}
            type="button"
            onClick={() => remove(i)}
            className="absolute button disabled:hidden hover:text-black top-px left-px cursor-pointer p-1 hover:bg-white mytransition rounded-full"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default EditPostBtnModalMedia;
