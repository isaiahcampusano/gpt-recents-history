import { ArrowRight, Check, Info, MessageSquareText, RefreshCw, X } from 'lucide-react'
import { useState } from 'react'
import type { ActiveConversation } from '../types'
import { PanelHeader } from './PanelHeader'

const healthCopy = {
  green: { label: 'Fresh', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  yellow: { label: 'Getting long', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  red: { label: 'Start fresh', color: 'bg-rose-100 text-rose-700', dot: 'bg-rose-500' },
}

export function ConversationHealthCard({ conversation }: { conversation: ActiveConversation }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [completed, setCompleted] = useState(false)
  const health = healthCopy[conversation.healthState]
  const tokenProgress = Math.min(100, Math.round((conversation.estimatedTokens / 80000) * 100))

  function confirmStartFresh() {
    setShowConfirm(false)
    setCompleted(true)
    window.setTimeout(() => setCompleted(false), 4500)
  }

  return (
    <section className="panel-card h-full">
      <PanelHeader
        eyebrow="Conversation health"
        title="This chat’s context"
        description="Scoped only to the conversation you have open—not your account or old chats."
        icon={<MessageSquareText size={19} />}
      />

      <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-stone-400">Active conversation</p>
            <h3 className="mt-1 font-semibold text-stone-800">{conversation.title}</h3>
          </div>
          <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${health.color}`}>
            <span className={`size-1.5 rounded-full ${health.dot}`} />{health.label}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-stone-100">
            <p className="text-xl font-bold tracking-tight text-stone-800">~{Math.round(conversation.estimatedTokens / 1000)}k</p>
            <p className="mt-1 text-xs text-stone-400">estimated tokens</p>
          </div>
          <div className="rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-stone-100">
            <p className="text-xl font-bold tracking-tight text-stone-800">{conversation.messageCount}</p>
            <p className="mt-1 text-xs text-stone-400">messages</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-[11px] font-medium text-stone-400"><span>Fresh</span><span>Long</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-200/70">
            <div className="h-full rounded-full bg-amber-400" style={{ width: `${tokenProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="my-5 flex gap-3 rounded-xl bg-amber-50 px-4 py-3.5 text-sm leading-5 text-amber-950/75">
        <Info className="mt-0.5 shrink-0 text-amber-600" size={16} />
        <p>
          Longer chats can lose track of earlier details. This is a known model limitation, not a bug in your account.{' '}
          <a className="font-semibold underline decoration-amber-300 underline-offset-2 hover:text-amber-950" href="https://www.trychroma.com/research/context-rot" target="_blank" rel="noreferrer">See the research</a>.
        </p>
      </div>

      <button className="primary-button w-full" onClick={() => setShowConfirm(true)}>
        <RefreshCw size={16} /> Summarize &amp; start fresh <ArrowRight className="ml-auto" size={16} />
      </button>
      <p className="mt-3 text-center text-[11px] text-stone-400">Demo action · no conversation data is sent</p>

      {showConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/30 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="fresh-title">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><RefreshCw size={20} /></div>
              <button className="icon-button" aria-label="Close" onClick={() => setShowConfirm(false)}><X size={18} /></button>
            </div>
            <h3 id="fresh-title" className="mt-5 font-serif text-2xl font-semibold text-stone-900">Carry the important parts forward?</h3>
            <p className="mt-2 text-sm leading-6 text-stone-500">In a real product, this would create a short summary and open it in a fresh conversation. This demo won’t read or change any chat.</p>
            <div className="mt-6 flex gap-3">
              <button className="secondary-button flex-1" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="primary-button flex-1 justify-center" onClick={confirmStartFresh}>Try demo</button>
            </div>
          </div>
        </div>
      )}

      {completed && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-xl" role="status">
          <span className="grid size-5 place-items-center rounded-full bg-emerald-400 text-stone-900"><Check size={13} strokeWidth={3} /></span>
          Demo summary ready for a fresh chat
        </div>
      )}
    </section>
  )
}
