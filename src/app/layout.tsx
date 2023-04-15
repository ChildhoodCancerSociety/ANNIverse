import Head from "./head"
import Header from "./header"
import Navbar from "./navbar"
import Footer from "./footer"

export const metadata = {
  title: 'ANNIverse volunteer management platform',
  description: 'Home for the ANNIverse volunteer/project management application',
}

// Option 1 - Single Shared Layout from Next.JS layout page
export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

// Option 2 - Adapted from .dev layout.tsx
// (How do header, nav, and footer actually get added in this option?)
export default function RootLayout({ 
  children,
 }: {
  children: React.ReactNode
 }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}