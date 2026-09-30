import { UseMutateFunction } from "@tanstack/react-query";
// ===============================================================
function ButtonSave({
  isPending,
  mutate,
}: {
  isPending: boolean;
  mutate: UseMutateFunction<string, Error, "DELETE" | "EDIT", unknown>;
}) {
  return (
    <button
      onClick={() => mutate("EDIT")}
      disabled={isPending}
      className="py-1.5 rounded-md not-disabled:cursor-pointer text-sm flex-1 font-medium bg-[#4780d2] shadow not-disabled:hover:bg-[#3361a2]"
    >
      حفظ
    </button>
  );
}

export default ButtonSave;
