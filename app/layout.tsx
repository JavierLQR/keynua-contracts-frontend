import type { Metadata } from 'next'
import { Poppins, Roboto_Mono } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from '@/components/ui/sonner'
import 'react-international-phone/style.css'

import './globals.css'
import { ProviderQueryClient } from '../providers/QueryClient'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Keynua Contract App',
  description: 'Keynua Contract App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${robotoMono.className} antialiased`}
      >
        <NextTopLoader
          color="#4a40ff"
          initialPosition={0.08}
          crawlSpeed={400}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          zIndex={9999999999999}
          showAtBottom={false}
        />
        <ProviderQueryClient>
          {children}
          <Toaster />
        </ProviderQueryClient>
      </body>
    </html>
  )
}
