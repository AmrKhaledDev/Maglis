import { UseMutateFunction } from "@tanstack/react-query";
import Header from "./Header";
import { Form as FormType } from "./_types/Form.type";
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import Author from "./Author";
import Center from "./Center";
import Media from "./Media";
import MediaLength from "./MediaLength";
import Footer from "./Footer";
import WarningMessage from "@/components/WarningMessage/WarningMessage";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { useRef } from "react";
import { Field } from "./_types/Field.type";
// ======================================================================
function Form({
  mutate,
  loading,
  error,
  fields,
  append,
  remove,
}: {
  mutate: UseMutateFunction<void, Error, FormType, unknown>;
  loading: boolean;
  error: Error | null;
  fields: (Field &
    Record<"id", string> & {
      disabled?: boolean;
    })[];
  append: UseFieldArrayAppend<FormType, "media">;
  remove: UseFieldArrayRemove;
}) {
  const { handleSubmit } = useFormContext<FormType>();
  const handleCreatePost = (data: FormType) => {
    mutate(data);
  };
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      className="modalBgColor ring ring-gray-50/5 text-white shadow-2xl p-3 rounded-xl w-200 max-h-170 overflow-y-auto space-y-4"
    >
      <Header loading={loading} />
      {error && <AlertMessage type="error" message={error.message} />}
      <Author />
      <Center disabled={loading} textareaRef={textareaRef} />
      <Media disabled={loading} fields={fields} remove={remove} />
      <MediaLength fields={fields} />
      <Footer
        fields={fields}
        append={append}
        loading={loading}
        textareaRef={textareaRef}
      />
      <WarningMessage />
    </form>
  );
}

export default Form;
