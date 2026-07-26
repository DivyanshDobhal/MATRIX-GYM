import { useState } from "react";
import { Instagram, Twitter, Youtube, Facebook, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative bg-charcoal-2 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon text-black font-black text-lg">M</span>
              <span className="font-display text-xl font-black">MATRIX</span>
            </div>
            <p className="mt-4 text-white/50 text-sm">
              Unlock your strongest self. Premium coaching, smart equipment, and a community that pushes you.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:bg-neon hover:text-black transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/80 font-bold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {["Home", "Programs", "Membership", "Trainers", "Gallery", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-neon transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/80 font-bold">Programs</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {["Strength Training", "HIIT", "CrossFit", "Yoga", "Cardio", "Personal Coaching"].map((l) => (
                <li key={l}><a href="#programs" className="hover:text-neon transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-white/80 font-bold">Newsletter</h4>
            <p className="mt-4 text-sm text-white/60">Get training tips and offers, monthly.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) { setSent(true); setEmail(""); setTimeout(() => setSent(false), 3000); } }}
              className="mt-4 flex overflow-hidden rounded-full border border-white/10 bg-white/5 focus-within:border-neon transition"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                required
              />
              <button className="grid h-11 w-11 shrink-0 place-items-center bg-neon text-black hover:bg-neon/90 transition" aria-label="Subscribe">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {sent && <p className="mt-2 text-xs text-neon">Subscribed! Talk soon.</p>}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap justify-between gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} MATRIX Fitness. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neon">Privacy</a>
            <a href="#" className="hover:text-neon">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
