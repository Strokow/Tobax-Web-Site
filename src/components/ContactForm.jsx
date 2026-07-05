import { useState } from 'react'

/**
 * Contact / booking form — mailto-based.
 * Composes the message and opens the visitor's own mail client, so no data is
 * sent to any server or third party (covered by the "Anfrage per E-Mail" clause
 * in the Datenschutzerklärung — keeps the privacy-first, no-backend stance).
 * A server-delivered version would need the backend + anti-abuse hardening (TASKS #3/#4).
 */

const CONTACT_EMAIL = 'alextobax@gmail.com'

const TOPICS = [
  { id: 'booking', label: 'Booking', subject: 'Booking inquiry', placeholder: 'Event, date, city, venue, set length, budget…' },
  { id: 'press', label: 'Press', subject: 'Press / interview', placeholder: 'Outlet, angle, deadline, what you need (bio, photos, quotes)…' },
  { id: 'mixes', label: 'Mixes', subject: 'Guest mix / mix request', placeholder: 'Series or show, format, length, deadline…' },
  { id: 'business', label: 'Business', subject: 'Business / other', placeholder: 'Labels, collaborations, remixes, partnerships…' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [topic, setTopic] = useState('booking')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const activeTopic = TOPICS.find((t) => t.id === topic) || TOPICS[0]

  const validate = () => {
    const next = {}
    if (!name.trim()) next.name = 'Please add your name.'
    if (!email.trim()) next.email = 'Please add an email so Tobax can reply.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'That email doesn’t look right.'
    if (!message.trim()) next.message = 'Please write a short message.'
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (company) return // bot filled the honeypot — silently ignore
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const subject = `[Tobax] ${activeTopic.subject} — ${name.trim()}`
    const body = `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}\nTopic: ${activeTopic.label}`
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

  return (
    <div className="contact-layout">
      <div className="contact-aside">
        <p className="contact-lead">
          Bookings, press, guest mixes or business — pick a topic and send a message. It opens in your mail
          app and goes straight to Tobax.
        </p>
        <a className="contact-direct" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        <p className="contact-hint">Prefer email? Write directly — same inbox.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="topic-fieldset">
          <legend className="field-label">Topic</legend>
          <div className="topic-grid" role="radiogroup" aria-label="Contact topic">
            {TOPICS.map((t) => (
              <label key={t.id} className={`topic-option ${topic === t.id ? 'is-active' : ''}`}>
                <input
                  type="radio"
                  name="topic"
                  value={t.id}
                  checked={topic === t.id}
                  onChange={() => setTopic(t.id)}
                />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label className="field-label" htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            className={`field-input ${errors.name ? 'has-error' : ''}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
          />
          {errors.name && <span className="field-error" id="cf-name-err">{errors.name}</span>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            className={`field-input ${errors.email ? 'has-error' : ''}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
          />
          {errors.email && <span className="field-error" id="cf-email-err">{errors.email}</span>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            className={`field-input field-textarea ${errors.message ? 'has-error' : ''}`}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={activeTopic.placeholder}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'cf-message-err' : undefined}
          />
          {errors.message && <span className="field-error" id="cf-message-err">{errors.message}</span>}
        </div>

        {/* honeypot — hidden from humans, catches bots */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="cf-company">Company</label>
          <input
            id="cf-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="contact-actions">
          <button type="submit" className="btn btn--primary">Send message</button>
          <p className="contact-consent">
            By sending, your message and contact details are used only to handle your inquiry — see the{' '}
            <a href="/datenschutzerklaerung">Datenschutzerklärung</a>.
          </p>
        </div>

        {sent && (
          <p className="contact-success" role="status">
            ✓ Your mail app should open with the message ready. If nothing happens, write directly to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        )}
      </form>
    </div>
  )
}
