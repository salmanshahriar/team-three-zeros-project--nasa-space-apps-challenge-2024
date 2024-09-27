"use client";

import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Head from "next/head";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const accessToken = localStorage.getItem("accessToken");
      const apiToken = localStorage.getItem("apiToken");

      if (accessToken && apiToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/");
    } else if (isAuthenticated === false) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <Spinner color="primary" className="main-bg flex justify-center items-center" />;
  }

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Agricooo" />
        <link rel="apple-touch-startup-image" href="/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} main-bg`}>
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
