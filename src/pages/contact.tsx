import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For now, just show success message
    setSubmitStatus('success')
    setIsSubmitting(false)

    // Reset form after success
    setFormData({ name: '', email: '', phone: '', message: '' })

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Layout
      title="Kontakt"
      description="Kontaktieren Sie Familie Gabathuler-Risch in Fläsch. Wir freuen uns auf Ihre Anfrage für frisches Rindfleisch aus Mutterkuhhaltung."
    >
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/farm/Hero.jpg"
            alt="Hof Gabathuler in Fläsch"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-900/50 to-primary-900/70" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-secondary-400 font-medium text-sm tracking-wider uppercase mb-4">
              Wir sind für Sie da
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Haben Sie Fragen oder möchten Sie bestellen? Wir freuen uns auf Ihre Nachricht.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="section-title mb-6">Schreiben Sie uns</h2>
              <p className="text-primary-600 mb-8">
                Füllen Sie das Formular aus und wir melden uns so schnell wie möglich bei Ihnen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">
                    Name <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white text-primary-800 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                    E-Mail <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white text-primary-800 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200"
                    placeholder="ihre.email@beispiel.ch"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white text-primary-800 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200"
                    placeholder="079 123 45 67"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">
                    Nachricht <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 bg-white text-primary-800 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Ihre Nachricht an uns..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-primary ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Wird gesendet...
                      </span>
                    ) : (
                      'Nachricht senden'
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary-50 border border-secondary-200 text-secondary-700 px-4 py-3 rounded-xl flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Es gab ein Problem. Bitte versuchen Sie es erneut.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="section-title mb-6">Kontaktinformationen</h2>
              <p className="text-primary-600 mb-8">
                Sie erreichen uns auch direkt per Telefon oder E-Mail.
                Wir freuen uns auf Sie!
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1">Adresse</h3>
                      <address className="not-italic text-primary-600">
                        <p className="font-medium">Familie Gabathuler-Risch</p>
                        <p>St. Luzi 15</p>
                        <p>7306 Fläsch</p>
                        <p>Graubünden, Schweiz</p>
                      </address>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1">Telefon</h3>
                      <a
                        href="tel:+41813022319"
                        className="text-secondary-600 hover:text-secondary-700 transition-colors text-lg font-medium"
                      >
                        081 302 23 19
                      </a>
                      <p className="text-sm text-primary-500 mt-1">
                        Rufen Sie uns an für Bestellungen
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1">E-Mail</h3>
                      <a
                        href="mailto:jogari@bluewin.ch"
                        className="text-secondary-600 hover:text-secondary-700 transition-colors"
                      >
                        jogari@bluewin.ch
                      </a>
                      <p className="text-sm text-primary-500 mt-1">
                        Schreiben Sie uns jederzeit
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-secondary-50 border border-secondary-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary-800">
                    Hofladen 24/7 geöffnet
                  </h3>
                </div>
                <p className="text-primary-700 font-medium mb-2">
                  Selbstbedienung rund um die Uhr
                </p>
                <p className="text-sm text-primary-600">
                  Bezahlung bequem mit Twint. Bedienen Sie sich jederzeit selbst.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
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
              Standort
            </span>
            <h2 className="section-title">So finden Sie uns</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Google Maps Embed - Replace with actual embed code */}
            <div className="aspect-[21/9] bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 text-secondary-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-serif text-2xl font-semibold text-secondary-700 mb-2">
                  St. Luzi 15, 7306 Fläsch
                </h3>
                <p className="text-secondary-600 mb-6">
                  Im malerischen Bündner Rheintal
                </p>
                <a
                  href="https://maps.google.com/?q=St.+Luzi+15,+7306+Fläsch,+Schweiz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Route in Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-12 bg-secondary-600">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Möchten Sie direkt bestellen?
              </h3>
              <p className="text-secondary-100">
                Rufen Sie uns an - wir beraten Sie gerne persönlich.
              </p>
            </div>
            <a
              href="tel:+41813022319"
              className="inline-flex items-center gap-3 bg-white text-secondary-600 font-semibold px-8 py-4 rounded-full hover:bg-primary-50 transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              081 302 23 19
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
