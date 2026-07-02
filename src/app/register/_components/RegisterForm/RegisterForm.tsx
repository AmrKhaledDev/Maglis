"use client";
import AuthToggle from "@/components/AuthToggle/AuthToggle";
import OAuthWithGoogleBtn from "@/components/OAuthWithGoogleBtn/OAuthWithGoogleBtn";
import AuthDivider from "@/components/AuthDivider/AuthDivider";
import AuthFormFiled from "@/components/AuthFormFiled/AuthFormFiled";
import { Path, useForm } from "react-hook-form";
import { RegisterFields } from "@/data/Register/RegisterFields";
import { RegisterSchema } from "@/schemas/Auth/Register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { RegisterAction } from "@/actions/Auth/Register.action";
import z from "zod";
import { useRouter } from "next/navigation";
import AuthBlur from "@/components/AuthBlur/AuthBlur";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import RegisterFormBtnSub from "./_components/RegisterFormBtnSub";
// ====================================================================
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const [loading, setLoading] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const router = useRouter();
  const fields = RegisterFields(loading, errors);
  const handleRegister = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setServerError("");
    setShowBlur(true);
    setServerSuccess("");
    const result = await RegisterAction(data);
    setLoading(false);
    setShowBlur(false);
    if (!result.success)
      return setServerError(result.message || "حدث خطأ أثناء انشاء حسابك");
    setServerSuccess(result.message);
    reset();
    router.refresh();
  };
  return (
    <div className="bg-[#a28b5d] rounded shadow-2xl ring ring-[#a28b5d]/50 overflow-hidden relative">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-5 bg-slate-800 rounded-3xl space-y-3 w-110 h-fit"
      >
        <OAuthWithGoogleBtn
          disabled={loading}
          setShowBlur={setShowBlur}
          text="أنشئ حسابك بواسطة Google"
        />
        <AuthDivider />
        {serverError && (
          <AlertMessage
            isServerError={true}
            message={serverError}
            type="error"
          />
        )}
        {serverSuccess && (
          <AlertMessage message={serverSuccess} type="success" />
        )}

        {fields.map((field) => (
          <AuthFormFiled
            register={register}
            placeholder={field.placeholder}
            id={field.id as Path<z.infer<typeof RegisterSchema>>}
            label={field.label}
            disabled={loading}
            error={field.error}
            type="text"
          />
        ))}
        <RegisterFormBtnSub loading={loading} />
        <span className="w-full h-px bg-gray-50/7 block rounded-full" />
        <AuthToggle
          href="/login"
          text="لديك حساب بالفعل؟"
          linkText="تسجيل الدخول"
        />
      </form>
      {showBlur && <AuthBlur />}
    </div>
  );
}

export default RegisterForm;
