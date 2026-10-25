"use client";
import AddEmoji from "@/components/AddEmoji/AddEmoji";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { FaLink } from "react-icons/fa6";
import SelectedMediaPreviewModal from "../../../../../../components/modals/SelectedMediaPreviewModal/SelectedMediaPreviewModal";
import FooterActionPropsType from "../../../_types/FooterActionsProps.type";
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
    <div className="flex items-center gap-2">
      <AddEmoji
        textInputRef={messageInputRef}
        emojiPickerStyle="left-0! bottom-10 h-100"
        style="p-2 rounded-full text-[#d6bf93] ring ring-white/8 shadow backdrop-blur-3xl bg-white/5 cursor-pointer size-9"
      />
      <div className="relative">
        <button
          type="button"
          onClick={() => setActiveMenu((prev) => (prev ? "" : "upload_files"))}
          className="p-2 rounded-full text-[#d6bf93] ring ring-white/8 shadow backdrop-blur-3xl bg-white/5 text-xl cursor-pointer btnActiveMenu"
        >
          <FaLink />
        </button>
        <UploadFiles fields={fields} append={append} />
      </div>
      {fields.length > 0 && (
        <SelectedMediaPreviewModal
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
