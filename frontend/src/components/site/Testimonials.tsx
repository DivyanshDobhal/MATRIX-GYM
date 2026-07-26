import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const stories = [
  {
    name: "Karan S.",
    initials: "KS",
    rating: 5,
    before: "92 kg",
    after: "74 kg",
    story:
      "In 6 months at MATRIX, I dropped 18kg and finally hit a 150kg deadlift. The coaches don't just train you — they engineer a new version of you.",
  },
  {
    name: "Meera J.",
    initials: "MJ",
    rating: 5,
    before: "68 kg",
    after: "58 kg",
    story:
      "The nutrition guidance was a game-changer. I lost 10kg without ever feeling deprived. This place feels like a second home.",
  },
  {
    name: "Vikram P.",
    initials: "VP",
    rating: 5,
    before: "58 kg",
    after: "72 kg",
    story:
      "I came in a skinny guy and left with 14kg of lean muscle. The programming is world-class and the community keeps you accountable.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const s = stories[i];

  return (
    <section id="stories" className="relative py-24 lg:py-32 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Success Stories</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Real bodies. <span className="neon-text">Real proof.</span>
          </h2>
        </div>

        <div className="mt-14 relative">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <Quote className="h-10 w-10 text-neon opacity-70" />
            <p className="mt-4 text-xl md:text-2xl leading-relaxed text-white/90 font-light">
              "{s.story}"
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-neon text-black font-black text-lg">
                  {s.initials}
                </div>
                <div>
                  <div className="font-bold">{s.name}</div>
                  <div className="flex text-neon">
                    {Array.from({ length: s.rating }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-lg border border-white/10 px-4 py-2">
                  <div className="text-[10px] uppercase text-white/50">Before</div>
                  <div className="font-bold">{s.before}</div>
                </div>
                <div className="text-neon font-black">→</div>
                <div className="rounded-lg border border-neon/40 bg-neon/5 px-4 py-2">
                  <div className="text-[10px] uppercase text-neon">After</div>
                  <div className="font-bold">{s.after}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setI((i - 1 + stories.length) % stories.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-neon hover:text-black transition"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {stories.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Story ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-neon" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((i + 1) % stories.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:bg-neon hover:text-black transition"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
