import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Hanken_Grotesk } from 'next/font/google'
import { SITE, SITE_URL } from '@/lib/site'
import './globals.css'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE.name,
      url: SITE_URL,
      image: `${SITE_URL}/dhanush-avatar.png`,
      email: `mailto:${SITE.email}`,
      jobTitle: 'Full-Stack Engineer',
      description: SITE.description,
      worksFor: { '@type': 'Organization', name: 'Trofeo Solutions', address: { '@type': 'PostalAddress', addressLocality: 'Coimbatore', addressCountry: 'IN' } },
      homeLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Sathy, Erode', addressRegion: 'Tamil Nadu', addressCountry: 'IN' } },
      sameAs: [SITE.linkedin, SITE.github],
      knowsAbout: ['NestJS', '.NET Core', 'React', 'React Native', 'Angular', 'TypeScript', 'MySQL', 'MQTT', 'Microservices', 'Multi-tenant SaaS', 'JWT authentication', 'AI-assisted engineering'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Dhanush S Portfolio',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      url: SITE_URL,
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
  ],
}

const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' })
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: '%s | Dhanush S' },
  description: SITE.description,
  applicationName: 'Dhanush S Portfolio',
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  keywords: [
    'Dhanush S', 'Dhanush S full stack developer', 'Full-Stack Engineer', 'NestJS developer', '.NET Core developer',
    'React Native developer', 'React developer', 'Angular developer', 'multi-tenant SaaS', 'MQTT microservices',
    'Full stack developer Coimbatore', 'Full stack developer Erode', 'Full stack developer Tamil Nadu', 'Portfolio',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Dhanush S',
    title: SITE.title,
    description: SITE.description,
    locale: 'en_IN',
    images: [{ url: '/dhanush-avatar.png', width: 1024, height: 1024, alt: 'Dhanush S, full-stack engineer' }],
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description, images: ['/dhanush-avatar.png'] },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#d9dce2',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
