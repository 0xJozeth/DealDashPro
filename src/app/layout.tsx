import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

//setting to `false` prevents Font Awesome core SVG library from inserting <style> elements into the <head> of the page.
config.autoAddCss = false;

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "DealDashPro",
  description: "Get your next deal done with DealDashPro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();
  const auth = isAuthenticated();

  return (
    <html lang="en" className="light !scroll-smooth">
      <Providers>
        <body
          className={cn(
            "grainy min-h-screen font-sans antialiased",
            lato.className,
          )}
        >
          <Toaster />
          <Header user={user} isAuthenticated={auth} />
          <main className="m-0 p-0">{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
