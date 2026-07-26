import { useState } from "react";
import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const stories = [
  { before: g1, after: g2, name: "Kabir S.", weeks: 16, note: "-14 kg, +2 lifts PR" },
  { before: g3, after: g4, name: "Meera D.", weeks: 20, note: "First pull-up unlocked" },
];

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [p, setP] = useState(50);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl select-none">
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${p}%` }}>
        <img src={before} alt="Before" className="h-full w-full object-cover" style={{ width: `${(100 / p) * 100}%` }} />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${p}%` }}>
        <div className="h-full w-0.5 bg-neon shadow-[0_0_20px_var(--neon)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-neon grid place-items-center text-black font-black shadow-[0_0_30px_var(--neon)]">
          ⇋
        </div>
      </div>
      <span className="absolute left-3 top-3 text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur px-2 py-1 rounded">Before</span>
      <span className="absolute right-3 top-3 text-[10px] uppercase tracking-widest bg-neon text-black px-2 py-1 rounded font-bold">After</span>
      <input
        type="range" min={0} max={100} value={p}
        onChange={(e) => setP(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Reveal slider"
      />
    </div>
  );
}

export function TransformationStories() {
  return (
    <section id="stories" className="relative py-24 lg:py-32 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Success Stories</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Real people. <span className="neon-text">Real results.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-8">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-3xl p-5 hover:shadow-[0_0_60px_-15px_var(--neon-glow)] transition"
            >
              <BeforeAfter before={s.before} after={s.after} />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="font-display text-xl font-bold">{s.name}</div>
                  <div className="text-sm text-white/60">{s.note}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl font-black neon-text">{s.weeks}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">weeks</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
