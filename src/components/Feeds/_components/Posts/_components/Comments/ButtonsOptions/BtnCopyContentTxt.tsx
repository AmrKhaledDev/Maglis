import { useToast } from "@/providers/ToastProvider";
import { Copy } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =========================================
function BtnCopyContentTxt({
  content,
  setShowOptions,
  loading,
  setLoading
}: {
  content: string;
  setShowOptions: Dispatch<SetStateAction<string>>;
  loading:boolean,
  setLoading:Dispatch<SetStateAction<boolean>>
}) {
  const { setToast } = useToast();
  const handleCopyContent = async () => {
    try {
      setLoading(true)
      await navigator.clipboard.writeText(content);
      setToast({
        open: true,
        message: "تم نسخ المحتوى إلى الحافظة",
        duration: 2000,
        type: "success",
      });
      setShowOptions("");
    } catch (error) {
      console.error(error);
      setToast({
        message: "حدث خطأ عند نسخ المحتوى.",
        open: true,
        type: "error",
      });
    }finally{
      setLoading(false)
    }
  };
  return (
    <button
    disabled={loading}
      onClick={handleCopyContent}
      className="flex items-center gap-2 text-xs not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer"
    >
      <Copy className="size-4" /> نسخ النص
    </button>
  );
}

export default BtnCopyContentTxt;
