import clsx from "clsx";
import { useFormContext, useWatch } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import SelectPrivacy from "./SelectPrivacy";
import { useUser } from "@/providers/UserProvider";
import { Form } from "./_types/Form.type";
import { RefObject } from "react";
// =====================================================================================
function Center({
  disabled,
  textareaRef,
}: {
  disabled: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const { control, register } = useFormContext<Form>();
  const content = useWatch({
    control,
    name: "content",
    defaultValue: "",
  });
  const userSession = useUser();
  const { ref, ...currentRegister } = register("content");
  return (
    <div className="space-y-4">
      <TextareaAutosize
        disabled={disabled}
        {...currentRegister}
        ref={(element) => {
          ref(element);
          textareaRef.current = element;
        }}
        minRows={7}
        maxRows={15}
        placeholder={`بماذا تفكر اليوم يا ${userSession.name} ؟`}
        className="w-full p-3 leading-6 rounded-xl resize-none outline-none border border-gray-50/3 focus:border-gray-50/6 transition"
      />
      <div className="flex items-center justify-between text-gray-300">
        <p className="text-sm flex items-center gap-1">
          5000 /
          <span
            className={clsx(
              content.length > 5000 ? "text-red-400" : "text-green-400",
            )}
          >
            {content.length}
          </span>
        </p>
        <SelectPrivacy disabled={disabled} />
      </div>
    </div>
  );
}

export default Center;
