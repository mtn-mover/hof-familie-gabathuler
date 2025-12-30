import { motion } from 'framer-motion'
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

const products = [
  { name: 'Siedfleisch', price: 21, description: 'Ideal für Suppen und Eintöpfe' },
  { name: 'Gehacktes', price: 21, description: 'Vielseitig verwendbar' },
  { name: 'Geschnetzeltes', price: 35, description: 'Zart und schnell zubereitet' },
  { name: 'Voressen', price: 25, description: 'Perfekt für Schmorgerichte' },
  { name: 'Braten', price: 32, description: 'Für festliche Anlässe' },
  { name: 'Fleischvögel Plätzli', price: 32, description: 'Traditionelle Schweizer Spezialität' },
  { name: 'Saftplätzli', price: 34, description: 'Saftig und aromatisch' },
  { name: 'Plätzli', price: 45, description: 'Kurz gebraten ein Genuss' },
  { name: 'Steak', price: 57, description: 'Premium-Qualität vom Grill' },
  { name: 'Huft', price: 65, description: 'Besonders zart und mager' },
  { name: 'Filet', price: 75, description: 'Das edelste Stück' },
  { name: 'Leber', price: 21, description: 'Reich an Nährstoffen' },
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
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-600 to-secondary-800" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-900/30" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-secondary-200 font-medium text-sm tracking-wider uppercase mb-4">
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
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Info Side */}
                <div className="p-8 md:p-10">
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
                  <div className="flex flex-wrap gap-3 mb-8">
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

                  <Link href="/contact" className="btn-primary w-full sm:w-auto">
                    Jetzt bestellen
                  </Link>
                </div>

                {/* Contents Side */}
                <div className="bg-white p-8 md:p-10">
                  <h4 className="font-serif text-lg font-semibold text-primary-800 mb-4">
                    Zusammensetzung 10kg Paket
                  </h4>
                  <ul className="space-y-3">
                    {mischpaketContents.map((item, index) => (
                      <motion.li
                        key={item.item}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between py-2 border-b border-primary-100 last:border-0"
                      >
                        <span className="text-primary-700">{item.item}</span>
                        <span className="font-medium text-primary-800 bg-primary-50 px-3 py-1 rounded-full text-sm">
                          {item.amount}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-primary-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary-800">Total</span>
                      <span className="font-bold text-secondary-600">10.0 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Einzelne Fleischstücke Section */}
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
              Individuell
            </span>
            <h2 className="section-title">Einzelne Fleischstücke</h2>
            <p className="section-subtitle mx-auto mt-4">
              Wählen Sie genau das, was Sie brauchen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="card group"
              >
                {/* Placeholder Image */}
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-4 flex items-center justify-center group-hover:from-primary-150 group-hover:to-primary-250 transition-all">
                  <svg className="w-16 h-16 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <h3 className="font-serif text-lg font-semibold text-primary-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-primary-500 mb-3">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-secondary-600">
                    CHF {product.price.toFixed(2)}
                  </span>
                  <span className="text-primary-500 text-sm">/kg</span>
                </div>
              </motion.div>
            ))}
          </div>
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
              {deliveryDates.map((date, index) => (
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
      <section className="section bg-secondary-600">
        <div className="container-custom">
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
