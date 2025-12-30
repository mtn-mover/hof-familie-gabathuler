import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'

const philosophyItems = [
  {
    title: 'Qualität vor Quantität',
    description: 'Wir setzen auf hochwertige Produkte statt Massenproduktion. Jedes Tier erhält die Aufmerksamkeit, die es verdient.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Direktvermarktung ab Hof',
    description: 'Vom Stall direkt auf Ihren Teller. Ohne Umwege, ohne Zwischenhändler, mit vollem Geschmack.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Kurze Wege',
    description: 'Transparente Produktion und kurze Transportwege garantieren Frische und schonen die Umwelt.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Respekt für Tiere',
    description: 'Artgerechte Haltung ist für uns selbstverständlich. Unsere Tiere leben in natürlicher Umgebung.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <Layout
      title="Über uns"
      description="Familie Gabathuler-Risch - Tradition und Leidenschaft seit Generationen. Erfahren Sie mehr über unseren Hof in Fläsch, Graubünden."
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/family/Familie Gabathuler.JPG"
          alt="Familie Gabathuler-Risch auf ihrem Hof"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-900/50" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-secondary-400 font-medium text-sm tracking-wider uppercase mb-4">
              Über uns
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Familie Gabathuler-Risch
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Tradition und Leidenschaft seit Generationen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Family Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="/images/family/Familie Gabathuler2.jpg"
                  alt="Familie Gabathuler-Risch"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-100 rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
                Unsere Familie
              </span>
              <h2 className="section-title mb-6">
                Mit Herzblut für Sie da
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed mb-8">
                <p>
                  Wir sind Josef und Elsbeth Gabathuler-Risch und bewirtschaften unseren Hof in Fläsch mit viel Herzblut. Die Landwirtschaft liegt uns im Blut – sie ist nicht nur unser Beruf, sondern unsere Berufung.
                </p>
                <p>
                  Gemeinsam mit unserer Familie führen wir den Betrieb nach traditionellen Werten und mit modernem Wissen. Die Verbundenheit zur Natur und zu unseren Tieren prägt unsere tägliche Arbeit.
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-primary-50 rounded-xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-primary-700">St. Luzi 15, 7306 Fläsch</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-secondary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+41813022319" className="text-primary-700 hover:text-secondary-600 transition-colors">
                    081 302 23 19
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-secondary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:jogari@bluewin.ch" className="text-primary-700 hover:text-secondary-600 transition-colors">
                    jogari@bluewin.ch
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Farm Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
                Unser Hof
              </span>
              <h2 className="section-title mb-6">
                Mutterkuhhaltung in Fläsch
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed">
                <p>
                  Unser Hof liegt idyllisch in Fläsch, umgeben von der beeindruckenden Bündner Bergwelt. Hier betreiben wir naturnahe Mutterkuhhaltung, bei der die Kälber bei ihren Müttern aufwachsen.
                </p>
                <p>
                  Im Sommer verbringen unsere Tiere die warmen Monate auf der Sommerresidenz Fläscherberg. Die frische Bergluft, das saftige Gras und die natürliche Bewegungsfreiheit sorgen für gesunde, glückliche Tiere und erstklassiges Fleisch.
                </p>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-1">Weidehaltung</h4>
                  <p className="text-sm text-primary-600">Auf dem Fläscherberg</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-1">Ca. 1 Jahr</h4>
                  <p className="text-sm text-primary-600">Natürliche Aufzucht</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-1">Mutterkuh</h4>
                  <p className="text-sm text-primary-600">Kalb bei der Mutter</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary-800 mb-1">Nachhaltig</h4>
                  <p className="text-sm text-primary-600">Naturnahe Produktion</p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="/images/farm/Kuehe auf Alp.jpg"
                  alt="Kühe auf der Alp mit Bergpanorama"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-100 rounded-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farm Gallery Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
              Impressionen
            </span>
            <h2 className="section-title">Bilder von unserem Hof</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/farm/Kuh mit Kalb.jpg', alt: 'Kuh mit Kalb auf der Weide' },
              { src: '/images/farm/Viele Kuehe.jpg', alt: 'Unsere Kuhherde' },
              { src: '/images/farm/Feld mit Berge im Hintergrund.jpg', alt: 'Felder mit Bündner Bergen' },
              { src: '/images/farm/Kuh mit Mann.jpg', alt: 'Josef Gabathuler mit einer Kuh' },
              { src: '/images/farm/Kuehe im Stall.jpg', alt: 'Kühe im Stall' },
              { src: '/images/farm/Ernte.jpg', alt: 'Ernte auf dem Feld' },
              { src: '/images/farm/Kuh mit Kalb3.jpg', alt: 'Mutterkuh mit Kalb' },
              { src: '/images/Feld mit Sonnenuntergang.jpg', alt: 'Sonnenuntergang über den Feldern' },
            ].map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden relative group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
              Wofür wir stehen
            </span>
            <h2 className="section-title">Unsere Philosophie</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center group"
              >
                <div className="w-16 h-16 bg-secondary-50 rounded-xl flex items-center justify-center mx-auto mb-5 text-secondary-600 group-hover:bg-secondary-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                src="/images/farm/Feld mit Kuehen5.jpg"
                alt="Kühe auf dem Feld"
                fill
                className="object-cover"
                sizes="100vw"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary-900/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Lernen Sie uns kennen
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Besuchen Sie unseren Hofladen in Fläsch oder kontaktieren Sie uns für eine Bestellung.
                Wir freuen uns auf Sie!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary bg-secondary-500 hover:bg-secondary-600">
                  Kontakt aufnehmen
                </Link>
                <Link href="/products" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary-800">
                  Unsere Produkte
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
