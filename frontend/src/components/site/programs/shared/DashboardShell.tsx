import { ReactNode } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Flame, Trophy, Award } from "lucide-react";
import { Tabs } from "./Tabs";

interface DashboardShellProps {
  id: string;
  title: string;
  difficulty: string;
  duration: string;
  bannerText: string;
  img: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
  onClose: () => void;
  children: ReactNode;
}

export function DashboardShell({
  id,
  title,
  difficulty,
  duration,
  bannerText,
  img,
  activeTab,
  setActiveTab,
  onClose,
  children
}: DashboardShellProps) {
  const tabsList = [
    { id: "overview", label: "Overview" },
    { id: "workouts", label: "Workout Plans" },
    { id: "nutrition", label: "Nutrition" },
    { id: "progress", label: "Progress" },
    { id: "trainer", label: "Trainer" },
    { id: "faqs", label: "FAQs" },
    { id: "reviews", label: "Reviews" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl text-white select-none scrollbar-thin">
      {/* Background Animated Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-10 left-1/4 h-[350px] w-[350px] rounded-full bg-neon/5 blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-neon/10 blur-[150px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Fullscreen Hero Header */}
        <header className="relative h-[250px] md:h-[350px] w-full overflow-hidden shrink-0">
          <img
            src={img}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Header Controls */}
          <div className="absolute top-5 inset-x-0 max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
            <span className="text-xs uppercase tracking-[0.4em] text-neon font-black drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
              MATRIX // PORTAL
            </span>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-neon hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Banner Title & Info */}
          <div className="absolute bottom-6 inset-x-0 max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-neon/10 border border-neon/30 px-3 py-1 text-xs font-black text-neon">
                  <Award className="h-3 w-3" /> {difficulty}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-white/80">
                  <Calendar className="h-3 w-3" /> {duration}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight">{title}</h1>
              <p className="mt-2.5 text-white/70 text-sm md:text-base font-semibold leading-relaxed max-w-xl">
                {bannerText}
              </p>
            </div>

            {/* Glowing CTA inside Hero */}
            <a
              href="#register-anchor"
              onClick={() => {
                // Smooth scroll to register form inside parent container
                const el = document.getElementById("register-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-8 py-3.5 text-sm font-black text-black neon-glow-btn transition-transform hover:scale-105 shrink-0"
            >
              JOIN PROGRAM
            </a>
          </div>
        </header>

        {/* Tab Navigation (Sticky) */}
        <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />

        {/* Dynamic Body Slot */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-10 py-10">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
