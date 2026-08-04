import { Repeat } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
// ==================================
function ReplaceImageBtn({
  setAvatarFile,
  setAvatarPreview,
}: {
  setAvatarFile: Dispatch<SetStateAction<File | null>>;
  setAvatarPreview: Dispatch<SetStateAction<string>>;
}) {
  const handleReplaceAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarFile(file);
      setAvatarPreview(url);
      e.target.value = "";
    }
  };
  return (
    <div>
      <label
        htmlFor="replace_avatar"
        className="flex items-center hover:bg-slate-600/20 mytransition p-3 text-[17px] text-gray-300 cursor-pointer flex-col"
      >
        <Repeat strokeWidth={1.5} /> تغيير
      </label>
      <input
        onChange={handleReplaceAvatar}
        accept="image/*"
        type="file"
        id="replace_avatar"
        hidden
        className="hidden"
      />
    </div>
  );
}

export default ReplaceImageBtn;
