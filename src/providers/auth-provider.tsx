"use client";

import { SessionProvider } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
