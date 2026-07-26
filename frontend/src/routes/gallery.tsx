import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

// Import all local assets to fill up the gallery
import imgG1 from "@/assets/gallery-1.jpg";
import imgG2 from "@/assets/gallery-2.jpg";
import imgG3 from "@/assets/gallery-3.jpg";
import imgG4 from "@/assets/gallery-4.jpg";
import imgG5 from "@/assets/gallery-5.jpg";
import imgG6 from "@/assets/gallery-6.jpg";

import imgP1 from "@/assets/prog-strength.jpg";
import imgP2 from "@/assets/prog-hiit.jpg";
import imgP3 from "@/assets/prog-crossfit.jpg";
import imgP4 from "@/assets/prog-functional.jpg";
import imgP5 from "@/assets/prog-yoga.jpg";
import imgP6 from "@/assets/prog-cardio.jpg";
import imgP7 from "@/assets/prog-transform.jpg";
import imgP8 from "@/assets/prog-coaching.jpg";

export const Route = createFileRoute("/gallery")({
  component: GalleryDashboardPage
});

const mediaItems = [
  { id: 1, src: imgG1, category: "Gym Interior", title: "Elite Olympic Platform Area", desc: "Premium Eleiko barbells and high-density impact rubber platforms." },
  { id: 2, src: imgG2, category: "Equipment", title: "Dumbbell Zone & Free Weights", desc: "Ziva dumbbells ranging from 2kg to 60kg with steel grips." },
  { id: 3, src: imgG3, category: "Strength Training", title: "Hammer Strength Squat Racks", desc: "Rigid multi-rack cage setup for heavy squats and benches." },
  { id: 4, src: imgG4, category: "Cardio", title: "Technogym Skillrun Rowers", desc: "Magnetic rowers synchronized with heart rate telemetry metrics." },
  { id: 5, src: imgG5, category: "Yoga", title: "Zen Mobility Yoga Studio", desc: "Sound-dampened studio with bamboo flooring and warm accent lighting." },
  { id: 6, src: imgG6, category: "CrossFit", title: "Rogue Functional Rig", desc: "Dynamic monkey bar attachments, rings, and wallball targets." },
  { id: 7, src: imgP1, category: "Strength Training", title: "Incline Bench Press Line", desc: "Biomechanically optimized incline press configurations." },
  { id: 8, src: imgP2, category: "Events", title: "Community Fitness WOD", desc: "Saturdays team conditioning battles on the turf." },
  { id: 9, src: imgP3, category: "CrossFit", title: "Kettlebell Warm-up Circuits", desc: "Cast iron kettlebells ready for metabolic pacing drills." },
  { id: 10, src: imgP5, category: "Yoga", title: "Vinyasa Breath Alignment", desc: "Active yoga session focusing on flow, posture and decompression." }
];

function GalleryDashboardPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Gym Interior", "Equipment", "Strength Training", "Yoga", "CrossFit", "Cardio", "Events"];

  const filteredMedia = mediaItems.filter((m) => {
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredMedia.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-10">
        {/* Title */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Gallery</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-black">
            The facility <span className="neon-text">tour.</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
            Inspect our high-performance zones, mechanical weight rigs, mobility studios, and community competition events.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-black transition-all ${
                    activeCategory === c
                      ? "bg-neon text-black font-black"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search photo specs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filteredMedia.map((m, idx) => (
            <motion.div
              key={m.id}
              onClick={() => setLightboxIndex(idx)}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-charcoal-2 cursor-pointer break-inside-avoid group group-hover:border-white/10 transition-all duration-300"
            >
              <img src={m.src} alt={m.title} className="w-full object-cover rounded-2xl" />
              
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[9px] text-neon uppercase font-black tracking-widest">{m.category}</span>
                <h3 className="font-display text-base font-bold text-white mt-1 flex items-center gap-1.5">
                  {m.title} <Maximize2 className="h-4 w-4 text-white/50 shrink-0" />
                </h3>
                <p className="text-[10px] text-white/60 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Carousel */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredMedia[lightboxIndex] && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white hover:bg-neon hover:text-black transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Previous */}
            <button
              onClick={handlePrev}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-neon hover:text-black transition cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Active Image block */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl text-center space-y-4 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredMedia[lightboxIndex].src}
                alt={filteredMedia[lightboxIndex].title}
                className="max-h-[70vh] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] mx-auto object-contain"
              />
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-widest font-black text-neon">
                  {filteredMedia[lightboxIndex].category}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {filteredMedia[lightboxIndex].title}
                </h3>
                <p className="text-xs text-white/50 max-w-lg mx-auto">
                  {filteredMedia[lightboxIndex].desc}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-neon hover:text-black transition cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
