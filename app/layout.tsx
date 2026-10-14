import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Eyosiyas | Full-Stack Developer',
  description: 'Software Engineering student at ASTU specializing in full-stack web development and backend architecture.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey={undefined}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}