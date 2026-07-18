import TextareaAutosize from "react-textarea-autosize";
import SelectPrivacy from "./SelectPrivacy";
import { useWatch } from "react-hook-form";
import { CreatePost_Modal_CenterPropsType } from "../../_types/CreatePost_Modal_CenterProps.type";
// ==========================================================
function CreatePostModalCenter({
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
      <div className="flex items-center justify-between text-gray-300">
        <p className="text-sm flex items-center gap-1">
          5000 /
          <span
            className={`${content.length > 5000 ? "text-red-400" : "text-green-400"}`}
          >
            {content.length}
          </span>
        </p>
        <SelectPrivacy
          disabled={disabled}
          setValue={setValue}
          control={control}
        />
      </div>
    </div>
  );
}

export default CreatePostModalCenter;
