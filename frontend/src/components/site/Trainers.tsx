import { Instagram, Twitter, Linkedin } from "lucide-react";
import t1 from "@/assets/trainer-1.jpg";
import t2 from "@/assets/trainer-2.jpg";
import t3 from "@/assets/trainer-3.jpg";
import t4 from "@/assets/trainer-4.jpg";

const trainers = [
  { name: "Arjun Mehta", role: "Head Strength Coach", years: 12, img: t1 },
  { name: "Priya Nair", role: "HIIT & Conditioning", years: 8, img: t2 },
  { name: "Rohan Kapoor", role: "CrossFit Level 3", years: 10, img: t3 },
  { name: "Ananya Rao", role: "Yoga & Mobility", years: 9, img: t4 },
];

export function Trainers() {
  return (
    <section id="trainers" className="relative py-24 lg:py-32 bg-gradient-to-b from-charcoal-2 to-charcoal">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Trainers</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Meet the <span className="neon-text">team.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t) => (
            <div key={t.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal-2 card-hover">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-[10px] uppercase tracking-widest text-neon font-bold">
                    {t.years} yrs experience
                  </div>
                  <h3 className="font-display text-xl font-bold">{t.name}</h3>
                  <p className="text-sm text-white/60">{t.role}</p>
                  <div className="mt-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" aria-label="Social" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-neon hover:text-black transition">
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
