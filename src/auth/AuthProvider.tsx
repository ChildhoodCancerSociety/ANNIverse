"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
