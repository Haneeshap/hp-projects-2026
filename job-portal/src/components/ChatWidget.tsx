import React, { useEffect, useRef, useState } from 'react'
import { ChatMessage, getMessages, addMessage, clearMessages } from '../utils/chat'

function genId() {
  return 'm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function generateBotReply(userText: string) {
  const t = (userText || '').toLowerCase()
  if (t.includes('resume')) return "I can review your resume — open Resume Builder and click 'Run Review'."
  if (t.includes('match') || t.includes('jobs') || t.includes('job')) return "I can find matching jobs for your resume — open Resume Builder and run AI Job Matches."
  if (t.includes('help')) return 'Tell me what you want: review resume, match jobs, or track applications.'
  return `Thanks — I heard: "${userText}". Try asking for resume review or job matches.`
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // load messages from local storage
    try {
      const ms = getMessages()
      setMessages(ms)
    } catch (e) {
      setMessages([])
    }
  }, [])

  useEffect(() => {
    // scroll to bottom
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  function postUserMessage(txt: string) {
    const m: ChatMessage = { id: genId(), sender: 'user', text: txt, ts: new Date().toISOString() }
    try { addMessage(m) } catch (e) {}
    setMessages((s) => [...s, m])
    setText('')
    setSending(true)

    // local bot reply (simulate async)
    const replyText = generateBotReply(txt)
    setTimeout(() => {
      const bot: ChatMessage = { id: genId(), sender: 'bot', text: replyText, ts: new Date().toISOString() }
      try { addMessage(bot) } catch (e) {}
      setMessages((s) => [...s, bot])
      setSending(false)
    }, 400)
  }

  function handleSend(e?: React.FormEvent) {
    e?.preventDefault()
    const val = text.trim()
    if (!val) return
    postUserMessage(val)
  }

  function handleClear() {
    if (!confirm('Clear chat history?')) return
    try { clearMessages() } catch (e) {}
    setMessages([])
  }

  return (
    <div className="border rounded p-3 bg-white max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">In-app Chat</h3>
        <div className="flex items-center gap-2">
          <button onClick={handleClear} className="px-2 py-1 border rounded text-sm">Clear</button>
        </div>
      </div>

      <div ref={listRef} style={{ maxHeight: 300, overflow: 'auto' }} className="space-y-2 mb-3">
        {messages.map((m) => (
          <div key={m.id} className={`p-2 rounded ${m.sender === 'user' ? 'bg-indigo-50 text-right' : 'bg-gray-50'}`}>
            <div className="text-sm">{m.text}</div>
            <div className="text-xs text-slate-400 mt-1">{new Date(m.ts).toLocaleString()}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message the assistant..." className="flex-1 border p-2 rounded" />
        <button type="submit" disabled={sending} className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
      </form>
    </div>
  )
}
