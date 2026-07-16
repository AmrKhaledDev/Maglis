import { $Enums } from "@prisma/client";
import { ChangeEvent } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { EditPostModalFormType } from "../_types/EditPostModalForm.type";
import AddImage from "./AddImage";
import AddVideo from "./AddVideo";
// ==================================================
function EditPostBtn_Modal_Footer({
  fields,
  append,
  loading,
}: {
  fields: ({
    preview: string;
    type: $Enums.MediaType;
    file: File | null;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
  append: UseFieldArrayAppend<EditPostModalFormType, "media">;
  loading: boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (fields.length >= 4) return;
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      append({
        type: file.type.startsWith("video") ? "VIDEO" : "IMAGE",
        preview: url,
        file,
      });
      e.target.value = "";
    }
  };
  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-2">
        <AddImage loading={loading} handleChange={handleChange} />
        <AddVideo loading={loading} handleChange={handleChange} />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="text-sm text-gray-200 rounded-full not-disabled:hover:outline disabled:bg-gray-400 disabled:text-gray-600 not-disabled:active:outline active:outline-blue-600 outline-offset-2 not-disabled:hover:outline-blue-600 bg-blue-600  relative block py-2 w-30 shadow font-semibold not-disabled:cursor-pointer"
      >
      {loading? "جاري النشر..." :"نشر"}
      </button>
    </div>
  );
}

export default EditPostBtn_Modal_Footer;
