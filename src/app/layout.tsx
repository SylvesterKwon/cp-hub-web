import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// https://mui.com/material-ui/integrations/nextjs/#installing-the-dependencies
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Roboto } from "next/font/google";
import { Box, Stack } from "@mui/material";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import GlobalStoreWrapper from "./components/GlobalStoreWrapper";
import GlobalProviders from "./components/GlobalProviders";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CP Hub",
  description: "Hub for competitive programming player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <NextThemeProvider>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <GlobalStoreWrapper />
              <GlobalProviders>
                <Stack>
                  <AppBar />
                  <Box
                    sx={{
                      padding: 2,
                    }}
                  >
                    {children}
                  </Box>
                  <Footer />
                </Stack>
              </GlobalProviders>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
