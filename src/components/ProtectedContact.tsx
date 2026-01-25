import { useState, useEffect } from 'react'

// Obfuscated contact data - crawlers can't easily parse this
const EMAIL_PARTS = ['jogari', 'outlook', 'ch']
const PHONE_PARTS = ['081', '302', '23', '19']

export function useProtectedEmail() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Build email only on client-side
    setEmail(`${EMAIL_PARTS[0]}@${EMAIL_PARTS[1]}.${EMAIL_PARTS[2]}`)
  }, [])

  return email
}

export function useProtectedPhone() {
  const [phone, setPhone] = useState('')
  const [phoneLink, setPhoneLink] = useState('')

  useEffect(() => {
    // Build phone only on client-side
    const formatted = PHONE_PARTS.join(' ')
    const link = `+41${PHONE_PARTS.join('')}`
    setPhone(formatted)
    setPhoneLink(link)
  }, [])

  return { phone, phoneLink }
}

type ProtectedEmailLinkProps = {
  className?: string
  children?: React.ReactNode
}

export function ProtectedEmailLink({ className, children }: ProtectedEmailLinkProps) {
  const email = useProtectedEmail()

  if (!email) {
    return <span className={className}>{children || '...'}</span>
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {children || email}
    </a>
  )
}

type ProtectedPhoneLinkProps = {
  className?: string
  children?: React.ReactNode
}

export function ProtectedPhoneLink({ className, children }: ProtectedPhoneLinkProps) {
  const { phone, phoneLink } = useProtectedPhone()

  if (!phone) {
    return <span className={className}>{children || '...'}</span>
  }

  return (
    <a href={`tel:${phoneLink}`} className={className}>
      {children || phone}
    </a>
  )
}
