import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { UseMutateFunction } from "@tanstack/react-query";
import { SendHorizontal } from "lucide-react";
// ========================================================================
function CreateStoryModalFooter({
  handleCreateStory,
  isPending,
  error,
}: {
  handleCreateStory: UseMutateFunction<void, Error, void, unknown>;
  isPending: boolean;
  error: Error | null;
}) {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex flex-col gap-5">
      {error && <AlertMessage message={error.message} type="error" />}
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleCreateStory()}
          disabled={isPending}
          className="flex text-sm items-center disabled:bg-gray-400 disabled:text-gray-600 font-semibold gap-3 py-2.5 bg-sky-700 px-8 not-disabled:cursor-pointer shadow rounded-lg not-disabled:hover:outline outline-sky-600 outline-offset-2"
        >
          {isPending ? (
            "جاري تحضير قصتك..."
          ) : (
            <>
              <SendHorizontal className="size-5" /> نشر القصة
            </>
          )}
        </button>
        <button
          onClick={() => setActiveModal(null)}
          className="py-2.5 px-7 border-white/15 hover:scale-103 text-sm active:scale-95 font-semibold mytransition text-gray-200 border rounded-lg bg-gray-900 shadow cursor-pointer"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}

export default CreateStoryModalFooter;
