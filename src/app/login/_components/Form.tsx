"use client";
import AuthFormFiled from "@/components/AuthFormFiled/AuthFormFiled";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/ZodSchemas/Auth/Login.schema";
import { LoginFields } from "@/data/Login/LoginFields";
import { LoginAction } from "@/actions/Auth/Login.action";
import { useRouter } from "next/navigation";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import AuthBlur from "@/components/AuthBlur/AuthBlur";
import z from "zod";
import FormHeader from "./FormHeader";
import LoginSubmitButton from "./LoginSubmitButton";
import FormFooter from "./FormFooter";
// =========================================================================
function Form({ error }: { error?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  let errorMessage;
  switch (error) {
    case "OAuthAccountNotLinked":
      errorMessage = "برجاء تسجيل الدخول بالإيميل وكلمة المرور";
      break;
    default:
      errorMessage =
        "حدث خطأ أثناء تسجيل الدخول برجاء التأكد من الإنترنت وإعادة المحاولة.";
  }
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [serverError, setServerError] = useState(
    error
      ? error === "OAuthAccountNotLinked"
        ? "برجاء تسجيل الدخول بالإيميل وكلمة المرور"
        : "حدث خطأ أثناء تسجيل الدخول برجاء التأكد من الإنترنت وإعادة المحاولة."
      : "",
  );
  const [serverSuccess, setServerSuccess] = useState("");
  const router = useRouter();
  const fields = LoginFields(loading, showPassword, setShowPassword, errors);
  const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    setServerError("");
    setLoading(true);
    setShowBlur(true);
    const result = await LoginAction(data);
    setLoading(false);
    setShowBlur(false);
    if (!result.success)
      return setServerError(
        result.message ?? "حدث خطأ أثناء تسجيل دخولك حاول مرة أخرى",
      );
    setServerSuccess(result.message ?? "");
    router.refresh();
  };
  return (
    <div className="bg-[#a28b5d] rounded shadow-2xl ring ring-[#a28b5d]/50 overflow-hidden relative">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-5 bg-slate-800 rounded-3xl space-y-5 w-110 h-fit"
      >
        <FormHeader loading={loading} setShowBlur={setShowBlur} />
        <div className="flex flex-col gap-3">
          {serverError && (
            <AlertMessage
              isServerError={true}
              type="error"
              message={serverError}
            />
          )}
          {serverSuccess && (
            <AlertMessage message={serverSuccess} type="success" />
          )}
          {fields.map((field) => (
            <AuthFormFiled<z.infer<typeof LoginSchema>>
              key={field.id}
              register={register}
              id={field.id as Path<z.infer<typeof LoginSchema>>}
              placeholder={field.placeholder}
              setShowPassword={field.setShowPassword}
              showPassword={field.showPassword}
              isPasswordFiled={field.isPasswordFiled}
              label={field.label}
              disabled={field.disabled}
              error={field.error}
              type={field.type as "email" | "password" | "text"}
            />
          ))}
        </div>
        <LoginSubmitButton loading={loading} />
        <FormFooter />
      </form>
      {showBlur && <AuthBlur />}
    </div>
  );
}

export default Form;
