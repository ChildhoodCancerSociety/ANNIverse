import { ClientProvider } from "@/trpc/client/trpcClient";
import { rsc } from "@/trpc/rsc";

import { PropsWithChildren, use } from "react";

import "./globals.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const user = use(rsc.whoami.fetch());
  return (
    <ClientProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClientProvider>
  );
};

export default RootLayout;
