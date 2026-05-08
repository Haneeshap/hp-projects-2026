import React from 'react'
import ChatWidget from '../components/ChatWidget'

export default function Chat(): JSX.Element {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4">Assistant Chat</h1>
      <ChatWidget />
    </div>
  )
}
