import { Nunito } from "next/font/google";

import './globals.css'
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToaterProvider";
import LoginModal from "./components/Modals/LoginModal";

import getCurrentUser from './actions/getCurrentUser';
import RentModal from "./components/Modals/RentModal";

export const metadata = {
  title: 'Jets Premier',
  description: 'Jets Premier Reservations',
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>

        <div className="pb-20 pt-28">
          {children}
        </div>

      </body>
    </html>
  )
}
