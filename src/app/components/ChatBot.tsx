'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'What are your top skills?',
  'Tell me about the Gezira project',
  'What tools do you use?',
  'How can I contact you?',
]

const BOT_AVATAR = (
  <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
    <circle cx="16" cy="16" r="16" fill="#10b981" opacity="0.15" />
    <circle cx="16" cy="16" r="10" fill="#10b981" opacity="0.25" />
    <path d="M10 16a6 6 0 0 1 12 0" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="13" cy="14" r="1.2" fill="#10b981" />
    <circle cx="19" cy="14" r="1.2" fill="#10b981" />
    <rect x="13" y="7" width="6" height="2.5" rx="1.25" fill="#10b981" opacity="0.6" />
    <line x1="16" y1="7" x2="16" y2="9.5" stroke="#10b981" strokeWidth="1.2" />
  </svg>
)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [open, messages.length])

  const sendMessage = useCallback(async (text: string) => {
    const userMsg = text.trim()
    if (!userMsg || loading) return

    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)
    setStreamingText('')

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        full += chunk
        setStreamingText(full)
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: full }])
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
        ])
      }
    } finally {
      setLoading(false)
      setStreamingText('')
      abortRef.current = null
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, loading])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleClose = () => {
    abortRef.current?.abort()
    setOpen(false)
  }

  const clearChat = () => {
    abortRef.current?.abort()
    setMessages([])
    setStreamingText('')
    setLoading(false)
    setInput('')
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with AI about Osman'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9000,
          boxShadow: '0 4px 24px rgba(16,185,129,0.45)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#fff" strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#fff" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '144px',
              right: '24px',
              width: 'min(380px, calc(100vw - 32px))',
              height: 'min(540px, calc(100vh - 180px))',
              zIndex: 8999,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(7, 12, 20, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(16,185,129,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.08)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 16px',
              borderBottom: '1px solid rgba(16,185,129,0.12)',
              flexShrink: 0,
            }}>
              {BOT_AVATAR}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: '#edf0f8', lineHeight: 1.2 }}>
                  Ask about Osman
                </p>
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  Powered by Llama 3.3
                </p>
              </div>
              <button
                onClick={clearChat}
                aria-label="Clear conversation"
                title="Clear conversation"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#6b7a99', padding: '4px', borderRadius: '6px',
                  display: 'flex', alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#edf0f8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7a99')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(16,185,129,0.2) transparent',
            }}>
              {messages.length === 0 && !loading && (
                <div style={{ textAlign: 'center', paddingTop: '12px' }}>
                  <div style={{ marginBottom: '6px' }}>{BOT_AVATAR}</div>
                  <p style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 600, color: '#edf0f8' }}>
                    Hi! I&apos;m Osman&apos;s AI assistant
                  </p>
                  <p style={{ margin: '0 0 18px', fontSize: '0.78rem', color: '#6b7a99', lineHeight: 1.5 }}>
                    Ask me anything about his projects, skills, or background.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        style={{
                          background: 'rgba(16,185,129,0.07)',
                          border: '1px solid rgba(16,185,129,0.2)',
                          borderRadius: '10px',
                          padding: '9px 14px',
                          color: '#a8b8d0',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          fontFamily: 'inherit',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(16,185,129,0.14)'
                          e.currentTarget.style.color = '#edf0f8'
                          e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(16,185,129,0.07)'
                          e.currentTarget.style.color = '#a8b8d0'
                          e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)'
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(16,185,129,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '12px' }}>🤖</span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px 14px 14px 14px',
                    padding: '10px 14px',
                    maxWidth: '80%',
                  }}>
                    {streamingText ? (
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#edf0f8', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {streamingText}
                        <span style={{
                          display: 'inline-block',
                          width: '2px', height: '14px',
                          background: '#10b981',
                          marginLeft: '2px',
                          verticalAlign: 'middle',
                          animation: 'blink 1s step-end infinite',
                        }} />
                      </p>
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div style={{
              padding: '12px 14px',
              borderTop: '1px solid rgba(16,185,129,0.1)',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-end',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '14px',
                padding: '8px 8px 8px 14px',
                transition: 'border-color 0.2s',
              }}
                onFocusCapture={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
                onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)')}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything…"
                  rows={1}
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#edf0f8',
                    fontSize: '0.84rem',
                    resize: 'none',
                    lineHeight: 1.5,
                    maxHeight: '96px',
                    overflowY: 'auto',
                    fontFamily: 'inherit',
                    caretColor: '#10b981',
                  }}
                  onInput={(e) => {
                    const el = e.currentTarget
                    el.style.height = 'auto'
                    el.style.height = Math.min(el.scrollHeight, 96) + 'px'
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: input.trim() && !loading ? '#10b981' : 'rgba(16,185,129,0.15)',
                    border: 'none',
                    cursor: input.trim() && !loading ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, transform 0.1s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (input.trim() && !loading)
                      e.currentTarget.style.transform = 'scale(1.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke={input.trim() && !loading ? '#070c14' : '#10b981'}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '0.68rem', color: '#3d4f6b', textAlign: 'center' }}>
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'flex-start',
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}>
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(16,185,129,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '12px' }}>🤖</span>
        </div>
      )}
      <div style={{
        maxWidth: '80%',
        background: isUser
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : 'rgba(255,255,255,0.05)',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: isUser ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
        padding: '10px 14px',
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.84rem',
          color: isUser ? '#070c14' : '#edf0f8',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          fontWeight: isUser ? 600 : 400,
        }}>
          {msg.content}
        </p>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'inline-block',
            animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            opacity: 0.4,
          }}
        />
      ))}
      <style>{`
        @keyframes typing-dot {
          0%,80%,100%{transform:scale(0.7);opacity:0.4}
          40%{transform:scale(1);opacity:1}
        }
      `}</style>
    </div>
  )
}
