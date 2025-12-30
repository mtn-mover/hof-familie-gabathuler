import { motion } from 'framer-motion'
import Link from 'next/link'
import Layout from '@/components/Layout'
import FeatureCard from '@/components/FeatureCard'

// Icons as components
const HofladenIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const MutterkuhIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const QualitaetIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
)

const features = [
  {
    icon: <HofladenIcon />,
    title: 'Hofladen',
    description: 'Besuchen Sie unseren Hofladen in Fläsch und entdecken Sie frische Produkte direkt vom Hof. Fleisch, Wurst und vieles mehr.',
    href: '/hofladen',
    linkText: 'Zum Hofladen',
  },
  {
    icon: <MutterkuhIcon />,
    title: 'Mutterkuhhaltung',
    description: 'Unsere Tiere leben in artgerechter Mutterkuhhaltung. Die Kälber wachsen bei ihren Müttern auf - natürlich und stressfrei.',
    href: '/ueber-uns',
    linkText: 'Mehr erfahren',
  },
  {
    icon: <QualitaetIcon />,
    title: 'Frische Qualität',
    description: 'Bio Suisse zertifiziert. Höchste Qualität durch traditionelle Landwirtschaft und nachhaltige Produktion.',
    href: '/produkte',
    linkText: 'Unsere Produkte',
  },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient (Placeholder for image) */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-900/50" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Bio Suisse zertifiziert</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Willkommen auf dem
              <br />
              <span className="text-secondary-400">Hof Familie Gabathuler</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Frische Produkte aus der Mutterkuhhaltung
              <br className="hidden sm:block" />
              Direkt aus Fläsch, Graubünden
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/kontakt"
                className="btn-primary bg-secondary-500 hover:bg-secondary-600 text-lg px-10 py-4"
              >
                Jetzt bestellen
              </Link>
              <Link
                href="/ueber-uns"
                className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary-800 text-lg px-10 py-4"
              >
                Unsere Geschichte
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-xs tracking-widest uppercase">Entdecken</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="section-title">
              Direkt vom Hof zu Ihnen
            </h2>
            <p className="section-subtitle mx-auto">
              Entdecken Sie unsere hochwertigen Produkte aus nachhaltiger, artgerechter Landwirtschaft.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                linkText={feature.linkText}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 to-primary-300">
                {/* Placeholder for family image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-primary-500">
                    <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-sm">Familie Gabathuler-Risch</p>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-100 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent-100 rounded-xl -z-10" />
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
                Über uns
              </span>
              <h2 className="section-title mb-6">
                Familie Gabathuler-Risch
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed">
                <p>
                  Seit Generationen bewirtschaften wir unseren Hof in Fläsch mit Leidenschaft und Respekt für die Natur. Unsere Mutterkuhhaltung steht für artgerechte Tierhaltung und höchste Qualität.
                </p>
                <p>
                  Die Kälber wachsen bei ihren Müttern auf und grasen auf unseren saftigen Wiesen mit Blick auf die Bündner Bergwelt. Diese natürliche Aufzucht schmeckt man in jedem unserer Produkte.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/ueber-uns"
                  className="btn-secondary"
                >
                  Unsere Geschichte entdecken
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section bg-primary-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="section-title mb-4">
                  Besuchen Sie unseren Hofladen
                </h2>
                <p className="text-primary-600 leading-relaxed mb-6">
                  Entdecken Sie unser vielfältiges Angebot an frischem Fleisch, hausgemachten Würsten und regionalen Spezialitäten. Wir freuen uns auf Ihren Besuch!
                </p>

                {/* Opening Hours */}
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <h3 className="font-serif text-lg font-semibold text-primary-800 mb-3">
                    Öffnungszeiten
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-600">Montag - Freitag</span>
                      <span className="text-primary-800 font-medium">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Samstag</span>
                      <span className="text-primary-800 font-medium">08:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-600">Sonntag</span>
                      <span className="text-primary-500">Geschlossen</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/kontakt" className="btn-primary">
                    Kontakt aufnehmen
                  </Link>
                  <Link href="/hofladen" className="btn-secondary">
                    Mehr zum Hofladen
                  </Link>
                </div>
              </div>

              {/* Map/Location Placeholder */}
              <div className="relative">
                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary-100 to-secondary-200">
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <svg className="w-16 h-16 text-secondary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 className="font-serif text-xl font-semibold text-secondary-700 mb-2">
                      St. Luzi 15
                    </h4>
                    <p className="text-secondary-600">
                      7306 Fläsch<br />
                      Graubünden, Schweiz
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
