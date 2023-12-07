import type { Metadata } from "next";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-orange-500 px-10">{children}</body>
    </html>
  );
}
