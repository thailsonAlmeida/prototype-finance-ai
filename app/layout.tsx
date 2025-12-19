import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "./_components/ui/sonner";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Prototype Finance AI",
  description:
    "Aplicativo de gestão financeira integrada com Inteligência Artificial (IA)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          {/* Use min-h-screen e remova overflow-hidden para permitir scroll do documento */}
          <div className="flex min-h-screen flex-col">{children}</div>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
