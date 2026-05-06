import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import { ImageDeleteProvider } from '@/components/context/ImageDeleteContext'
import { ImageDeleteAlert } from '@/components/admin/ImageDeleteAlert'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'kreigh8',
  description: 'Portfolio site for Kreigh Hirschy',
  icons: {
    icon: '/kreigh8-favicon.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
        >
          <ConvexClientProvider>
            <ImageDeleteProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <TooltipProvider>
                  <main className="container mx-auto py-4">{children}</main>
                  <Analytics />
                  <ImageDeleteAlert />
                  <Toaster />
                </TooltipProvider>
              </ThemeProvider>
            </ImageDeleteProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
