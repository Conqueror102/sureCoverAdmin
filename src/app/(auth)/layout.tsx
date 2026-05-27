export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ccfbf1,transparent_34%),linear-gradient(135deg,#f8fafc,#ffffff)]">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[1fr_420px]">
        <section className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Healthcare operations command center</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950">
            Secure administrative control for clinical, financial, and emergency healthcare teams.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            SureCova centralizes telemedicine operations, chronic care monitoring, subscriptions, doctor payouts, and emergency escalation workflows.
          </p>
        </section>
        {children}
      </div>
    </main>
  );
}
