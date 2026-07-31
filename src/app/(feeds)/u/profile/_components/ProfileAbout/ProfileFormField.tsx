import EditProfileLable from "./EditProfileLable";

function ProfileFormField({
  id,
  placeholder,
  typeField,
  label,
}: {
  id: string;
  placeholder: string;
  typeField: "INPUT" | "TEXTAREA";
  label: string;
}) {
  if (!typeField) return null;
  return (
    <div className="flex flex-col gap-2">
      <EditProfileLable id={id} label={label} />
      {typeField === "INPUT" ? (
        <input
          id={id}
          placeholder={placeholder}
          type="text"
          className="border border-slate-400 focus:text-black font-semibold text-sm hover:bg-slate-400 focus:bg-slate-400 focus:placeholder:text-slate-700 transition py-2 cursor-pointer px-2 rounded-xl bg-slate-500 placeholder:text-gray-300 shadow"
        />
      ) : (
        <textarea
          id={id}
          placeholder={placeholder}
          className="border resize-none h-20  border-slate-400 focus:text-black font-semibold text-sm hover:bg-slate-400 focus:bg-slate-400 focus:placeholder:text-slate-700 transition py-2 cursor-pointer px-2 rounded-xl bg-slate-500 placeholder:text-gray-300 shadow"
        />
      )}
    </div>
  );
}

export default ProfileFormField;
