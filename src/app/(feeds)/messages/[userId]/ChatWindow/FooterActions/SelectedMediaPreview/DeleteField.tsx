import { X } from "lucide-react";
import { UseFieldArrayRemove } from "react-hook-form";
// =========================================================
function DeleteField({
  remove,
  index,
}: {
  remove: UseFieldArrayRemove;
  index: number;
}) {
  return (
    <button
      onClick={() => remove(index)}
      type="button"
      className="absolute left-0.5 top-0.5 cursor-pointer z-10"
    >
      <X strokeWidth={1.5} className="size-3.5" />
    </button>
  );
}

export default DeleteField;
