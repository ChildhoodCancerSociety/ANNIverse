import { PropsWithChildren } from "react";

import { AuthProvider } from "@/auth";
import { TrpcProvider } from "@/trpc";

import "./globals.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TrpcProvider>{children}</TrpcProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
