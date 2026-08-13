import clsx from "clsx";
import { CircleAlert } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
// ================================================
function AlertMessage({
  message,
  type,
  isServerError,
}: {
  message?: string;
  type: "error" | "success" | "warn";
  isServerError?: boolean;
}) {
  return (
    <>
      {message !== undefined && (
        <p
          className={clsx("text-xs font-semibold p-2 flex items-center gap-2", {
            "text-green-200 bg-green-900": type === "success",
            "text-red-200 bg-red-900": type === "error",
            "text-amber-200 bg-amber-900/40": type === "warn",
            "bg-red-100 py-1 px-2": isServerError,
          })}
        >
          {type === "error" && <CircleAlert className="size-4" />}
          {type === "success" && <FaRegCircleCheck />}
          {message}
        </p>
      )}
    </>
  );
}

export default AlertMessage;
