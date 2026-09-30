import { useActiveModal } from "@/providers/ActiveModalProvider";
import { UseMutateFunction } from "@tanstack/react-query";
import { createPortal } from "react-dom";
// =======================================================================
function BlockModal({
  handleUserBlock,
  isPending,
}: {
  handleUserBlock: UseMutateFunction<void, Error, void, unknown>;
  isPending: boolean;
}) {
  const { setActiveModal } = useActiveModal();
  return createPortal(
    <div className="fixed inset-0 bg-black/10 z-100 backdrop-blur-[3px] flex items-center justify-center menuKeepOpen">
      <div className="modalStyle flex flex-col items-center overflow-hidden gap-4">
        <div className="flex flex-col items-center gap-4 p-2">
          <h1 className="font-semibold sm:text-2xl text-xl">تأكيد الحظر</h1>
          <p className="text-center text-gray-200">
            لم يتمكن هذا المستخدم من التواصل معك بعد تنفيذ هذا الإجراء. هل انت
            متأكد من الحظر؟
          </p>
        </div>
        <div className="p-5 flex items-center gap-5 bg-black/5 w-full justify-center rounded-lg">
          <button
            onClick={() => {
              handleUserBlock();
              setActiveModal(null);
            }}
            disabled={isPending}
            className="py-2 flex-1 ring ring-white/5 shadow  text-red-500 rounded-full cursor-pointer"
          >
            تأكيد
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="py-2 flex-1 ring ring-gray-50/2 hover:bg-black/15 shadow rounded-full cursor-pointer bg-black/10"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default BlockModal;
