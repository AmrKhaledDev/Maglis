import { useActiveModal } from "@/providers/ActiveModalProvider";
// ================================================================
function ButtonCancel({ isPending }: { isPending: boolean }) {
  const { setActiveModal } = useActiveModal();
  return (
    <button
      disabled={isPending}
      onClick={() => setActiveModal(null)}
      className="flex-1 bg-[#DEE3E8]/10 not-disabled:hover:bg-[#DEE3E8]/20 py-1.5 rounded-md not-disabled:cursor-pointer text-sm shadow"
    >
      إلغاء
    </button>
  );
}

export default ButtonCancel;
