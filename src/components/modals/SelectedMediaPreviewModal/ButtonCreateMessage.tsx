import { Loader, SendHorizontal } from "lucide-react";
import z from "zod";
// =====================================================================
function ButtonCreateMessage({
  fields,
  isPending,
}: {
  fields: ({
    type: "IMAGE" | "VIDEO" | "PDF";
    url: string;
    file?: z.core.File | null | undefined;
  } & Record<"id", string>)[];
  isPending: boolean;
}) {
  return (
    <button
      disabled={isPending}
      type="submit"
      className="bg-[#88754f] sm:p-3 p-2 rounded-full shadow not-disabled:cursor-pointer absolute top-5 right-5 w-fit"
    >
      {isPending ? (
        <Loader
          className="animate-[spin_1.5s_linear_infinite]"
          strokeWidth={1}
        />
      ) : (
        <SendHorizontal className="sm:size-6 size-5" />
      )}
      <span className="absolute p-1 bg-white rounded-full shadow text-black shrink-0 sm:size-6 size-5 text-sm -top-2 -right-1 flex items-center justify-center">
        {fields.length}
      </span>
    </button>
  );
}

export default ButtonCreateMessage;
