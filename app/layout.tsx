'use client'
import { PublicClientApplication } from '@azure/msal-browser'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { msalConfig } from './api/MSAuthentication/authConfig'
import { MsalProvider } from '@azure/msal-react'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const msalInstancea = new PublicClientApplication(msalConfig);
  return (
    <html lang="en">
      <MsalProvider instance={msalInstancea} >
        <body className={inter.className}>{children}</body>
      </MsalProvider>
    </html>
  )
}
