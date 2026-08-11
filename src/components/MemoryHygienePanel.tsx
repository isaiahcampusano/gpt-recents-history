import { AlertTriangle, Check, Edit3, History, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import type { SavedMemory } from '../types'
import { PanelHeader } from './PanelHeader'

type Props = {
  memories: SavedMemory[]
  setMemories: React.Dispatch<React.SetStateAction<SavedMemory[]>>
  referenceEnabled: boolean
  setReferenceEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export function MemoryHygienePanel({ memories, setMemories, referenceEnabled, setReferenceEnabled }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)
  const flaggedCount = memories.filter((memory) => memory.flag).length

  function startEditing(memory: SavedMemory) {
    setEditingId(memory.id)
    setDraft(memory.text)
  }

  function saveEdit() {
    if (!draft.trim() || !editingId) return
    setMemories((items) => items.map((item) => item.id === editingId ? { ...item, text: draft.trim(), flag: null } : item))
    setEditingId(null)
  }

  function addMemory() {
    if (!draft.trim()) return
    setMemories((items) => [...items, { id: `m-${Date.now()}`, text: draft.trim(), createdAt: new Date().toISOString().slice(0, 10), flag: null }])
    setAdding(false)
    setDraft('')
  }

  return (
    <section className="panel-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PanelHeader
          eyebrow="Memory hygiene"
          title="What carries forward"
          description="Saved details and chat-history insights can personalize future conversations. You stay in control."
          icon={<History size={19} />}
        />
        <button className="secondary-button" onClick={() => { setAdding(true); setDraft('') }}><Plus size={15} /> Add memory</button>
      </div>

      <div className="mb-6 flex items-center justify-between gap-5 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-stone-800">Reference chat history</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${referenceEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-500'}`}>{referenceEnabled ? 'On' : 'Off'}</span>
          </div>
          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-stone-500">Allows insights from past conversations to personalize responses. This is distinct from the saved memories listed below.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={referenceEnabled}
          aria-label="Reference chat history"
          onClick={() => setReferenceEnabled((value) => !value)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${referenceEnabled ? 'bg-[#46725a]' : 'bg-stone-300'}`}
        >
          <span className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform ${referenceEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400">Saved memories · {memories.length}</p>
        {flaggedCount > 0 && <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700"><AlertTriangle size={13} /> {flaggedCount} suggestions</p>}
      </div>

      <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200">
        {memories.length === 0 && <p className="p-8 text-center text-sm text-stone-400">No saved memories in this demo.</p>}
        {memories.map((memory) => (
          <div key={memory.id} className="group flex items-start gap-4 p-4 sm:p-5">
            <div className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${memory.flag ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-700'}`}>
              {memory.flag ? <AlertTriangle size={14} /> : <Check size={14} strokeWidth={2.5} />}
            </div>
            <div className="min-w-0 flex-1">
              {editingId === memory.id ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input className="text-input flex-1" value={draft} onChange={(event) => setDraft(event.target.value)} autoFocus onKeyDown={(event) => event.key === 'Enter' && saveEdit()} />
                  <div className="flex gap-2"><button className="small-button" onClick={saveEdit}>Save</button><button className="icon-button" aria-label="Cancel editing" onClick={() => setEditingId(null)}><X size={16} /></button></div>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium leading-6 text-stone-700">{memory.text}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
                    <span>Saved {new Date(`${memory.createdAt}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    {memory.flag && <span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold capitalize text-amber-700">Review: {memory.flag}</span>}
                  </div>
                </>
              )}
            </div>
            {editingId !== memory.id && (
              <div className="flex shrink-0 gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                <button className="icon-button" aria-label={`Edit ${memory.text}`} onClick={() => startEditing(memory)}><Edit3 size={15} /></button>
                <button className="icon-button hover:!text-rose-600" aria-label={`Delete ${memory.text}`} onClick={() => setMemories((items) => items.filter((item) => item.id !== memory.id))}><Trash2 size={15} /></button>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-stone-400">Suggestions are never applied automatically. Review each memory before editing or deleting it.</p>

      {adding && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/30 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="add-memory-title">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between"><h3 id="add-memory-title" className="font-serif text-2xl font-semibold text-stone-900">Add a saved memory</h3><button className="icon-button" aria-label="Close" onClick={() => setAdding(false)}><X size={18} /></button></div>
            <p className="mt-2 text-sm leading-6 text-stone-500">Add something useful for future conversations. This stays only in the demo’s temporary state.</p>
            <textarea className="text-input mt-5 min-h-28 w-full resize-none" placeholder="For example: Prefers weekend travel options" value={draft} onChange={(event) => setDraft(event.target.value)} autoFocus />
            <div className="mt-5 flex gap-3"><button className="secondary-button flex-1 justify-center" onClick={() => setAdding(false)}>Cancel</button><button className="primary-button flex-1 justify-center" onClick={addMemory}>Add memory</button></div>
          </div>
        </div>
      )}
    </section>
  )
}
