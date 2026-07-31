import { UseFormRegister } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { EditPostModalFormType } from "../../_types/EditPostModalForm.type";
// =======================================================
function EditPostBtnModalContent({
  register,
  content,
}: {
  register:UseFormRegister<EditPostModalFormType>
  content: string;
}) {
  return (
    <div className="w-full mb-4">
      <TextareaAutosize
        placeholder="بماذا تفكر اليوم يا عمرو غفر الله له ؟"
        className=" w-full resize-none  p-3 rounded-xl text-sm outline-none focus:border-white/5 border border-transparent mytransition"
        minRows={8}
        maxRows={10}
        {...register("content")}
      />
      <p className="text-sm flex items-center gap-1 text-gray-200 font-normal">
        5000 /
        <span
          className={`${content.length > 5000 ? "text-red-400" : "text-green-400"}`}
        >
          {content.length}
        </span>
      </p>
    </div>
  );
}

export default EditPostBtnModalContent;
