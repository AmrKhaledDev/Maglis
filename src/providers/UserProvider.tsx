"use client";

import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import { redirect } from "next/navigation";
import React, { createContext, useContext } from "react";
// ================================================
const UserContext = createContext<null | SessionWithoutPasswordType>(null);
export function UserProvider({
  user,
  children,
}: {
  user: SessionWithoutPasswordType | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) return redirect("/login");
  return context;
}