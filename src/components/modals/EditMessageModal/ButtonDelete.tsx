import { UseMutateFunction } from "@tanstack/react-query";
// ===========================================================
function ButtonDelete({
  isPending,
  mutate,
  newMessageContent,
}: {
  isPending: boolean;
  mutate: UseMutateFunction<string, Error, "DELETE" | "EDIT", unknown>;
  newMessageContent: string;
}) {
  return (
    <button
      onClick={() => mutate("DELETE")}
      disabled={isPending || !newMessageContent.trim()}
      className="py-1.5 rounded-md not-disabled:cursor-pointer text-sm flex-1 font-medium disabled:bg-gray-500 disabled:text-gray-800 shadow bg-red-950/20 text-red-500 not-disabled:hover:bg-red-950/30"
    >
      حذف
    </button>
  );
}

export default ButtonDelete;
