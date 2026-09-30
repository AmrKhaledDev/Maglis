import BlockButton from "@/components/BlockButton/BlockButton";
import ClearingMessagesButton from "./ClearingMessagesButton";
// =============================================================
function BlockedUserChatActions({ receiverId }: { receiverId: string }) {
  return (
    <div className="h-15 bg-[#1D1F1F] flex items-center justify-center gap-7">
      <ClearingMessagesButton
        buttonStyle="flex cursor-pointer items-center gap-2 ring shadow ring-white/5 rounded-full py-1 px-6 text-red-500/70 hover:bg-white/6 mytransition"
        iconSize="size-5"
        receiverId={receiverId}
      />
      <BlockButton
        userId={receiverId}
        style="flex cursor-pointer items-center gap-2 ring shadow ring-white/5 rounded-full py-1 px-6 text-green-500/70 hover:bg-white/6 mytransition"
        iconSize="size-5"
      />
    </div>
  );
}

export default BlockedUserChatActions;
