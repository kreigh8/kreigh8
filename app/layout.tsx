import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import ConvexClientProvider from '@/components/ConvexClientProvider'
import { ImageDeleteProvider } from '@/components/context/ImageDeleteContext'
import { ImageDeleteAlert } from '@/components/admin/ImageDeleteAlert'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
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
          className={`${inter.variable} ${dmSans.variable} antialiased flex flex-col min-h-dvh`}
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
                  <main>{children}</main>
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
