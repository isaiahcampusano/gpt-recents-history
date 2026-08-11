import { useMemo, useState } from 'react'
import { Code2 } from 'lucide-react'
import quotasData from './mock/quotas.json'
import conversationData from './mock/activeConversation.json'
import memoriesData from './mock/memories.json'
import { SessionClarityScore } from './components/SessionClarityScore'
import { UsageClarityGauge } from './components/UsageClarityGauge'
import { ConversationHealthCard } from './components/ConversationHealthCard'
import { MemoryHygienePanel } from './components/MemoryHygienePanel'
import type { ActiveConversation, MemoryFixture, Quota, SavedMemory } from './types'

const quotas = quotasData as Quota[]
const conversation = conversationData as ActiveConversation
const initialMemories = memoriesData as MemoryFixture

export default function App() {
  const [memories, setMemories] = useState<SavedMemory[]>(initialMemories.savedMemories)
  const [referenceEnabled, setReferenceEnabled] = useState(initialMemories.referenceChatHistoryEnabled)

  const quotaScore = useMemo(() => {
    const metered = quotas.filter((quota) => !quota.unlimited && quota.limit)
    return Math.round(metered.reduce((total, quota) => total + Math.max(0, ((quota.limit ?? 0) - (quota.used ?? 0)) / (quota.limit ?? 1) * 100), 0) / metered.length)
  }, [])

  const flaggedCount = memories.filter((memory) => memory.flag).length
  const healthScore = conversation.healthState === 'green' ? 100 : conversation.healthState === 'yellow' ? 68 : 35
  const memoryScore = Math.max(0, 100 - flaggedCount * 15)
  const clarityScore = Math.round(quotaScore * 0.7 + healthScore * 0.25 + memoryScore * 0.05)

  return (
    <div className="min-h-screen">
      <nav className="border-b border-stone-200/80 bg-[#f7f7f2]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Context Clarity home">
            <span className="grid size-8 place-items-center rounded-xl bg-[#263a30] text-sm font-bold text-white">C</span>
            <span className="font-serif text-lg font-semibold tracking-tight text-stone-800">Context Clarity</span>
          </a>
          <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-stone-500 shadow-sm">Concept demo</span>
        </div>
      </nav>

      <main id="top" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <SessionClarityScore score={clarityScore} quotaScore={quotaScore} flaggedCount={flaggedCount} />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <UsageClarityGauge quotas={quotas} />
          <ConversationHealthCard conversation={conversation} />
        </div>

        <div className="mt-6">
          <MemoryHygienePanel memories={memories} setMemories={setMemories} referenceEnabled={referenceEnabled} setReferenceEnabled={setReferenceEnabled} />
        </div>

        <section id="score-method" className="mt-6 rounded-2xl border border-dashed border-stone-300 px-5 py-4 text-xs leading-5 text-stone-500 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p><strong className="text-stone-700">About the score:</strong> 70% quota headroom, 25% current-conversation health, and 5% memory hygiene. It reflects this demo session—not lifetime account health.</p>
          <a className="mt-2 inline-flex shrink-0 items-center gap-2 font-semibold text-stone-700 hover:text-stone-950 sm:mt-0" href="https://github.com/isaiahcampusano/gpt-recents-history" target="_blank" rel="noreferrer"><Code2 size={15} /> View repository</a>
        </section>
      </main>

      <footer className="border-t border-stone-200/80 px-5 py-7 text-center text-xs text-stone-400">
        Mock data only · Not an official OpenAI product · No account data is accessed
      </footer>
    </div>
  )
}
