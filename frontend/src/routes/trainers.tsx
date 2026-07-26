import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Award, Calendar, Check, X, Shield, ArrowUpRight, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import t1 from "@/assets/trainer-1.jpg";
import t2 from "@/assets/trainer-2.jpg";
import t3 from "@/assets/trainer-3.jpg";
import t4 from "@/assets/trainer-4.jpg";

export const Route = createFileRoute("/trainers")({
  component: TrainersDashboardPage
});

const coaches = [
  {
    id: "john-carter",
    name: "John Carter",
    role: "Head Strength Coach",
    experience: "10+ Years",
    rating: 4.9,
    reviewsCount: 142,
    languages: ["English", "Hindi"],
    certs: ["NASM-CPT", "ACE Certified", "CrossFit Level 2"],
    img: t1,
    bio: "Specializing in athletic performance and structural hypertrophy. John has coached collegiate athletes and helped hundreds of gym members establish safe lifting progressions.",
    specialization: "Hypertrophy, Strength Conditioning, Powerlifting",
    slots: ["08:00 AM", "10:30 AM", "04:00 PM"]
  },
  {
    id: "sarah-wilson",
    name: "Sarah Wilson",
    role: "Lead Sports Dietitian & Yoga Coach",
    experience: "8+ Years",
    rating: 4.8,
    reviewsCount: 118,
    languages: ["English", "Spanish"],
    certs: ["ISSA Nutrition Coach", "Yoga Alliance RYT-500", "CPR/AED Certified"],
    img: t2,
    bio: "Sarah integrates structural alignment with metabolically sound nutritional plans to achieve sustainable fat loss, flexibility, and inner mindfulness.",
    specialization: "Vinyasa Yoga, Dietetics, HIIT Cardio",
    slots: ["07:00 AM", "09:00 AM", "05:30 PM"]
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Senior Conditioning Coach",
    experience: "7+ Years",
    rating: 4.9,
    reviewsCount: 94,
    languages: ["English"],
    certs: ["NSCA-CSCS", "CrossFit L3", "First Aid Certified"],
    img: t3,
    bio: "Marcus combines Olympic weightlifting techniques with intense cardiovascular pacing to maximize caloric burn and build athletic durability.",
    specialization: "Olympic Weightlifting, HIIT Circuits, CrossFit WODs",
    slots: ["06:00 AM", "11:00 AM", "06:00 PM"]
  },
  {
    id: "emily-chen",
    name: "Emily Chen",
    role: "Functional Mobility Coach",
    experience: "9+ Years",
    rating: 4.7,
    reviewsCount: 105,
    languages: ["English", "Mandarin"],
    certs: ["ACE-CPT", "FMS Level 2 Certified"],
    img: t4,
    bio: "Emily focuses on restorative biomechanics. Her programs target joint decompression, posture correction, and body recomposition.",
    specialization: "Posture Correction, Biomechanics, Kettlebell Training",
    slots: ["10:00 AM", "02:00 PM", "07:00 PM"]
  }
];

function TrainersDashboardPage() {
  const [selectedCoachId, setSelectedCoachId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const selectedCoach = coaches.find((c) => c.id === selectedCoachId);

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error("Please choose a time slot.");
      return;
    }
    setIsBooked(true);
    toast.success(`Session booked with Coach ${selectedCoach?.name} at ${selectedSlot}!`);
    setTimeout(() => {
      setSelectedCoachId(null);
      setSelectedSlot(null);
      setIsBooked(false);
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-10">
        {/* Title */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Coaches</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-black">
            The elite <span className="neon-text">roster.</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
            Train under certified instructors possessing advanced accreditation in muscle composition, biomechanics, and sports nutrition.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((c) => (
            <motion.div
              key={c.id}
              onClick={() => {
                setSelectedCoachId(c.id);
                setSelectedSlot(null);
                setIsBooked(false);
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-charcoal-2 cursor-pointer hover:border-white/10 transition duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-neon uppercase font-black tracking-wider">{c.experience} Exp</span>
                  <span className="font-bold text-white/80 flex items-center gap-1">
                    <Star className="h-3 w-3 text-neon fill-neon" /> {c.rating}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white line-clamp-1">{c.name}</h3>
                <p className="text-xs text-white/50 line-clamp-1">{c.role}</p>

                <div className="flex flex-wrap gap-1 pt-1.5">
                  {c.certs.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-[8px] text-white/60 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Coach Details Modal */}
      <AnimatePresence>
        {selectedCoachId && selectedCoach && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex justify-center items-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-charcoal-2 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row gap-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCoachId(null)}
                className="absolute top-5 right-5 rounded-full bg-white/10 p-1.5 text-white/70 hover:bg-neon hover:text-black transition z-20"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Coach Image Column */}
              <div className="w-full md:w-72 shrink-0 space-y-4">
                <img src={selectedCoach.img} alt={selectedCoach.name} className="w-full h-80 object-cover rounded-2xl border border-white/5" />
                
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Review Rating</span>
                    <span className="font-bold text-neon flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-neon" /> {selectedCoach.rating} ({selectedCoach.reviewsCount} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Languages</span>
                    <span className="font-bold text-white">{selectedCoach.languages.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Description Column */}
              <div className="flex-1 space-y-5">
                <div>
                  <span className="text-[10px] uppercase font-black text-neon tracking-widest">{selectedCoach.role}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-black text-white">{selectedCoach.name}</h3>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed">{selectedCoach.bio}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold">Certifications & Accreditations</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCoach.certs.map((c, i) => (
                      <div key={i} className="flex items-center gap-1 text-[10px] text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        <Award className="h-3.5 w-3.5 text-neon" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking form */}
                <form onSubmit={handleBookSession} className="border-t border-white/5 pt-5 space-y-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Available Booking Slots Today</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {selectedCoach.slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSlot(s)}
                          className={`rounded-xl py-2 text-xs font-bold transition-all ${
                            selectedSlot === s
                              ? "bg-neon text-black font-black"
                              : "bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isBooked}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neon py-3.5 text-xs font-black text-black uppercase tracking-wider neon-glow-btn transition"
                  >
                    {isBooked ? (
                      <>
                        <Check className="h-4 w-4" /> Consultation Session Reserved
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4" /> Book Consultation Session
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
