"use client";

import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import React, { createContext, useContext } from "react";
// ================================================

const UserContext = createContext<null | SessionWithoutPasswordType>(null);

export function UserProvider({
  user,
  children,
}: {
  user: SessionWithoutPasswordType;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
