import { CreateAction } from "@/actions/Post/Create.action";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =================================================================
function MediaPreviewActions({
  setMedia,
  setMediaFile,
  mediaFile,
}: {
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
  mediaFile: File | null;
}) {
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      if (!mediaFile || !(mediaFile instanceof File))
        throw new Error("لا يمكنك إرسال منشور فارغ");
      try {
        const formData = new FormData();
        formData.append("file", mediaFile);
        const { data } = await axios.post("/api/upload-media", formData);
        const result = await CreateAction("FRIENDS", false, false, undefined, [
          data,
        ]);
        if (!result.success)
          throw new Error(
            result.message ?? "حدث خطأ غير متوقع برجاء المحاوله لاحقاً",
          );
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error))
          throw new Error(
            error.response?.data.error ||
              "حدث خطأ أثناء إرسال الصورة / الفيديو.",
          );
        throw new Error("حدث خطأ أثناء رفع الصورة / الفيديو المرفق");
      }
    },
    onSuccess: () => {
      setMediaFile(null);
      setMedia("");
      invalidateUserCaches(queryClient, userSession);
    },
  });
  return (
    <div className="flex flex-col gap-3">
      {error && <AlertMessage message={error.message} type="error" />}
      <div className="flex items-center gap-1.5">
        <button
          disabled={isPending}
          onClick={() => mutate()}
          className="w-fit not-disabled:hover:outline disabled:bg-gray-400 disabled:text-gray-600 not-disabled:hover:outline-blue-600 outline-offset-2 text-white rounded-full bg-blue-600 text-xs font-semibold py-2 px-6 not-disabled:cursor-pointer "
        >
          {isPending ? "برجاء الإنتظار." : "نشر"}
        </button>
        <button
          disabled={isPending}
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

export default MediaPreviewActions;
