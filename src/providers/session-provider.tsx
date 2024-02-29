"use client";

import type { FC, PropsWithChildren } from "react";
import { SessionProvider as SessionProviderPrimitive } from "next-auth/react";

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProviderPrimitive>{children}</SessionProviderPrimitive>;
};
