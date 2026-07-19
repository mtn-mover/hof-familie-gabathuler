import Layout from '@/components/Layout'
import { ProtectedEmailLink } from '@/components/ProtectedContact'

export default function DatenschutzPage() {
  return (
    <Layout
      title="Datenschutz"
      description="Datenschutzerklärung von Hof Familie Gabathuler in Fläsch."
    >
      <section className="bg-hero-gradient py-20">
        <div className="container-custom text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8 text-primary-700">
            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">
                Verantwortliche Stelle
              </h2>
              <p>
                Hof Familie Gabathuler-Risch
                <br />
                St. Luzi 15
                <br />
                7306 Fläsch
                <br />
                E-Mail:{' '}
                <ProtectedEmailLink className="text-secondary-600 hover:text-secondary-700" />
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">
                Welche Daten wir erheben
              </h2>
              <p className="leading-relaxed">
                Wenn Sie unser Bestell- oder Kontaktformular verwenden, erheben wir die von Ihnen
                angegebenen Daten: Name, Adresse, Telefonnummer, E-Mail-Adresse sowie den Inhalt
                Ihrer Bestellung bzw. Nachricht. Diese Daten verwenden wir ausschliesslich zur
                Bearbeitung Ihrer Bestellung oder Anfrage. Es erfolgt keine Weitergabe zu
                Werbezwecken und kein Verkauf an Dritte.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">
                Cookies und Tracking
              </h2>
              <p className="leading-relaxed">
                Diese Website verwendet keine Analyse- oder Werbe-Cookies und kein
                Besucher-Tracking.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">Dienstleister</h2>
              <p className="leading-relaxed">
                Für den Betrieb der Website setzen wir technische Dienstleister ein, die Daten in
                unserem Auftrag verarbeiten: Vercel (Hosting), Resend (E-Mail-Versand) und Upstash
                (Datenspeicherung). Auf der Kontaktseite ist eine Karte von Google Maps eingebettet;
                beim Aufruf dieser Seite kann Google Daten wie Ihre IP-Adresse erfassen.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">Speicherdauer</h2>
              <p className="leading-relaxed">
                Wir bewahren Ihre Daten nur so lange auf, wie es für die Bearbeitung Ihrer
                Bestellung oder Anfrage sowie zur Erfüllung gesetzlicher Pflichten erforderlich
                ist.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">Ihre Rechte</h2>
              <p className="leading-relaxed">
                Sie haben jederzeit das Recht auf Auskunft über Ihre bei uns gespeicherten Daten
                sowie auf deren Berichtigung oder Löschung. Wenden Sie sich dazu einfach per E-Mail
                an uns.
              </p>
            </div>

            <p className="text-sm text-primary-500">Stand: Juli 2026</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
