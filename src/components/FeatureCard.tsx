import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  href?: string
  linkText?: string
  delay?: number
}

export default function FeatureCard({
  icon,
  title,
  description,
  href,
  linkText = 'Mehr erfahren',
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="card card-hover group"
    >
      {/* Icon Container */}
      <div className="w-14 h-14 bg-secondary-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary-100 transition-colors duration-300">
        <div className="w-7 h-7 text-secondary-600">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">
        {title}
      </h3>
      <p className="text-primary-600 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Link */}
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-secondary-600 font-medium text-sm group/link"
        >
          <span className="relative">
            {linkText}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-500 transition-all duration-300 group-hover/link:w-full" />
          </span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      )}
    </motion.div>
  )
}
