import BlockButton from "@/components/BlockButton/BlockButton";
import ClearingMessagesButton from "./ClearingMessagesButton";
// =============================================================
function BlockedUserChatActions({ receiverId }: { receiverId: string }) {
  return (
    <div className="h-15 bg-[#1D1F1F] flex items-center justify-center sm:gap-7 gap-4">
      <ClearingMessagesButton
        buttonStyle="flex cursor-pointer items-center gap-2 ring shadow ring-white/5 rounded-full sm:py-1 py-2 px-6 text-red-500/70 hover:bg-white/6 mytransition sm:text-[15px] text-xs"
        iconSize="sm:size-5 size-4"
        receiverId={receiverId}
      />
      <BlockButton
        userId={receiverId}
        style="flex cursor-pointer items-center gap-2 ring shadow ring-white/5 rounded-full sm:py-1 py-2 px-6 text-green-500/70 hover:bg-white/6 mytransition sm:text-[15px] text-xs"
        iconSize="sm:size-5 size-4"
      />
    </div>
  );
}

export default BlockedUserChatActions;
