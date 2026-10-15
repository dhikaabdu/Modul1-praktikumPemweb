export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50">
        <div className="grid gap-10 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              Get in touch
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Let&apos;s make your next idea happen.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-slate-300">
              Tell us a little about what you&apos;re building. We&apos;ll work
              together to shape it into something meaningful.
            </p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">What to expect</p>
              <p className="mt-2 font-medium text-white">
                A thoughtful conversation, clear next steps, and no pressure.
              </p>
            </div>
          </div>

          <form className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-200">
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-200">
                Email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-200">
                Tell us about your project
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="A few details about your idea..."
                className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              />
            </div>

            <p className="text-sm leading-6 text-slate-400">
              This is a contact form preview and does not send messages yet.
            </p>
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-cyan-400/50 px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}