import { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({
  children,
  title = 'Hof Familie Gabathuler',
  description = 'Frische Produkte aus artgerechter Mutterkuhhaltung - Direkt aus Fläsch, Graubünden. Bio Suisse zertifiziert.',
}: LayoutProps) {
  const fullTitle = title === 'Hof Familie Gabathuler'
    ? title
    : `${title} | Hof Familie Gabathuler`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:site_name" content="Hof Familie Gabathuler" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Familie Gabathuler-Risch" />
        <meta name="geo.region" content="CH-GR" />
        <meta name="geo.placename" content="Fläsch" />

        {/* Canonical */}
        <link rel="canonical" href="https://hof-familie-gabathuler.vercel.app" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
