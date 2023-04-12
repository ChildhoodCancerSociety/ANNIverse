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
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        { /* eslint-disable-next-line */ }
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
        { /* eslint-disable-next-line */ }
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

 {/* Option 3 - "With Typescript layout from Next.JS documentation?*/}

{/* why are certain lines breaking? */}