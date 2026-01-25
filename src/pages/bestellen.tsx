import { useState, useEffect, FormEvent, useMemo } from 'react'
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

const portionsgroessen = [
  { value: 'klein', label: 'klein (ca. 120g)', gramm: 120 },
  { value: 'mittel', label: 'mittel (ca. 250g)', gramm: 250 },
  { value: 'gross', label: 'gross (ca. 500g)', gramm: 500 },
  { value: 'sehr-gross', label: 'sehr gross (ca. 1kg)', gramm: 1000 },
]

const bratenOptionen = ['Braten', 'Plätzli für Fleischvögel', 'Saftplätzli']

type EinzelItem = {
  fleischstueck: string
  portionen: number
  portionsgroesse: string
}

export default function BestellenPage() {
  const [termine, setTermine] = useState<Termin[]>([])
  const [preise, setPreise] = useState<Preise | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Einzelbestellungen state - dynamic list
  const [einzelItems, setEinzelItems] = useState<EinzelItem[]>([])

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
    bratenAufteilung: [],
    einzelbestellungen: [],
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

  // Sync einzelItems to formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      einzelbestellungen: einzelItems.filter((item) => item.portionen > 0),
    }))
  }, [einzelItems])

  // Calculate totals
  const totals = useMemo(() => {
    if (!preise) return { mischpaket: 0, einzelstuecke: 0, gesamt: 0 }

    // Mischpaket total
    const mischpaketKg = formData.mischpaketGroesse ? parseInt(formData.mischpaketGroesse) : 0
    const mischpaketTotal = mischpaketKg * preise.mischpaketProKg

    // Einzelstücke total
    let einzelTotal = 0
    einzelItems.forEach((item) => {
      if (item.portionen > 0) {
        const fleischItem = fleischstuecke.find((f) => f.label === item.fleischstueck)
        if (fleischItem) {
          const pricePerKg =
            preise.einzelpreise[fleischItem.key as keyof typeof preise.einzelpreise] || 0
          const selectedSize = portionsgroessen.find((p) => p.label === item.portionsgroesse)
          const grammPerPortion = selectedSize?.gramm || 250
          const totalKg = (item.portionen * grammPerPortion) / 1000
          einzelTotal += totalKg * pricePerKg
        }
      }
    })

    return {
      mischpaket: mischpaketTotal,
      einzelstuecke: einzelTotal,
      gesamt: mischpaketTotal + einzelTotal,
    }
  }, [formData.mischpaketGroesse, einzelItems, preise])

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
          name: '',
          adresse: '',
          plzOrt: '',
          telefon: '',
          email: '',
          liefertermin: '',
          mischpaketGroesse: '',
          portionsgroesse: '',
          mehrGehacktes: false,
          bratenAufteilung: [],
          einzelbestellungen: [],
        })
        setEinzelItems([])
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

  const updateField = (field: keyof Bestellung, value: string | boolean | string[]) => {
    setFormData({ ...formData, [field]: value })
  }

  const toggleBratenOption = (option: string) => {
    const current = formData.bratenAufteilung || []
    if (current.includes(option)) {
      updateField(
        'bratenAufteilung',
        current.filter((o) => o !== option)
      )
    } else {
      updateField('bratenAufteilung', [...current, option])
    }
  }

  // Einzelbestellung handlers
  const addEinzelItem = () => {
    setEinzelItems([
      ...einzelItems,
      { fleischstueck: '', portionen: 1, portionsgroesse: 'mittel (ca. 250g)' },
    ])
  }

  const updateEinzelItem = (index: number, field: keyof EinzelItem, value: string | number) => {
    const updated = [...einzelItems]
    updated[index] = { ...updated[index], [field]: value }
    setEinzelItems(updated)
  }

  const removeEinzelItem = (index: number) => {
    setEinzelItems(einzelItems.filter((_, i) => i !== index))
  }

  const getItemPrice = (fleischstueck: string) => {
    if (!preise) return 0
    const fleischItem = fleischstuecke.find((f) => f.label === fleischstueck)
    if (!fleischItem) return 0
    return preise.einzelpreise[fleischItem.key as keyof typeof preise.einzelpreise] || 0
  }

  const calculateItemTotal = (item: EinzelItem) => {
    const pricePerKg = getItemPrice(item.fleischstueck)
    const selectedSize = portionsgroessen.find((p) => p.label === item.portionsgroesse)
    const grammPerPortion = selectedSize?.gramm || 250
    return ((item.portionen * grammPerPortion) / 1000) * pricePerKg
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
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary-800 mb-4">
                Bestellung gesendet!
              </h1>
              <p className="text-primary-600 mb-8">
                Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigungsmail. Wir
                werden uns bei Ihnen melden.
              </p>
              <button onClick={() => setSubmitStatus('idle')} className="btn-primary">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-2">Mischpaket</h2>
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

                  {/* Portionsgrösse Dropdown */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Gewünschte Portionsgrösse
                    </label>
                    <select
                      value={formData.portionsgroesse}
                      onChange={(e) => updateField('portionsgroesse', e.target.value)}
                      className="w-full max-w-xs px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-white"
                    >
                      <option value="">Bitte wählen...</option>
                      {portionsgroessen.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sonderwünsche - Improved Display */}
                  <div className="bg-accent-50 border border-accent-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-5 h-5 text-accent-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <h4 className="font-semibold text-primary-800">Sonderwünsche (optional)</h4>
                    </div>

                    <div className="space-y-4">
                      {/* Sonderwunsch 1: Mehr Gehacktes */}
                      <label className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-primary-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.mehrGehacktes}
                          onChange={(e) => updateField('mehrGehacktes', e.target.checked)}
                          className="w-5 h-5 mt-0.5 rounded border-primary-300 text-secondary-500 focus:ring-secondary-500"
                        />
                        <div>
                          <span className="font-medium text-primary-800">Mehr Gehacktes</span>
                          <p className="text-sm text-primary-500">
                            Anstelle von Siedfleisch mehr Gehacktes
                          </p>
                        </div>
                      </label>

                      {/* Sonderwunsch 2: Braten aufteilen */}
                      <div className="p-3 bg-white rounded-lg">
                        <div className="mb-3">
                          <span className="font-medium text-primary-800">Braten aufteilen</span>
                          <p className="text-sm text-primary-500">
                            Wählen Sie, wie der Braten aufgeteilt werden soll
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {bratenOptionen.map((option) => (
                            <label
                              key={option}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                                formData.bratenAufteilung?.includes(option)
                                  ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                                  : 'border-primary-200 hover:border-primary-300 text-primary-600'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.bratenAufteilung?.includes(option) || false}
                                onChange={() => toggleBratenOption(option)}
                                className="w-4 h-4 rounded border-primary-300 text-secondary-500 focus:ring-secondary-500"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Einzelbestellungen - New Dropdown-based Design */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-2">
                Einzelne Fleischstücke (optional)
              </h2>
              <p className="text-primary-600 mb-6">
                Zusätzlich oder anstelle eines Mischpakets
              </p>

              {/* Added items */}
              {einzelItems.length > 0 && (
                <div className="space-y-3 mb-6">
                  {einzelItems.map((item, index) => {
                    const itemTotal = item.fleischstueck ? calculateItemTotal(item) : 0

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 border border-primary-100"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                          {/* Fleischstück Dropdown */}
                          <div className="sm:col-span-4">
                            <label className="text-xs font-medium text-primary-500 mb-1 block">
                              Fleischstück
                            </label>
                            <select
                              value={item.fleischstueck}
                              onChange={(e) =>
                                updateEinzelItem(index, 'fleischstueck', e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-white"
                            >
                              <option value="">Bitte wählen...</option>
                              {fleischstuecke.map((f) => (
                                <option key={f.key} value={f.label}>
                                  {f.label}{' '}
                                  {preise &&
                                    `(CHF ${preise.einzelpreise[f.key as keyof typeof preise.einzelpreise]?.toFixed(2)}/kg)`}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Portionen */}
                          <div className="sm:col-span-2">
                            <label className="text-xs font-medium text-primary-500 mb-1 block">
                              Anzahl
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={item.portionen}
                              onChange={(e) =>
                                updateEinzelItem(index, 'portionen', parseInt(e.target.value) || 1)
                              }
                              className="w-full px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                            />
                          </div>

                          {/* Portionsgrösse */}
                          <div className="sm:col-span-3">
                            <label className="text-xs font-medium text-primary-500 mb-1 block">
                              Portionsgrösse
                            </label>
                            <select
                              value={item.portionsgroesse}
                              onChange={(e) =>
                                updateEinzelItem(index, 'portionsgroesse', e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 bg-white"
                            >
                              {portionsgroessen.map((option) => (
                                <option key={option.value} value={option.label}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Price & Remove */}
                          <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-3">
                            {item.fleischstueck && (
                              <span className="font-semibold text-secondary-600">
                                CHF {itemTotal.toFixed(2)}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => removeEinzelItem(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Entfernen"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Add Button */}
              <button
                type="button"
                onClick={addEinzelItem}
                className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-primary-300 rounded-xl text-primary-600 hover:border-secondary-400 hover:text-secondary-600 transition-colors w-full justify-center"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Fleischstück hinzufügen
              </button>
            </div>

            {/* Total */}
            {totals.gesamt > 0 && (
              <div className="bg-secondary-50 border-2 border-secondary-200 rounded-2xl p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold text-primary-800 mb-4">
                  Geschätztes Total
                </h2>
                <div className="space-y-2">
                  {totals.mischpaket > 0 && (
                    <div className="flex justify-between text-primary-700">
                      <span>Mischpaket ({formData.mischpaketGroesse} kg)</span>
                      <span>CHF {totals.mischpaket.toFixed(2)}</span>
                    </div>
                  )}
                  {totals.einzelstuecke > 0 && (
                    <div className="flex justify-between text-primary-700">
                      <span>Einzelne Fleischstücke</span>
                      <span>CHF {totals.einzelstuecke.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-secondary-300 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-primary-800">
                      <span>Total (ca.)</span>
                      <span>CHF {totals.gesamt.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-primary-500 mt-4">
                  * Der endgültige Preis kann je nach tatsächlichem Gewicht leicht abweichen.
                </p>
              </div>
            )}

            {/* Kundendaten */}
            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-6">Ihre Daten</h2>
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
                  <label className="block text-sm font-medium text-primary-700 mb-2">Adresse</label>
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
                  <label className="block text-sm font-medium text-primary-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => updateField('telefon', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              {submitStatus === 'error' && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
