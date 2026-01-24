import { useState, useEffect, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import type { Termin } from './api/termine'
import type { Preise } from './api/preise'
import type { Bestellung } from './api/bestellen'

const fleischstuecke = [
  { key: 'siedfleisch', label: 'Siedfleisch' },
  { key: 'gehacktes', label: 'Gehacktes' },
  { key: 'geschnetzeltes', label: 'Geschnetzeltes' },
  { key: 'voressen', label: 'Voressen' },
  { key: 'braten', label: 'Braten' },
  { key: 'fleischvogelPlaetzli', label: 'Fleischvögel Plätzli' },
  { key: 'saftplaetzli', label: 'Saftplätzli' },
  { key: 'plaetzli', label: 'Plätzli' },
  { key: 'steak', label: 'Steak' },
  { key: 'huft', label: 'Huft' },
  { key: 'filet', label: 'Filet' },
  { key: 'leber', label: 'Leber' },
]

const mischpaketInhalt = [
  { menge: '1.7 kg', name: 'Gehacktes' },
  { menge: '1.2 kg', name: 'Geschnetzeltes' },
  { menge: '1.3 kg', name: 'Siedfleisch' },
  { menge: '1.8 kg', name: 'Voressen' },
  { menge: '2.0 kg', name: 'Braten' },
  { menge: '0.8 kg', name: 'Plätzli' },
  { menge: '0.6 kg', name: 'Steak' },
  { menge: '0.6 kg', name: 'Huft/Filet' },
]

export default function BestellenPage() {
  const [termine, setTermine] = useState<Termin[]>([])
  const [preise, setPreise] = useState<Preise | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Form state
  const [formData, setFormData] = useState<Bestellung>({
    name: '',
    adresse: '',
    plzOrt: '',
    telefon: '',
    email: '',
    liefertermin: '',
    mischpaketGroesse: '',
    portionsgroesse: '',
    mehrGehacktes: false,
    bratenAufteilen: false,
    bratenAufteilungDetails: '',
    einzelbestellungen: fleischstuecke.map((f) => ({
      fleischstueck: f.label,
      portionen: 0,
      gramm: 500,
    })),
  })

  // Load termine and preise
  useEffect(() => {
    const loadData = async () => {
      try {
        const [termineRes, preiseRes] = await Promise.all([
          fetch('/api/termine'),
          fetch('/api/preise'),
        ])
        const termineData = await termineRes.json()
        const preiseData = await preiseRes.json()

        setTermine(termineData.termine?.filter((t: Termin) => t.status === 'aktiv') || [])
        setPreise(preiseData.preise || null)
      } catch (error) {
        console.error('Error loading data:', error)
      }
      setIsLoading(false)
    }
    loadData()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const res = await fetch('/api/bestellen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          ...formData,
          name: '',
          adresse: '',
          plzOrt: '',
          telefon: '',
          email: '',
          liefertermin: '',
          mischpaketGroesse: '',
          portionsgroesse: '',
          mehrGehacktes: false,
          bratenAufteilen: false,
          bratenAufteilungDetails: '',
          einzelbestellungen: fleischstuecke.map((f) => ({
            fleischstueck: f.label,
            portionen: 0,
            gramm: 500,
          })),
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Ein Fehler ist aufgetreten')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Verbindungsfehler. Bitte versuchen Sie es später erneut.')
    }

    setIsSubmitting(false)
  }

  const updateField = (field: keyof Bestellung, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  const updateEinzelbestellung = (index: number, field: 'portionen' | 'gramm', value: number) => {
    const updated = [...(formData.einzelbestellungen || [])]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, einzelbestellungen: updated })
  }

  if (isLoading) {
    return (
      <Layout title="Bestellen" description="Rindfleisch bestellen bei Hof Familie Gabathuler">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-primary-600">Lädt...</p>
        </div>
      </Layout>
    )
  }

  // Success message
  if (submitStatus === 'success') {
    return (
      <Layout title="Bestellung gesendet" description="Ihre Bestellung wurde erfolgreich gesendet">
        <section className="section bg-white min-h-[60vh] flex items-center">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary-800 mb-4">
                Bestellung gesendet!
              </h1>
              <p className="text-primary-600 mb-8">
                Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigungsmail.
                Wir werden uns bei Ihnen melden.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="btn-primary"
              >
                Neue Bestellung
              </button>
            </motion.div>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <Layout
      title="Bestellen"
      description="Bestellen Sie Rindfleisch aus Mutterkuhhaltung direkt bei Familie Gabathuler in Fläsch."
    >
      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Rindfleisch bestellen
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Frisches Rindfleisch aus Mutterkuhhaltung direkt vom Hof
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Kundendaten */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-6">
                Ihre Daten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    E-Mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.adresse}
                    onChange={(e) => updateField('adresse', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    PLZ / Ort
                  </label>
                  <input
                    type="text"
                    value={formData.plzOrt}
                    onChange={(e) => updateField('plzOrt', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => updateField('telefon', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
              </div>
            </div>

            {/* Liefertermin */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-6">
                Liefertermin <span className="text-red-500">*</span>
              </h2>
              {termine.length === 0 ? (
                <p className="text-primary-600">
                  Aktuell sind keine Termine verfügbar. Bitte kontaktieren Sie uns.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {termine.map((termin) => (
                    <label
                      key={termin.id}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        formData.liefertermin === termin.name
                          ? 'border-secondary-500 bg-secondary-50'
                          : 'border-primary-200 hover:border-primary-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="liefertermin"
                        value={termin.name}
                        checked={formData.liefertermin === termin.name}
                        onChange={(e) => updateField('liefertermin', e.target.value)}
                        className="sr-only"
                        required
                      />
                      <span className="text-primary-800 font-medium">{termin.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Mischpaket */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-2">
                Mischpaket
              </h2>
              {preise && (
                <p className="text-primary-600 mb-6">
                  Preis: CHF {preise.mischpaketProKg.toFixed(2)}/kg
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {['10', '15', '20'].map((size) => (
                  <label
                    key={size}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      formData.mischpaketGroesse === size
                        ? 'border-secondary-500 bg-secondary-50'
                        : 'border-primary-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mischpaketGroesse"
                      value={size}
                      checked={formData.mischpaketGroesse === size}
                      onChange={(e) => updateField('mischpaketGroesse', e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl font-bold text-primary-800">{size} kg</span>
                    {preise && (
                      <span className="text-secondary-600 font-medium">
                        CHF {(parseInt(size) * preise.mischpaketProKg).toFixed(0)}
                      </span>
                    )}
                  </label>
                ))}
              </div>

              {formData.mischpaketGroesse && (
                <>
                  {/* Inhalt */}
                  <div className="bg-white rounded-xl p-4 mb-6">
                    <h4 className="font-medium text-primary-700 mb-3">Inhalt 10kg-Paket (ca.):</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-primary-600">
                      {mischpaketInhalt.map((item) => (
                        <div key={item.name}>
                          <span className="font-medium">{item.menge}</span> {item.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portionsgrösse */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Gewünschte Portionsgrösse (g)
                    </label>
                    <input
                      type="number"
                      value={formData.portionsgroesse}
                      onChange={(e) => updateField('portionsgroesse', e.target.value)}
                      placeholder="z.B. 500"
                      className="w-full max-w-xs px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                    />
                  </div>

                  {/* Sonderwünsche */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary-700">Sonderwünsche:</h4>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.mehrGehacktes}
                        onChange={(e) => updateField('mehrGehacktes', e.target.checked)}
                        className="w-5 h-5 rounded border-primary-300 text-secondary-500 focus:ring-secondary-500"
                      />
                      <span className="text-primary-600">
                        Anstelle von Siedfleisch mehr Gehacktes
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.bratenAufteilen}
                        onChange={(e) => updateField('bratenAufteilen', e.target.checked)}
                        className="w-5 h-5 rounded border-primary-300 text-secondary-500 focus:ring-secondary-500 mt-0.5"
                      />
                      <div>
                        <span className="text-primary-600">
                          Braten aufteilen (Braten, Fleischvögel Plätzli, Saftplätzli)
                        </span>
                        {formData.bratenAufteilen && (
                          <input
                            type="text"
                            value={formData.bratenAufteilungDetails}
                            onChange={(e) => updateField('bratenAufteilungDetails', e.target.value)}
                            placeholder="Wie soll aufgeteilt werden?"
                            className="mt-2 w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Einzelbestellungen */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-2">
                Einzelne Fleischstücke (optional)
              </h2>
              <p className="text-primary-600 mb-6">
                Zusätzlich oder anstelle eines Mischpakets
              </p>

              <div className="space-y-4">
                {formData.einzelbestellungen?.map((item, index) => (
                  <div
                    key={fleischstuecke[index].key}
                    className="grid grid-cols-12 gap-4 items-center bg-white rounded-xl p-4"
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <span className="font-medium text-primary-800">
                        {item.fleischstueck}
                      </span>
                      {preise && (
                        <span className="text-sm text-primary-500 ml-2">
                          CHF {preise.einzelpreise[fleischstuecke[index].key as keyof typeof preise.einzelpreise]?.toFixed(2)}/kg
                        </span>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="text-xs text-primary-500 mb-1 block">Portionen</label>
                      <input
                        type="number"
                        min="0"
                        value={item.portionen || ''}
                        onChange={(e) =>
                          updateEinzelbestellung(index, 'portionen', parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label className="text-xs text-primary-500 mb-1 block">Gramm/Portion</label>
                      <input
                        type="number"
                        min="100"
                        step="100"
                        value={item.gramm}
                        onChange={(e) =>
                          updateEinzelbestellung(index, 'gramm', parseInt(e.target.value) || 500)
                        }
                        className="w-full px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              {submitStatus === 'error' && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || termine.length === 0}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Bestellung absenden'}
              </button>
              <p className="text-sm text-primary-500 mt-4">
                Sie erhalten eine Bestätigungsmail nach dem Absenden.
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}
