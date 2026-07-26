import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const items = [
  { src: g1, cls: "md:row-span-2", alt: "Gym interior" },
  { src: g2, cls: "", alt: "Group class" },
  { src: g3, cls: "", alt: "Equipment" },
  { src: g4, cls: "md:row-span-2", alt: "Athlete lifting" },
  { src: g5, cls: "", alt: "Boxing training" },
  { src: g6, cls: "", alt: "Reception" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Gallery</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Inside <span className="neon-text">MATRIX.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[220px] md:auto-rows-[280px]">
          {items.map((it, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${it.cls}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
