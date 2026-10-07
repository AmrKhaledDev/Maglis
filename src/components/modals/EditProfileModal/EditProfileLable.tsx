function EditProfileLable({id,label}:{id?:string,label:string}) {
  return (
    <label
      htmlFor={id}
      className="text-[17px] flex items-center gap-1"
    >
      {label}
      <span className="text-red-500">*</span>
    </label>
  );
}

export default EditProfileLable;
