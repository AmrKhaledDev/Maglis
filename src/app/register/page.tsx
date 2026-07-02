"use client";

import Image from "next/image";
import RegisterForm from "./_components/RegisterForm/RegisterForm";
// =====================================================================================
function Register() {
  return (
    <main>
      <div className="mycontainer p-3">
        <div className="relative h-25 w-30">
          <Image src={"/logo.png"} alt="logo" priority fill />
        </div>
        <div className="h-[75vh] flex items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}

export default Register;
