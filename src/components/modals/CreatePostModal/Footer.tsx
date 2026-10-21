import { useFormContext, useWatch } from "react-hook-form";
import AddImages from "./AddImages";
import AddVideos from "./AddVideos";
import { FooterPropsType } from "./_types/FooterProps.type";
import { FormType } from "./_types/Form.type";
import AddEmoji from "@/components/AddEmoji/AddEmoji";
// =============================================================================================
function Footer({ fields, append, loading, textareaRef }: FooterPropsType) {
  const { control } = useFormContext<FormType>();
  const content = useWatch({
    control,
    name: "content",
  });
  const disabled = content.length < 1 && fields.length < 1 ? true : false;
  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center gap-2.5">
        <AddImages disabled={loading} fields={fields} append={append} />
        <AddVideos disabled={loading} fields={fields} append={append} />
        <AddEmoji
          textInputRef={textareaRef}
          style="text-gray-400 mt-1.5 hover:text-white cursor-pointer mytransition"
          emojiPickerStyle="right-2 bottom-5 h-90!"
        />
      </div>
      <button
        disabled={disabled || loading}
        className="text-sm rounded-full not-disabled:hover:outline disabled:bg-gray-400 disabled:text-gray-700 not-disabled:active:outline active:outline-blue-600 outline-offset-2 not-disabled:hover:outline-blue-600 bg-blue-600 text-white relative block py-2 w-30 shadow font-medium not-disabled:cursor-pointer"
      >
        {loading ? "برجاء الإنتظار.." : "نشر"}
      </button>
    </div>
  );
}

export default Footer;
