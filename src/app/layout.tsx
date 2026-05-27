import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/sonner";
import { AppProviders } from "./providers";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SureCova | Healthcare Operations',
  description: 'Enterprise healthcare operations command center.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-foreground bg-background" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
