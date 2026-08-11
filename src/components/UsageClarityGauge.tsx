import { Check, Image, Mic, Paperclip, Sparkles } from 'lucide-react'
import type { Quota } from '../types'
import { PanelHeader } from './PanelHeader'

const icons = {
  images: Image,
  uploads: Paperclip,
  voice: Mic,
  thinking: Sparkles,
}

function resetLabel(quota: Quota) {
  if (quota.resetsInDays) return `Resets in ${quota.resetsInDays} days`
  if (quota.resetsInHours === 1) return 'Resets in 1 hour'
  return `Resets in ${quota.resetsInHours} hours`
}

export function UsageClarityGauge({ quotas }: { quotas: Quota[] }) {
  const metered = quotas.filter((quota) => !quota.unlimited)
  const unlimited = quotas.find((quota) => quota.unlimited)

  return (
    <section className="panel-card h-full">
      <PanelHeader
        eyebrow="Usage clarity"
        title="Know what’s available"
        description="Plain-language headroom for features that are actually metered. Demo values only."
        icon={<span className="font-serif text-lg font-bold">%</span>}
      />

      <div className="space-y-5">
        {metered.map((quota) => {
          const Icon = icons[quota.id as keyof typeof icons] ?? Sparkles
          const remaining = Math.max(0, (quota.limit ?? 0) - (quota.used ?? 0))
          const remainingPercent = Math.round((remaining / (quota.limit ?? 1)) * 100)
          return (
            <div key={quota.id}>
              <div className="mb-2.5 flex items-end justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Icon className="shrink-0 text-stone-400" size={16} aria-hidden="true" />
                  <span className="truncate text-sm font-semibold text-stone-700">{quota.label}</span>
                </div>
                <span className="shrink-0 text-xs text-stone-400">{resetLabel(quota)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                <div className="quota-bar h-full rounded-full bg-[#699d7d]" style={{ '--bar-width': `${remainingPercent}%` } as React.CSSProperties} />
              </div>
              <p className="mt-2 text-xs text-stone-500">
                <strong className="font-semibold text-stone-700">{remaining.toLocaleString()} left</strong> of {(quota.limit ?? 0).toLocaleString()}
              </p>
            </div>
          )
        })}
      </div>

      {unlimited && (
        <div className="mt-7 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3.5">
          <div>
            <p className="text-sm font-semibold text-stone-800">{unlimited.label}</p>
            <p className="mt-0.5 text-xs text-stone-500">No text-message gauge needed</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
            Unlimited <Check size={13} strokeWidth={3} />
          </span>
        </div>
      )}
    </section>
  )
}
