// DashboardCard is a functional React component.
// Components are reusable pieces of UI that you can import and use anywhere.
const DashboardCard = () => {
  // It returns JSX, which looks like HTML but works inside JavaScript.
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200/10 bg-slate-950/95 p-6 shadow-[0_35px_120px_-30px_rgba(15,23,42,0.8)] ring-1 ring-slate-700/40 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5h3.75l2.25 3 2.25-3H18" />
                <path d="M5.25 10.5V7.5A3 3 0 0 1 8.25 4.5h7.5a3 3 0 0 1 3 3v3" />
                <path d="M5.25 13.5v4.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-4.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Total deliveries
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                4,820
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900/70 p-4 text-right shadow-lg shadow-slate-950/20 sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-emerald-300">
              <span className="text-sm font-semibold">+18.7%</span>
              <span className="text-xs uppercase tracking-[0.28em] text-slate-400">since last month</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Delivery volume increased across all hubs with improved on-time rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard;
