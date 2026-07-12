"use client";

import { SessionWIthoutPasswordType } from "@/types/SessionWIthoutPasswordType";
import React, { createContext, useContext } from "react";
// ================================================


const UserContext = createContext<null | SessionWIthoutPasswordType>(null);

export function UserProvider({
  user,
  children,
}: {
  user: SessionWIthoutPasswordType;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
