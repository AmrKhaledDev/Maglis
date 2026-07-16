import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreatePost_ModalFormType } from "./CreatePost_ModalForm.type";
// ==============================================================================
export type CreatePost_Modal_CenterPropsType = {
  register: UseFormRegister<CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  disabled: boolean;
};
