import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'

const mischpaketContents = [
  { amount: '1.7 kg', item: 'Gehacktes' },
  { amount: '1.2 kg', item: 'Geschnetzeltes' },
  { amount: '1.3 kg', item: 'Siedfleisch' },
  { amount: '1.8 kg', item: 'Voressen' },
  { amount: '2.0 kg', item: 'Braten' },
  { amount: '0.8 kg', item: 'Plätzli' },
  { amount: '0.6 kg', item: 'Steak' },
  { amount: '0.6 kg', item: 'Huft/Filet' },
]

const deliveryDates = [
  { month: 'November', year: '2024', status: 'available' },
  { month: 'Dezember', year: '2024', status: 'available' },
  { month: 'April/Mai', year: '2025', status: 'planned' },
]

export default function ProductsPage() {
  return (
    <Layout
      title="Produkte"
      description="Frisches Rindfleisch aus Mutterkuhhaltung - Mischpakete und einzelne Fleischstücke direkt vom Hof Familie Gabathuler in Fläsch."
    >
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/products/Hero.JPG"
          alt="Frisches Rindfleisch aus Mutterkuhhaltung"
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
              Direkt vom Hof
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Unsere Produkte
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Frisches Rindfleisch aus Mutterkuhhaltung
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mischpakete Section */}
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
              Empfohlen
            </span>
            <h2 className="section-title">Mischpakete</h2>
            <p className="section-subtitle mx-auto mt-4">
              Die perfekte Auswahl für jeden Anlass - fertig zusammengestellt
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Image Side */}
                <div className="lg:col-span-2 relative h-64 lg:h-auto">
                  <Image
                    src="/images/farm/Kuh mit Kalb.jpg"
                    alt="Kuh mit Kalb - Mutterkuhhaltung"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary-50 via-transparent to-transparent" />
                </div>

                {/* Info Side */}
                <div className="lg:col-span-3 p-8 md:p-10">
                  <div className="inline-flex items-center gap-2 bg-secondary-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Bestseller
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-primary-800 mb-2">
                    Mischpaket
                  </h3>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-secondary-600">CHF 29.00</span>
                    <span className="text-primary-600">/kg</span>
                  </div>

                  <p className="text-primary-600 mb-6">
                    Unser beliebtes Mischpaket enthält eine ausgewogene Auswahl verschiedener Fleischstücke.
                    Ideal für Familien und alle, die Abwechslung schätzen.
                  </p>

                  {/* Package Sizes */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <span className="font-semibold text-primary-800">10 kg</span>
                      <span className="text-primary-500 text-sm ml-1">CHF 290</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <span className="font-semibold text-primary-800">15 kg</span>
                      <span className="text-primary-500 text-sm ml-1">CHF 435</span>
                    </div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                      <span className="font-semibold text-primary-800">20 kg</span>
                      <span className="text-primary-500 text-sm ml-1">CHF 580</span>
                    </div>
                  </div>

                  {/* Contents */}
                  <div className="bg-white rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-primary-800 mb-3 text-sm">Zusammensetzung 10kg Paket:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {mischpaketContents.map((item) => (
                        <div key={item.item} className="flex justify-between">
                          <span className="text-primary-600">{item.item}</span>
                          <span className="font-medium text-primary-800">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" className="btn-primary w-full sm:w-auto">
                    Jetzt bestellen
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Liefertermine Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-secondary-600 font-medium text-sm tracking-wider uppercase mb-4">
                Planung
              </span>
              <h2 className="section-title">Geplante Schlachttermine</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {deliveryDates.map((date) => (
                <div
                  key={`${date.month}-${date.year}`}
                  className={`rounded-xl p-6 text-center ${
                    date.status === 'available'
                      ? 'bg-secondary-50 border-2 border-secondary-200'
                      : 'bg-primary-50 border-2 border-primary-200'
                  }`}
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    date.status === 'available'
                      ? 'bg-secondary-100 text-secondary-700'
                      : 'bg-primary-200 text-primary-700'
                  }`}>
                    {date.status === 'available' ? (
                      <>
                        <span className="w-2 h-2 bg-secondary-500 rounded-full" />
                        Verfügbar
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 bg-primary-400 rounded-full" />
                        Geplant
                      </>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-1">
                    {date.month}
                  </h3>
                  <p className="text-primary-600">{date.year}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-accent-50 border border-accent-200 rounded-xl p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-primary-800 mb-1">Vorbestellung erforderlich</h4>
                <p className="text-primary-600 text-sm">
                  Um Ihnen frisches Fleisch in bester Qualität garantieren zu können, bitten wir Sie,
                  Ihre Bestellung rechtzeitig aufzugeben. Kontaktieren Sie uns für weitere Informationen.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/farm/Kuehe auf Alp.jpg"
            alt="Kühe auf der Alp"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-secondary-600/90" />
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
              Bereit für frisches Fleisch vom Hof?
            </h2>
            <p className="text-secondary-100 max-w-2xl mx-auto mb-8">
              Kontaktieren Sie uns für Ihre Bestellung. Wir beraten Sie gerne persönlich
              und stellen Ihr individuelles Paket zusammen.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-secondary-600 font-medium rounded-full transition-all duration-300 hover:bg-primary-50 hover:shadow-lg hover:-translate-y-0.5"
            >
              Zur Bestellung
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
