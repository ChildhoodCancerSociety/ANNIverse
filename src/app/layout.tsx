import SideBar from "@/components/SideBar";
import "./globals.css";

export const metadata = {
  title: "ANNIverse",
  description: "Let's get it",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <SideBar />
        {children}
      </body>
    </html>
  );
}
