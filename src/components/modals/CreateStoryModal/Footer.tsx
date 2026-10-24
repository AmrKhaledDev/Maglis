import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ========================================================================
function Footer({
  isPending,
  error,
}: {
  isPending: boolean;
  error: Error | null;
}) {
  const { setActiveModal } = useActiveModal();
  return (
    <div className="flex flex-col gap-5">
      {error && <AlertMessage message={error.message} type="error" />}
      <div className="flex items-center gap-10">
        <button
          type="submit"
          disabled={isPending}
          className="flex text-sm items-center disabled:bg-gray-400 disabled:text-gray-600 font-semibold gap-3 py-2 bg-sky-900/30 text-sky-500 px-8 not-disabled:cursor-pointer shadow rounded-lg not-disabled:hover:outline outline-sky-900 outline-offset-2"
        >
          {isPending ? (
            "جاري تحضير قصتك..."
          ) : (
            <>
               نشر القصة
            </>
          )}
        </button>
        <button
          onClick={() => setActiveModal(null)}
          className="text-sm active:scale-95 font-semibold mytransition rounded-lg bg-gray-900/30 text-gray-400 hover:text-gray-500 shadow cursor-pointer ml-3"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}

export default Footer;
