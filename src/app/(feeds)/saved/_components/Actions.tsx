import SavePostButton from "@/components/SavePostButton/SavePostButton";
import { SavePostType } from "@/types/SavePost.type";
import { FaExternalLinkAlt } from "react-icons/fa";
import { GoBookmarkSlashFill } from "react-icons/go";
// =======================================================================
function Actions({ item }: { item: SavePostType }) {
  return (
    <div className="flex items-center gap-2.5 mt-2 text-xs">
      <SavePostButton
        postId={item.postId}
        iconStyle="pb-0.5 size-4"
        Icon={GoBookmarkSlashFill}
        withText={true}
        unSaveText="إلغاء الحفظ"
        buttonStyle="w-fit hover:text-gray-200 flex items-center gap-1.5 font-medium cursor-pointer"
      />
      <span className="size-0.5 bg-white/30 rounded-full block" />
      <button className="w-fit hover:text-blue-500 text-blue-600 flex items-center gap-1.5 font-medium cursor-pointer">
        <FaExternalLinkAlt className="pb-0.5 size-3.5" />
        عرض
      </button>
    </div>
  );
}

export default Actions;
