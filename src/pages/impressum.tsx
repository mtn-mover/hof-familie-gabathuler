import Layout from '@/components/Layout'
import { ProtectedEmailLink, ProtectedPhoneLink } from '@/components/ProtectedContact'

export default function ImpressumPage() {
  return (
    <Layout title="Impressum" description="Impressum von Hof Familie Gabathuler in Fläsch.">
      <section className="bg-hero-gradient py-20">
        <div className="container-custom text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Impressum</h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8 text-primary-700">
            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">
                Betreiber dieser Website
              </h2>
              <p>
                Hof Familie Gabathuler-Risch
                <br />
                St. Luzi 15
                <br />
                7306 Fläsch
                <br />
                Schweiz
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">Kontakt</h2>
              <p>
                Telefon:{' '}
                <ProtectedPhoneLink className="text-secondary-600 hover:text-secondary-700" />
                <br />
                E-Mail:{' '}
                <ProtectedEmailLink className="text-secondary-600 hover:text-secondary-700" />
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">Haftungsausschluss</h2>
              <p className="leading-relaxed">
                Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die
                Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine
                Gewähr. Preisangaben sind unverbindlich; massgebend ist der bei der Auslieferung
                ermittelte Preis nach tatsächlichem Gewicht.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-primary-800 mb-3">Urheberrecht</h2>
              <p className="leading-relaxed">
                Die auf dieser Website veröffentlichten Inhalte und Bilder unterliegen dem
                Urheberrecht. Eine Verwendung ausserhalb dieser Website ist nur mit vorheriger
                schriftlicher Zustimmung gestattet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
