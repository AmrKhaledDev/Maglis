"use client";

import { SessionWithRelations } from "@/types/SessionWithRelations.type";
import { redirect } from "next/navigation";
import React, { createContext, useContext } from "react";
// ================================================
const UserContext = createContext<null | SessionWithRelations>(null);
export function UserProvider({
  user,
  children,
}: {
  user: SessionWithRelations | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) return redirect("/login");
  return context;
}
