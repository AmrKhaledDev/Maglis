import { Dispatch, SetStateAction } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
// ====================================================================
export interface InterfaceAuthFormField<T extends FieldValues> {
  placeholder: string;
  id: Path<T>;
  label: string;
  type: "email" | "password" | "text";
  isPasswordFiled?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  showPassword?: boolean;
  register: UseFormRegister<T>;
  disabled: boolean;
  error?: string;
}
