"use client";
import { FieldValues } from "react-hook-form";
import { InterfaceAuthFormField } from "./InterfaceAuthFormField";
import AlertMessage from "../AlertMessage/AlertMessage";
// ======================================================================
function AuthFormFiled<T extends FieldValues>({
  placeholder,
  id,
  label,
  type,
  isPasswordFiled,
  setShowPassword,
  showPassword,
  register,
  error,
  disabled,
}: InterfaceAuthFormField<T>) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="font-semibold text-sm w-fit">
        {label}
      </label>
      <div className="w-full flex flex-col gap-1.5">
        <input
          {...register(id)}
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={`border disabled:border-gray-500 disabled:bg-gray-500 w-full text-sm py-1 px-2 outline-none focus:placeholder:text-gray-200 focus:bg-slate-500 mytransition rounded-lg bg-slate-700 not-disabled:cursor-pointer border-slate-600
            ${error ? "focus:border-red-300 bg-red-50" : "focus:border-slate-200 "}
            `}
        />
        <AlertMessage message={error} type="error" />
        {isPasswordFiled == true && setShowPassword && (
          <div className="flex items-center gap-2">
            <input
              disabled={disabled}
              onChange={() => setShowPassword(!showPassword)}
              checked={showPassword == true}
              type="checkbox"
              id="showPassword"
              className="appearance-none disabled:border-gray-500 border checked:border-[#c5ab77] size-3.5 rounded checked:bg-[#c5ab77] relative 
                      checked:after:content-['✔']
                      checked:after:absolute
                      checked:after:top-1/2
                      checked:after:text-[14px]
                      checked:after:-translate-y-1/2
                      "
            />
            <label className="font-semibold text-[13px]" htmlFor="showPassword">
              إظهار كلمة المرور
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthFormFiled;
