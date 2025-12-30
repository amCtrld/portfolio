import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://mbugua.nijue.me"),
  
  title: {
    default: "Peter Mbugua — Systems Developer & Product Builder",
    template: "%s | Peter Mbugua",
  },
  
  description: "Systems developer and product builder crafting scalable solutions. Specializing in full-stack development, system architecture, and turning ideas into production-ready products.",
  
  keywords: [
    "systems developer",
    "product builder",
    "full-stack developer",
    "software engineer",
    "system architecture",
    "web development",
    "product development",
    "Peter Mbugua",
  ],
  
  authors: [{ name: "Peter Mbugua" }],
  creator: "Peter Mbugua",
  publisher: "Peter Mbugua",
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mbugua.nijue.me",
    siteName: "Peter Mbugua Portfolio",
    title: "Peter Mbugua — Systems Developer & Product Builder",
    description: "A visionary JavaScript developer and product builder turning ideas into production-ready products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Peter Mbugua — Systems Developer & Product Builder",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Peter Mbugua — Systems Developer & Product Builder",
    description: "Systems developer and product builder crafting scalable solutions.",
    creator: "@mbugua_",
    images: ["/og-image.png"],
  },
  
  verification: {
    google: "google-verification-code",
  },
  
  alternates: {
    canonical: "https://mbugua.nijue.me",
  },
  
  generator: "Next.js",
  
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  
  manifest: "/site.webmanifest",
  
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}