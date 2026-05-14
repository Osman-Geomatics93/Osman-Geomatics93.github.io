'use client'

import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'

const inputStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  padding: '12px 16px',
  color: '#e8f0fe',
  fontSize: '0.9rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  fontFamily: 'inherit',
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error || 'Request failed')
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Contact form error:', err)
      setError('Failed to send. Please email me directly at osmangeomatics93@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focusedField === name ? 'var(--accent)' : 'var(--border)',
  })

  return (
    <>
      <Nav activePage="contact" />

      <main style={{ paddingTop: '64px' }}>
        {/* ===================== HERO ===================== */}
        <section
          className="dot-grid resp-section"
          style={{ backgroundColor: 'var(--bg)', padding: '0 24px 80px' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p className="section-label">Contact</p>
            <h1
              className="font-display font-extrabold"
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: 'var(--text-1)',
                lineHeight: 1.1,
                marginTop: '16px',
              }}
            >
              Get In Touch
            </h1>
            <p
              style={{
                color: 'var(--text-2)',
                maxWidth: '520px',
                marginTop: '16px',
                lineHeight: 1.7,
                fontSize: '1rem',
              }}
            >
              Open to research collaborations, consulting engagements, and full-time positions
              in remote sensing, GIS, and geospatial data science. Let&apos;s connect.
            </p>
          </div>
        </section>

        {/* ===================== FORM + DETAILS ===================== */}
        <section
          style={{
            padding: '0 24px 128px',
            backgroundColor: 'var(--bg)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'flex-start',
            }}
            className="lg:grid-cols-2"
          >
            {/* ---- CONTACT FORM ---- */}
            <div>
              <h2
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-1)',
                  marginBottom: '28px',
                }}
              >
                Send a Message
              </h2>

              {isSubmitted ? (
                <div
                  style={{
                    backgroundColor: 'var(--accent-dim)',
                    border: '1px solid var(--accent-border)',
                    borderRadius: '6px',
                    padding: '32px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle size={40} style={{ color: 'var(--accent)', margin: '0 auto 16px' }} />
                  <h3
                    className="font-display"
                    style={{ color: 'var(--text-1)', fontSize: '1.1rem', marginBottom: '8px' }}
                  >
                    Message Sent
                  </h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Thank you for reaching out. I&apos;ll respond within 1–2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: '', email: '', company: '', subject: '', message: '' })
                    }}
                    style={{
                      marginTop: '20px',
                      fontSize: '0.85rem',
                      color: 'var(--accent)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label htmlFor="name" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'block', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        style={fieldStyle('name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'block', marginBottom: '6px' }}>
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane@org.com"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        style={fieldStyle('email')}
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'block', marginBottom: '6px' }}>
                      Organization / Institution
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="FAO, university, company..."
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      style={fieldStyle('company')}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'block', marginBottom: '6px' }}>
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...fieldStyle('subject'),
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="" style={{ backgroundColor: 'var(--bg-card)' }}>Select a topic...</option>
                      <option value="Research Collaboration" style={{ backgroundColor: 'var(--bg-card)' }}>Research Collaboration</option>
                      <option value="Consulting / Freelance" style={{ backgroundColor: 'var(--bg-card)' }}>Consulting / Freelance</option>
                      <option value="Full-time Position" style={{ backgroundColor: 'var(--bg-card)' }}>Full-time Position</option>
                      <option value="Training / Workshop" style={{ backgroundColor: 'var(--bg-card)' }}>Training / Workshop</option>
                      <option value="Other" style={{ backgroundColor: 'var(--bg-card)' }}>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={{ fontSize: '0.8rem', color: 'var(--text-3)', display: 'block', marginBottom: '6px' }}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Describe your project, role, or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...fieldStyle('message'),
                        resize: 'vertical',
                        minHeight: '140px',
                      }}
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        fontSize: '0.85rem',
                        color: '#fca5a5',
                      }}
                    >
                      <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: isSubmitting ? 'var(--accent-hover)' : 'var(--accent)',
                      color: '#070c14',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      padding: '13px 28px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                      opacity: isSubmitting ? 0.8 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        const el = e.currentTarget as HTMLElement
                        el.style.backgroundColor = 'var(--accent-hover)'
                        el.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.backgroundColor = isSubmitting ? 'var(--accent-hover)' : 'var(--accent)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <Send size={16} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* ---- CONTACT DETAILS ---- */}
            <div>
              <h2
                className="font-display"
                style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '28px' }}
              >
                Contact Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { Icon: Mail, label: 'Email', value: 'osmangeomatics93@gmail.com', href: 'mailto:osmangeomatics93@gmail.com' },
                  { Icon: Phone, label: 'Phone', value: '+90 531 946 44 05', href: 'tel:+905319464405' },
                  { Icon: MapPin, label: 'Location', value: 'Trabzon, Turkey', href: undefined },
                ].map(({ Icon, label, value, href }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '18px 20px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--accent-dim)',
                        border: '1px solid var(--accent-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontWeight: 500, transition: 'color 0.2s ease' }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-1)', fontWeight: 500 }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div style={{ marginTop: '28px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Connect Online
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/osman-ibrahim-a02a9a197/' },
                    { Icon: Github, label: 'GitHub', href: 'https://github.com/Osman-Geomatics93' },
                  ].map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        color: 'var(--text-2)',
                        transition: 'border-color 0.2s ease, color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'var(--accent)'
                        el.style.color = 'var(--accent)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'var(--border)'
                        el.style.color = 'var(--text-2)'
                      }}
                    >
                      <Icon size={16} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability note */}
              <div
                style={{
                  marginTop: '28px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--accent)',
                  borderRadius: '6px',
                  padding: '20px 24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)' }}>
                    Available for New Opportunities
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                  Currently open to research positions, consulting projects, and full-time roles
                  in remote sensing, GIS, and geospatial data science. Response time: 1–2 business days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
