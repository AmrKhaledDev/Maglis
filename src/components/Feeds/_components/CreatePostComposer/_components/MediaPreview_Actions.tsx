import { CreatePostAction } from "@/actions/Post/Create/CreatePost.action";
import axios from "axios";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
// ============================================================
function MediaPreview_Actions({
  setMedia,
  setMediaFile,
  mediaFile,
}: {
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
  mediaFile: File | null;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreatePost = async () => {
    try {
      setLoading(true);
      if (!mediaFile || !(mediaFile instanceof File))
        return setError("لا يمكنك إرسال منشور فارغ");
      const formData = new FormData();
      formData.append("file", mediaFile);
      formData.append("pathname", "maglis-posts-media");
      const { data } = await axios.post("/api/upload-media", formData);
      const result = await CreatePostAction("PUBLIC", false, false, undefined, [
        data,
      ]);
      if (!result.success)
        return setError(
          result.message ?? "حدث خطأ غير متوقع برجاء المحاوله لاحقاً",
        );
      setMediaFile(null);
      setMedia("");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error))
        return setError(error.response?.data.error);
      setError("حدث خطأ أثناء رفع الصورة / الفيديو المرفق");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <div className="flex items-center gap-1.5">
        <button
          disabled={loading}
          onClick={handleCreatePost}
          className="w-fit not-disabled:hover:outline disabled:bg-gray-400 disabled:text-gray-600 not-disabled:hover:outline-blue-600 outline-offset-2 text-white rounded-full bg-blue-600 text-xs font-semibold py-2 px-6 not-disabled:cursor-pointer "
        >
          {loading ? "برجاء الإنتظار..." : " نشر"}
        </button>
        <button
          disabled={loading}
          onClick={() => {
            setMedia("");
            setMediaFile(null);
          }}
          className="w-fit bg-red-600/50 text-red-200 not-disabled:hover:outline not-disabled:hover:outline-red-600/50 outline-offset-2 rounded-full py-2 px-6 not-disabled:cursor-pointer"
        >
          <Trash className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default MediaPreview_Actions;
