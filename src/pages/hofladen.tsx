import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'

const offerings = [
  {
    title: 'Rindfleisch',
    description: 'Mischpakete und einzelne Fleischstücke aus unserer Mutterkuhhaltung',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Frisch auf Bestellung',
    description: 'Wir schlachten zu festen Terminen - so erhalten Sie garantiert frisches Fleisch',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Saisonale Produkte',
    description: 'Je nach Saison weitere Hofprodukte wie Kartoffeln und Gemüse',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

const features = [
  {
    title: 'Direktvermarktung',
    description: 'Vom Hof direkt zu Ihnen - ohne Zwischenhändler',
  },
  {
    title: 'Persönliche Beratung',
    description: 'Wir nehmen uns Zeit für Ihre Fragen',
  },
  {
    title: 'Regionale Qualität',
    description: 'Produkte aus dem Bündnerland',
  },
  {
    title: 'Transparenz',
    description: 'Sie wissen, woher Ihr Fleisch kommt',
  },
]

// Hofladen Gallery Images
const hofladenImages = [
  { src: '/images/hofladen/Hofladen von innen.jpg', alt: 'Hofladen Innenansicht' },
  { src: '/images/hofladen/Hofladen Angebot1.jpg', alt: 'Frische Produkte im Angebot' },
  { src: '/images/hofladen/Hofladen Angebot2.jpg', alt: 'Fleischwaren im Hofladen' },
  { src: '/images/hofladen/Hofladen Angebot3.jpg', alt: 'Regionale Spezialitäten' },
  { src: '/images/hofladen/Hofladen Eier.jpg', alt: 'Frische Eier vom Hof' },
  { src: '/images/hofladen/Hofladen2.JPG', alt: 'Unser Hofladen von aussen' },
]

export default function HofladenPage() {
  return (
    <Layout
      title="Hofladen"
      description="Besuchen Sie unseren Hofladen in Fläsch - Frisches Rindfleisch und regionale Produkte direkt vom Hof Familie Gabathuler."
    >
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hofladen/Hero.jpg"
          alt="Hofladen Familie Gabathuler"
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
              Einkaufen beim Bauern
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Unser Hofladen
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Frische Produkte direkt vom Hof
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="py-0">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-secondary-600 rounded-2xl p-8 md:p-10 -mt-16 relative z-20 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    24/7 geöffnet
                  </h2>
                </div>
                <p className="text-secondary-100 text-lg mb-2">
                  <strong className="text-white">Selbstbedienung rund um die Uhr</strong>
                </p>
                <p className="text-secondary-200">
                  Unser Hofladen ist täglich geöffnet. Bedienen Sie sich selbst und bezahlen Sie bequem mit Twint.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="inline-flex items-center justify-center gap-3 bg-white text-secondary-600 font-semibold px-6 py-4 rounded-full">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Bezahlung mit Twint
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer Section */}
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
              Unser Angebot
            </span>
            <h2 className="section-title">Was gibt es bei uns?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((item, index) => (
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
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link href="/products" className="btn-primary">
              Alle Produkte ansehen
            </Link>
          </motion.div>
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
            <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
              Impressionen
            </span>
            <h2 className="section-title">Einblicke in unseren Hofladen</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hofladenImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-xl overflow-hidden group ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={index === 0 ? "(max-width: 768px) 50vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
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

      {/* Location Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map/Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative group">
                <Image
                  src="/images/Feld mit Bergen2.jpg"
                  alt="Blick auf die Bündner Berge bei Fläsch"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h4 className="font-serif text-2xl font-semibold mb-2">
                    St. Luzi 15
                  </h4>
                  <p className="text-white/80">
                    7306 Fläsch, Graubünden
                  </p>
                  <a
                    href="https://maps.google.com/?q=St.+Luzi+15,+7306+Fläsch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-secondary-400 hover:text-secondary-300 transition-colors"
                  >
                    In Google Maps öffnen
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
                So finden Sie uns
              </span>
              <h2 className="section-title mb-6">
                Standort & Anfahrt
              </h2>
              <div className="space-y-4 text-primary-600 leading-relaxed mb-8">
                <p>
                  Unser Hofladen befindet sich direkt auf dem Bauernhof an der St. Luzi 15 in Fläsch.
                  Das malerische Dorf liegt im Bündner Rheintal, umgeben von Weinbergen und Bergen.
                </p>
                <p>
                  Von der Hauptstrasse aus ist der Hof gut erreichbar. Parkplätze sind direkt am Hof vorhanden.
                </p>
              </div>

              {/* Address Card */}
              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <h4 className="font-serif text-lg font-semibold text-primary-800 mb-4">
                  Adresse
                </h4>
                <address className="not-italic space-y-2 text-primary-600">
                  <p className="font-medium text-primary-800">Familie Gabathuler-Risch</p>
                  <p>St. Luzi 15</p>
                  <p>7306 Fläsch</p>
                  <p>Graubünden, Schweiz</p>
                </address>
              </div>

              <Link href="/contact" className="btn-secondary">
                Kontakt aufnehmen
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Ihre Vorteile
            </span>
            <h2 className="section-title">Warum beim Bauern kaufen?</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-md"
              >
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-primary-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hofladen/Hofladen.JPG"
            alt="Hofladen von aussen"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary-800/80" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Wir freuen uns auf Ihren Besuch!
            </h2>
            <p className="text-primary-200 max-w-2xl mx-auto mb-8">
              Rufen Sie uns an und vereinbaren Sie einen Termin.
              Gerne zeigen wir Ihnen unseren Hof und beraten Sie persönlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41813022319"
                className="btn-primary bg-secondary-500 hover:bg-secondary-600"
              >
                Jetzt anrufen
              </a>
              <Link href="/contact" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-primary-800">
                Kontaktformular
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
