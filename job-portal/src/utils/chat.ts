export type ChatMessage = { id: string; sender: 'user' | 'bot'; text: string; ts: string }

const KEY = 'app_chat_messages'

export function getMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ChatMessage[]) : []
  } catch (e) {
    return []
  }
}

export function addMessage(msg: ChatMessage) {
  try {
    const cur = getMessages()
    cur.push(msg)
    localStorage.setItem(KEY, JSON.stringify(cur))
  } catch (e) {}
}

export function clearMessages() {
  try { localStorage.removeItem(KEY) } catch (e) {}
}
