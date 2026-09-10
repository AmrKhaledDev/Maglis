import { ComponentType } from "react";
// ===============================================
function Label({
  icon: Icon,
  text,
  htmlFor,
}: {
  icon: ComponentType;
  text: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-xs font-medium text-nowrap cursor-pointer hover:bg-white/10 p-1.5 rounded-lg shadow"
    >
      <Icon />
      {text}
    </label>
  );
}

export default Label;
