"use client";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { FiPlus } from "react-icons/fi";
import FooterActionPropsType from "../../_types/FooterActionsProps.type";
import AddEmoji from "./AddEmoji";
import SelectedMediaPreview from "./SelectedMediaPreview/SelectedMediaPreview";
import UploadFiles from "./UploadFiles";
// =================================================================
function FooterActions({
  fields,
  append,
  remove,
  messageInputRef,
  isPending,
}: FooterActionPropsType) {
  const { setActiveMenu } = useActiveMenu();
  return (
    <div className="flex items-center gap-2.5">
      <AddEmoji messageInputRef={messageInputRef} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setActiveMenu((prev) => (prev ? "" : "upload_files"))}
          className="p-2 rounded-full shadow bg-white/5 text-gray-400 text-xl cursor-pointer btnActiveMenu"
        >
          <FiPlus />
        </button>
        <UploadFiles fields={fields} append={append} />
      </div>
      {fields.length > 0 && (
        <SelectedMediaPreview
          append={append}
          fields={fields}
          remove={remove}
          isPending={isPending}
        />
      )}
    </div>
  );
}

export default FooterActions;
