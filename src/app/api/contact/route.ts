import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, subject, message } = body as Record<string, string>

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Graceful degradation: log and return success so UX never breaks
    console.warn('[contact] RESEND_API_KEY not set — email not sent')
    return NextResponse.json({ success: true })
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
      <div style="border-left:4px solid #10b981;padding:0 0 0 20px;margin-bottom:28px;">
        <h2 style="margin:0 0 4px;color:#10b981;font-size:1.2rem;">New Portfolio Inquiry</h2>
        <p style="margin:0;color:#6b7280;font-size:0.85rem;">via osman-geomatics.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:8px 0;color:#6b7280;font-size:0.85rem;width:120px;vertical-align:top;">Name</td>
            <td style="padding:8px 0;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:0.85rem;vertical-align:top;">Email</td>
            <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#10b981;">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:0.85rem;vertical-align:top;">Organization</td>
            <td style="padding:8px 0;">${company || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:0.85rem;vertical-align:top;">Subject</td>
            <td style="padding:8px 0;font-weight:600;">${subject}</td></tr>
      </table>
      <div style="background:#f9fafb;border-left:3px solid #10b981;border-radius:4px;padding:16px 20px;margin-bottom:28px;">
        <p style="margin:0;color:#374151;line-height:1.75;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>
      <p style="font-size:0.78rem;color:#9ca3af;margin:0;">
        Hit reply to respond directly to ${name} at ${email}.
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Osman Ibrahim Portfolio <contact@osman-geomatics93.online>',
      to: ['osmangeomatics93@gmail.com'],
      reply_to: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('[contact] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
