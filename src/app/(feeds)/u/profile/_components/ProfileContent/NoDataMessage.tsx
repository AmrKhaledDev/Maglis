import { AlertCircle } from "lucide-react";

function NoDataMessage({ message }: { message: string }) {
  return (
    <p className="text-2xl text-gray-400 flex items-center gap-2 justify-center">
      <AlertCircle /> {message}
    </p>
  );
}

export default NoDataMessage;
