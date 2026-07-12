import AddImages from "./AddImages";
import AddVideos from "./AddVideos";
import { CreatePost_Modal_FooterType } from "../_types/CreatePost_Modal_FooterType";
// ========================================
function CreatePost_Modal_Footer({
  fields,
  append,
  content,
  loading,
}: CreatePost_Modal_FooterType) {
  const disabled = content.length < 1 && fields.length < 1 ? true : false;
  return (
    <div className="flex items-center justify-between mt-5">
      <div className="flex items-center gap-2">
        <AddImages disabled={loading} fields={fields} append={append} />
        <AddVideos disabled={loading} fields={fields} append={append} />
      </div>
      <button
        disabled={disabled || loading}
        className="text-sm rounded-full not-disabled:hover:outline disabled:bg-gray-400 disabled:text-gray-600 not-disabled:active:outline active:outline-blue-600 outline-offset-2 not-disabled:hover:outline-blue-600 bg-blue-600 text-white relative block py-2 w-30 shadow font-semibold not-disabled:cursor-pointer"
      >
       {loading? "برجاء الإنتظار..." :" نشر"}
      </button>
    </div>
  );
}

export default CreatePost_Modal_Footer;
