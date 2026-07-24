import { Loader2 } from "lucide-react";
// =================================================
function ButtonShowReplies({
  repliesCount,
  loading,
  handleFetchReplies,
  showRepliesList
}: {
  repliesCount: number;
  handleFetchReplies: () => Promise<void>;
  loading:boolean,
  showRepliesList:boolean
}) {
  return (
    <>
      {repliesCount > 0 && (
        <button
          onClick={handleFetchReplies}
          disabled={loading}
          className="text-xs font-medium w-fit text-blue-400 hover:underline flex items-center gap-1 cursor-pointer my-1"
        >
          {loading && <Loader2 className="size-3 animate-spin" />}
          {showRepliesList ? (
            "إخفاء الردود"
          ) : (
            <> عرض ({repliesCount}) من الردود</>
          )}
        </button>
      )}
    </>
  );
}

export default ButtonShowReplies;
