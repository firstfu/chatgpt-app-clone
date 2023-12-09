import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/markdown.css";
import AppContextProvider from "@/components/AppContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
