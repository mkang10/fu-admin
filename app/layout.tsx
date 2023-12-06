"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { usePathname } from "next/navigation";
import ToastNotificationComp from "@/components/ToastNotificationComp";
import AuthProvider from "@/app/AuthProvider";
import Sidebar from "@/components/SideBar";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const specificPath = ["/auth/sign-in"];

  const pathName = usePathname();
  const isSpecified = specificPath.includes(pathName);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider store={store}>
          <AuthProvider>
            {!isSpecified && <Header></Header>}
            {!isSpecified && <Sidebar></Sidebar>}
            {children} <ToastNotificationComp></ToastNotificationComp>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
