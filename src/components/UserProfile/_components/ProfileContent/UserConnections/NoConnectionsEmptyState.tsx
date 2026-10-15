import { LuSearchX } from "react-icons/lu";
// ================================================
function NoConnectionsEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2 mb-4">
      <LuSearchX className="text-4xl text-gray-400" strokeWidth={1} />
      <h2 className="font-medium text-xl">{title}</h2>
      <p className="text-sm opacity-75">{description}</p>
    </div>
  );
}

export default NoConnectionsEmptyState;
