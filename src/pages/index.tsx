import { motion } from 'framer-motion'
import Image from 'next/image'
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
    href: '/about',
    linkText: 'Mehr erfahren',
  },
  {
    icon: <QualitaetIcon />,
    title: 'Frische Qualität',
    description: 'Bio Suisse zertifiziert. Höchste Qualität durch traditionelle Landwirtschaft und nachhaltige Produktion.',
    href: '/products',
    linkText: 'Unsere Produkte',
  },
]

// Gallery images - die schönsten Bilder vom Hof
const galleryImages = [
  { src: '/images/farm/Kuehe auf Alp.jpg', alt: 'Kühe auf der Alp mit Bergpanorama' },
  { src: '/images/farm/Kuh mit Kalb.jpg', alt: 'Kuh mit ihrem Kalb auf der Weide' },
  { src: '/images/family/Familie Gabathuler.JPG', alt: 'Familie Gabathuler-Risch' },
  { src: '/images/hofladen/Hofladen von innen.jpg', alt: 'Unser Hofladen von innen' },
  { src: '/images/farm/Feld mit Berge im Hintergrund.jpg', alt: 'Feld mit Bündner Bergen im Hintergrund' },
  { src: '/images/farm/Viele Kuehe.jpg', alt: 'Unsere Kuhherde auf der Weide' },
  { src: '/images/Feld mit Sonnenuntergang.jpg', alt: 'Sonnenuntergang über den Feldern' },
  { src: '/images/farm/Ernte.jpg', alt: 'Ernte auf dem Feld' },
  { src: '/images/hofladen/Hofladen Angebot1.jpg', alt: 'Frische Produkte im Hofladen' },
]

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero/Hero.jpg"
          alt="Hof Familie Gabathuler - Blick über die Felder in Fläsch"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />

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
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Frische Produkte aus der Mutterkuhhaltung
              <br className="hidden sm:block" />
              Direkt aus Fläsch, Graubünden
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator - positioned relative to section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="/images/family/Familie Gabathuler2.jpg"
                  alt="Familie Gabathuler-Risch auf ihrem Hof in Fläsch"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
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
                  href="/about"
                  className="btn-secondary"
                >
                  Unsere Geschichte entdecken
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Einblicke vom Hof</h2>
            <p className="section-subtitle mx-auto">
              Impressionen aus unserem Alltag auf dem Bauernhof
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-80 rounded-xl overflow-hidden group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/hofladen/Hero.jpg"
                alt="Unser Hofladen in Fläsch"
                fill
                className="object-cover"
                sizes="100vw"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-900/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Text Content */}
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                    Besuchen Sie unseren Hofladen
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Entdecken Sie unser vielfältiges Angebot an frischem Fleisch, hausgemachten Würsten und regionalen Spezialitäten. Wir freuen uns auf Ihren Besuch!
                  </p>

                  {/* Opening Hours */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <h3 className="font-serif text-lg font-semibold text-white mb-3">
                      Öffnungszeiten
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/80">
                        <span>Täglich</span>
                        <span className="text-white font-medium">24/7 geöffnet</span>
                      </div>
                      <div className="text-white/80 mt-3 pt-3 border-t border-white/20">
                        <p className="font-medium text-white">Selbstbedienung</p>
                        <p className="mt-1">Bezahlung bequem mit Twint</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact" className="btn-primary bg-secondary-500 hover:bg-secondary-600">
                      Kontakt aufnehmen
                    </Link>
                    <Link href="/hofladen" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary-800">
                      Mehr zum Hofladen
                    </Link>
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-primary-800">Standort</h4>
                      <p className="text-primary-600 text-sm">Fläsch, Graubünden</p>
                    </div>
                  </div>
                  <address className="not-italic text-primary-600 mb-4">
                    <p className="font-medium text-primary-800">Familie Gabathuler-Risch</p>
                    <p>St. Luzi 15</p>
                    <p>7306 Fläsch</p>
                  </address>
                  <div className="flex items-center gap-3 text-primary-600">
                    <svg className="w-5 h-5 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+41813022319" className="hover:text-secondary-600 transition-colors">
                      081 302 23 19
                    </a>
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
