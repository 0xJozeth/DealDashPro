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
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

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
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <Toaster />
          <Header user={user} isAuthenticated={auth} />
          <main>{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
