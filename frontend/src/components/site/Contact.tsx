import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const rows = [
  { icon: MapPin, title: "Address", value: "42 Powerhouse Lane, Indiranagar, Bengaluru 560038" },
  { icon: Phone, title: "Phone", value: "+91 98765 43210" },
  { icon: Mail, title: "Email", value: "hello@matrix.fit" },
  { icon: Clock, title: "Hours", value: "Mon – Sun · 5:00 AM – 12:00 AM" },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Contact</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Come <span className="neon-text">say hi.</span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-8 md:p-10 space-y-6">
            {rows.map((r) => (
              <div key={r.title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-neon/10 border border-neon/30">
                  <r.icon className="h-5 w-5 text-neon" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-white/50">{r.title}</div>
                  <div className="mt-1 text-white/90">{r.value}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-neon hover:text-black transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 min-h-[380px] bg-charcoal-2">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-neon mx-auto animate-float" />
                <div className="mt-3 font-display text-xl font-bold">Google Maps</div>
                <div className="text-sm text-white/50">Embed placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
