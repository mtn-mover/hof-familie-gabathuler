import { useState, useEffect } from 'react'
import Head from 'next/head'
import type { Termin } from './api/termine'
import type { Preise } from './api/preise'
import type { SaisonalesProdukt } from './api/saisonales'

const fleischstueckeLabels: Record<string, string> = {
  siedfleisch: 'Siedfleisch',
  gehacktes: 'Gehacktes',
  geschnetzeltes: 'Geschnetzeltes',
  voressen: 'Voressen',
  braten: 'Braten',
  fleischvogelPlaetzli: 'Fleischvögel Plätzli',
  saftplaetzli: 'Saftplätzli',
  plaetzli: 'Plätzli',
  steak: 'Steak',
  huft: 'Huft',
  filet: 'Filet',
  leber: 'Leber',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [termine, setTermine] = useState<Termin[]>([])
  const [preise, setPreise] = useState<Preise | null>(null)
  const [saisonales, setSaisonales] = useState<SaisonalesProdukt[]>([])
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = async () => {
    try {
      const [termineRes, preiseRes, saisonalesRes] = await Promise.all([
        fetch('/api/termine'),
        fetch('/api/preise'),
        fetch('/api/saisonales'),
      ])
      const termineData = await termineRes.json()
      const preiseData = await preiseRes.json()
      const saisonalesData = await saisonalesRes.json()

      setTermine(termineData.termine || [])
      setPreise(preiseData.preise || null)
      setSaisonales(saisonalesData.saisonales || [])
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        setAuthError('Falsches Passwort')
      }
    } catch (error) {
      setAuthError('Verbindungsfehler')
    }

    setIsLoading(false)
  }

  const saveTermine = async () => {
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/termine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, termine }),
      })

      if (res.ok) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const savePreise = async () => {
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/preise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, preise }),
      })

      if (res.ok) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const updateTerminStatus = (id: string, status: 'aktiv' | 'ausverkauft') => {
    setTermine(termine.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  const updateTerminName = (id: string, name: string) => {
    setTermine(termine.map((t) => (t.id === id ? { ...t, name } : t)))
  }

  const addTermin = () => {
    const newId = String(Date.now())
    setTermine([...termine, { id: newId, name: 'Neuer Termin', status: 'aktiv' }])
  }

  const removeTermin = (id: string) => {
    setTermine(termine.filter((t) => t.id !== id))
  }

  const updatePreis = (key: string, value: number) => {
    if (!preise) return
    if (key === 'mischpaketProKg') {
      setPreise({ ...preise, mischpaketProKg: value })
    } else {
      setPreise({
        ...preise,
        einzelpreise: { ...preise.einzelpreise, [key]: value },
      })
    }
  }

  // Saisonales CRUD
  const saveSaisonales = async () => {
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/saisonales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, saisonales }),
      })

      if (res.ok) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const addSaisonalesProdukt = () => {
    const newId = String(Date.now())
    setSaisonales([
      ...saisonales,
      { id: newId, name: 'Neues Produkt', beschreibung: '', verfuegbar: true },
    ])
  }

  const removeSaisonalesProdukt = (id: string) => {
    setSaisonales(saisonales.filter((p) => p.id !== id))
  }

  const updateSaisonalesProdukt = (
    id: string,
    field: keyof SaisonalesProdukt,
    value: string | boolean,
  ) => {
    setSaisonales(saisonales.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin | Hof Familie Gabathuler</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h1 className="font-serif text-2xl font-bold text-primary-800 mb-6 text-center">
              Admin-Bereich
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  placeholder="Admin-Passwort eingeben"
                />
              </div>

              {authError && (
                <p className="text-red-500 text-sm">{authError}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary-500 text-white font-semibold py-3 rounded-xl hover:bg-secondary-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Wird geprüft...' : 'Anmelden'}
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  // Admin dashboard
  return (
    <>
      <Head>
        <title>Admin | Hof Familie Gabathuler</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-primary-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="font-serif text-xl font-bold text-primary-800">
              Admin-Bereich
            </h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Abmelden
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          {/* Save Status */}
          {saveStatus !== 'idle' && (
            <div
              className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white ${
                saveStatus === 'saving'
                  ? 'bg-blue-500'
                  : saveStatus === 'saved'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            >
              {saveStatus === 'saving' && 'Wird gespeichert...'}
              {saveStatus === 'saved' && 'Gespeichert!'}
              {saveStatus === 'error' && 'Fehler beim Speichern'}
            </div>
          )}

          {/* Termine Section */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl font-bold text-primary-800">
                Schlachttermine
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={addTermin}
                  className="text-sm bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg hover:bg-secondary-200"
                >
                  + Termin hinzufügen
                </button>
                <button
                  onClick={saveTermine}
                  className="text-sm bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
                >
                  Speichern
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {termine.map((termin) => (
                <div
                  key={termin.id}
                  className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl"
                >
                  <input
                    type="text"
                    value={termin.name}
                    onChange={(e) => updateTerminName(termin.id, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                  <select
                    value={termin.status}
                    onChange={(e) =>
                      updateTerminStatus(termin.id, e.target.value as 'aktiv' | 'ausverkauft')
                    }
                    className={`px-4 py-2 rounded-lg font-medium ${
                      termin.status === 'aktiv'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <option value="aktiv">Aktiv</option>
                    <option value="ausverkauft">Ausverkauft</option>
                  </select>
                  <button
                    onClick={() => removeTermin(termin.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Löschen"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Preise Section */}
          {preise && (
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl font-bold text-primary-800">
                  Preise
                </h2>
                <button
                  onClick={savePreise}
                  className="text-sm bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
                >
                  Speichern
                </button>
              </div>

              {/* Mischpaket Preis */}
              <div className="mb-8">
                <h3 className="font-semibold text-primary-700 mb-4">Mischpaket</h3>
                <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                  <label className="flex-1 text-primary-600">Preis pro kg</label>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-500">CHF</span>
                    <input
                      type="number"
                      step="0.50"
                      value={preise.mischpaketProKg}
                      onChange={(e) => updatePreis('mischpaketProKg', parseFloat(e.target.value))}
                      className="w-24 px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Einzelpreise */}
              <div>
                <h3 className="font-semibold text-primary-700 mb-4">Einzelpreise (pro kg)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(preise.einzelpreise).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl"
                    >
                      <label className="flex-1 text-primary-600">
                        {fleischstueckeLabels[key] || key}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-primary-500">CHF</span>
                        <input
                          type="number"
                          step="0.50"
                          value={value}
                          onChange={(e) => updatePreis(key, parseFloat(e.target.value))}
                          className="w-24 px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 text-right"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Saisonale Produkte Section */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl font-bold text-primary-800">
                Saisonale Produkte
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={addSaisonalesProdukt}
                  className="text-sm bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg hover:bg-secondary-200"
                >
                  + Produkt hinzufügen
                </button>
                <button
                  onClick={saveSaisonales}
                  className="text-sm bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
                >
                  Speichern
                </button>
              </div>
            </div>

            {saisonales.length === 0 ? (
              <p className="text-primary-500 text-center py-8">
                Noch keine saisonalen Produkte erfasst. Klicken Sie auf &quot;+ Produkt
                hinzufügen&quot;.
              </p>
            ) : (
              <div className="space-y-4">
                {saisonales.map((produkt) => (
                  <div
                    key={produkt.id}
                    className="p-4 bg-primary-50 rounded-xl space-y-3"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={produkt.name}
                        onChange={(e) =>
                          updateSaisonalesProdukt(produkt.id, 'name', e.target.value)
                        }
                        placeholder="Produktname"
                        className="flex-1 px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                      />
                      <select
                        value={produkt.verfuegbar ? 'verfuegbar' : 'nicht_verfuegbar'}
                        onChange={(e) =>
                          updateSaisonalesProdukt(
                            produkt.id,
                            'verfuegbar',
                            e.target.value === 'verfuegbar',
                          )
                        }
                        className={`px-4 py-2 rounded-lg font-medium ${
                          produkt.verfuegbar
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="verfuegbar">Verfügbar</option>
                        <option value="nicht_verfuegbar">Nicht verfügbar</option>
                      </select>
                      <button
                        onClick={() => removeSaisonalesProdukt(produkt.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Löschen"
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
                    <input
                      type="text"
                      value={produkt.beschreibung}
                      onChange={(e) =>
                        updateSaisonalesProdukt(produkt.id, 'beschreibung', e.target.value)
                      }
                      placeholder="Beschreibung (z.B. Frische Kartoffeln aus eigenem Anbau)"
                      className="w-full px-3 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  )
}
