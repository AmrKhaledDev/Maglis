"use client";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import AuthBlur from "@/components/AuthBlur/AuthBlur";
import AuthDivider from "@/components/AuthDivider/AuthDivider";
import AuthFormFiled from "@/components/AuthFormFiled/AuthFormFiled";
import AuthToggle from "@/components/AuthToggle/AuthToggle";
import OAuth from "@/components/OAuth/OAuth";
import { RegisterFields } from "@/data/Register/RegisterFields";
import { RegisterSchema } from "@/zodSchemas/Auth/Register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import z from "zod";
import RegisterSubmitButton from "./RegisterSubmitButton";
import { handleRegister } from "./handleRegister";
// ====================================================================
function Form() {
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
  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    handleRegister(
      data,
      setLoading,
      setServerError,
      setShowBlur,
      setServerSuccess,
      router,
      reset,
    );
  };
  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="p-3 bg-slate-800 rounded-3xl space-y-2 sm:w-110 w-90 h-fit shadow-lg"
    >
      <div className="relative size-13 mx-auto mb-4">
        <Image
          src={"/logo.png"}
          alt="logo"
          priority
          fill
          className="object-contain"
        />
      </div>
      <OAuth disabled={loading} setShowBlur={setShowBlur} />
      <AuthDivider />
      {serverError && (
        <AlertMessage isServerError={true} message={serverError} type="error" />
      )}
      {serverSuccess && <AlertMessage message={serverSuccess} type="success" />}
      <div className="flex flex-col gap-2">
        {fields.map((field) => (
          <AuthFormFiled
            key={field.id}
            register={register}
            placeholder={field.placeholder}
            id={field.id as Path<z.infer<typeof RegisterSchema>>}
            label={field.label}
            disabled={loading}
            error={field.error}
            type={field.type}
          />
        ))}
      </div>
      <RegisterSubmitButton loading={loading} />
      <AuthToggle
        href="/login"
        text="لديك حساب بالفعل؟"
        linkText="تسجيل الدخول"
      />
      {showBlur && <AuthBlur />}
    </motion.form>
  );
}

export default Form;
