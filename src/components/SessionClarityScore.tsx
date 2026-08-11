import { ArrowUpRight, Sparkles } from 'lucide-react'

type Props = {
  score: number
  quotaScore: number
  flaggedCount: number
}

export function SessionClarityScore({ score, quotaScore, flaggedCount }: Props) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference * (1 - score / 100)

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-[#1f2d27] px-6 py-7 text-white shadow-[0_24px_70px_rgba(27,42,34,0.16)] sm:px-9 sm:py-9">
      <div className="absolute -right-16 -top-24 size-72 rounded-full border border-white/10" />
      <div className="absolute -right-5 -top-10 size-44 rounded-full border border-white/10" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-semibold text-emerald-100">
            <Sparkles size={14} aria-hidden="true" />
            This session, right now
          </div>
          <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Your AI context,<br />made clear.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            A transparent view of feature headroom, this conversation’s context, and the memories used to personalize future chats.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/55">
            <span><strong className="mr-1.5 text-white">{quotaScore}%</strong>avg. quota left</span>
            <span><strong className="mr-1.5 text-white">{flaggedCount}</strong>memory suggestions</span>
            <a href="#score-method" className="inline-flex items-center gap-1 font-semibold text-emerald-200 hover:text-emerald-100">
              How it’s calculated <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="relative mx-auto size-40 lg:mr-4">
          <svg className="size-full -rotate-90" viewBox="0 0 128 128" role="img" aria-label={`Session clarity score: ${score} out of 100`}>
            <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="8" />
            <circle cx="64" cy="64" r="54" fill="none" stroke="#9de6bd" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="score-ring" />
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <div><span className="font-serif text-5xl font-semibold tracking-tight">{score}</span><span className="text-lg text-white/45">%</span></div>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.17em] text-emerald-200">Clear</span>
          </div>
        </div>
      </div>
    </section>
  )
}
