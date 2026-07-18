import { CircleAlert } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
// ================================================
function AlertMessage({
  message,
  type,
  isServerError,
}: {
  message?: string;
  type: "error" | "success";
  isServerError?: boolean;
}) {
  return (
    <>
      {message !== undefined && (
        <p
          className={`text-xs font-semibold p-2 ${
            type === "success" ? "text-green-200 bg-green-900" : "text-red-200 bg-red-900"
          } flex items-center gap-1 
        ${isServerError && "bg-red-100 py-1 px-2"}`}
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
