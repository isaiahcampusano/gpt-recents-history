import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  description: string
  icon: ReactNode
}

export function PanelHeader({ eyebrow, title, description, icon }: Props) {
  return (
    <header className="mb-7 flex items-start gap-4">
      <div className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-stone-100 text-stone-700">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">{eyebrow}</p>
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900">{title}</h2>
        <p className="mt-1 max-w-xl text-sm leading-6 text-stone-500">{description}</p>
      </div>
    </header>
  )
}
