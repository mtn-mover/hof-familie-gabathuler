import Link from 'next/link'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/produkte', label: 'Produkte' },
  { href: '/hofladen', label: 'Hofladen' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 text-primary-100">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <span className="font-serif text-xl font-bold text-white">
                  Hof Gabathuler
                </span>
              </div>
            </Link>
            <p className="text-primary-300 text-sm leading-relaxed mb-4">
              Frische Produkte aus artgerechter Mutterkuhhaltung.
              Direkt vom Hof zu Ihnen nach Hause.
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-secondary-600/30 px-3 py-1.5 rounded-full">
                <span className="text-secondary-400 text-xs font-medium">
                  Bio Suisse zertifiziert
                </span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Kontakt
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-primary-300">
                  St. Luzi 15<br />
                  7306 Fläsch<br />
                  Graubünden, Schweiz
                </span>
              </div>
              <a
                href="tel:+41813022319"
                className="flex items-center gap-3 text-primary-300 hover:text-secondary-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-secondary-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                081 302 23 19
              </a>
              <a
                href="mailto:jogari@bluewin.ch"
                className="flex items-center gap-3 text-primary-300 hover:text-secondary-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-secondary-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                jogari@bluewin.ch
              </a>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-300 hover:text-secondary-400 transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Öffnungszeiten Hofladen
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-primary-300">
                <span>Montag - Freitag</span>
                <span className="text-white font-medium">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between text-primary-300">
                <span>Samstag</span>
                <span className="text-white font-medium">08:00 - 12:00</span>
              </div>
              <div className="flex justify-between text-primary-300">
                <span>Sonntag</span>
                <span className="text-primary-400">Geschlossen</span>
              </div>
              <div className="pt-3 mt-3 border-t border-primary-700">
                <p className="text-primary-400 text-xs">
                  Oder nach telefonischer Vereinbarung
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-400">
              © {currentYear} Hof Familie Gabathuler. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/impressum"
                className="text-sm text-primary-400 hover:text-secondary-400 transition-colors duration-200"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-sm text-primary-400 hover:text-secondary-400 transition-colors duration-200"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
