"use client";
import AuthToggle from "@/components/AuthToggle/AuthToggle";
import OAuthWithGoogleBtn from "@/components/OAuthWithGoogleButton/OAuthWithGoogleButton";
import AuthDivider from "@/components/AuthDivider/AuthDivider";
import AuthFormFiled from "@/components/AuthFormFiled/AuthFormFiled";
import { Path, useForm } from "react-hook-form";
import { RegisterFields } from "@/data/Register/RegisterFields";
import { RegisterSchema } from "@/ZodSchemas/Auth/Register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { RegisterAction } from "@/actions/Auth/Register.action";
import z from "zod";
import { useRouter } from "next/navigation";
import AuthBlur from "@/components/AuthBlur/AuthBlur";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import RegisterSubmitButton from "./RegisterSubmitButton";
import Image from "next/image";
import { motion } from "framer-motion";
// ====================================================================
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
    setTimeout(() => {
      setServerSuccess("");
    }, 3000);
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    router.refresh();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#a28b5d] rounded shadow-2xl ring ring-[#a28b5d]/50 relative w-fit"
    >
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-5 bg-slate-800 rounded-3xl space-y-3 sm:w-110 w-90 h-fit"
      >
        <div className="relative h-17 w-20 mx-auto mb-6">
          <Image src={"/logo.png"} alt="logo" priority fill />
        </div>
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
            key={field.id}
            register={register}
            placeholder={field.placeholder}
            id={field.id as Path<z.infer<typeof RegisterSchema>>}
            label={field.label}
            disabled={loading}
            error={field.error}
            type="text"
          />
        ))}
        <RegisterSubmitButton loading={loading} />
        <span className="w-full h-px bg-gray-50/7 block rounded-full" />
        <AuthToggle
          href="/login"
          text="لديك حساب بالفعل؟"
          linkText="تسجيل الدخول"
        />
      </form>
      {showBlur && <AuthBlur />}
    </motion.div>
  );
}

export default Form;
