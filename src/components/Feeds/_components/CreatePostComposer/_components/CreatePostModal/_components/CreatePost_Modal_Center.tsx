import TextareaAutosize from "react-textarea-autosize";
import SelectPrivacy from "./SelectPrivacy";
import { useWatch } from "react-hook-form";
import { CreatePost_Modal_CenterPropsType } from "../_types/CreatePost_Modal_CenterPropsType";
// ==========================================================
function CreatePost_Modal_Center({
  register,
  setValue,
  control,
  disabled,
}: CreatePost_Modal_CenterPropsType) {
  const content = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });
  return (
    <div className="space-y-1">
      <TextareaAutosize
        disabled={disabled}
        {...register("content")}
        minRows={7}
        maxRows={15}
        placeholder="بماذا تفكر اليوم يا عمرو غفر الله له ؟"
        className="w-full p-2 leading-6 rounded resize-none outline-none border border-gray-50/5 focus:border-gray-50/15 transition"
      />
      <div className="flex items-center justify-between">
        <p
          className={`text-sm ${content.length > 2000 ? "text-red-400" : "text-gray-300 "}`}
        >
          2000 / {content.length}
        </p>
        <SelectPrivacy disabled={disabled} setValue={setValue} control={control} />
      </div>
    </div>
  );
}

export default CreatePost_Modal_Center;
