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
          className="ring ring-white/15 text-white mytransition hover:bg-[#181b22] transition py-3 cursor-pointer px-4 rounded-xl bg-[#20232c] shadow outline-none focus:bg-[#181b22] focus-within:ring-white/7"
        />
      ) : (
        <textarea
          {...register(id)}
          id={id}
          placeholder={placeholder}
          className="ring ring-white/15 text-white mytransition hover:bg-[#181b22] transition py-3 cursor-pointer px-4 rounded-xl bg-[#20232c]  shadow outline-none focus:bg-[#181b22] focus-within:ring-white/7 resize-none"
        />
      )}
      {error && <AlertMessage message={error} type="error" />}
    </div>
  );
}

export default ProfileFormField;
