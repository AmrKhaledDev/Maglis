import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import EditProfileLable from "./EditProfileLable";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
// ===================================================
function ProfileFormField<T extends FieldValues>({
  id,
  placeholder,
  typeField,
  label,
  register,
  error,
}: {
  id: Path<T>;
  placeholder: string;
  typeField: "INPUT" | "TEXTAREA";
  label: string;
  register: UseFormRegister<T>;
  error?: string;
}) {
  if (!typeField) return null;
  return (
    <div className="flex flex-col gap-2">
      <EditProfileLable id={id} label={label} />
      {typeField === "INPUT" ? (
        <input
          {...register(id)}
          id={id}
          placeholder={placeholder}
          type="text"
          className="border border-slate-400 text-white mytransition font-semibold text-sm hover:bg-slate-400 focus:bg-slate-400 focus:placeholder:text-slate-700 transition py-2 cursor-pointer px-2 rounded-xl bg-slate-500 placeholder:text-gray-300 shadow"
        />
      ) : (
        <textarea
          {...register(id)}
          id={id}
          placeholder={placeholder}
          className="border text-white resize-none h-20 mytransition border-slate-400 font-semibold text-sm hover:bg-slate-400 focus:bg-slate-400 focus:placeholder:text-slate-700 transition py-2 cursor-pointer px-2 rounded-xl bg-slate-500 placeholder:text-gray-300 shadow"
        />
      )}
      {error && <AlertMessage message={error} type="error" />}
    </div>
  );
}

export default ProfileFormField;
