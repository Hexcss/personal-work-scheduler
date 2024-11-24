'use client';

import { SessionProvider } from 'next-auth/react';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Work Scheduler</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Organize your work schedule with ease" />
        <meta name="author" content="Your Name" />
        <meta name="theme-color" content="#1E3A8A" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="antialiased bg-white min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <main className="flex-grow flex flex-col items-center justify-center">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
