import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import strength from "@/assets/prog-strength.jpg";
import hiit from "@/assets/prog-hiit.jpg";
import crossfit from "@/assets/prog-crossfit.jpg";
import functional from "@/assets/prog-functional.jpg";
import yoga from "@/assets/prog-yoga.jpg";
import cardio from "@/assets/prog-cardio.jpg";
import transform from "@/assets/prog-transform.jpg";
import coaching from "@/assets/prog-coaching.jpg";

import programsDataRaw from "@/data/programsData.json";
import { DashboardShell } from "./programs/shared/DashboardShell";
import StrengthTrainingDashboard from "./programs/StrengthTrainingDashboard";
import HIITDashboard from "./programs/HIITDashboard";
import CrossFitDashboard from "./programs/CrossFitDashboard";
import FunctionalFitnessDashboard from "./programs/FunctionalFitnessDashboard";
import YogaDashboard from "./programs/YogaDashboard";
import CardioDashboard from "./programs/CardioDashboard";
import BodyTransformationDashboard from "./programs/BodyTransformationDashboard";
import PersonalCoachingDashboard from "./programs/PersonalCoachingDashboard";

const programsData: Record<string, any> = programsDataRaw;

const programs = [
  { id: "strength-training", title: "Strength Training", desc: "Build raw power with progressive overload and periodized lifting.", img: strength },
  { id: "hiit", title: "HIIT", desc: "Torch calories with explosive intervals engineered by our coaches.", img: hiit },
  { id: "crossfit", title: "CrossFit", desc: "Community-driven, high-intensity functional movement.", img: crossfit },
  { id: "functional-fitness", title: "Functional Fitness", desc: "Move better in real life with mobility-first programming.", img: functional },
  { id: "yoga", title: "Yoga", desc: "Restore balance, breath, and flexibility across all levels.", img: yoga },
  { id: "cardio", title: "Cardio", desc: "Zone-based cycling and treadmill work to build endurance.", img: cardio },
  { id: "body-transformation", title: "Body Transformation", desc: "12-week programs with nutrition and accountability built-in.", img: transform },
  { id: "personal-coaching", title: "Personal Coaching", desc: "1-on-1 training tailored to your goals, body and schedule.", img: coaching },
];

export function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const openProgram = (id: string) => {
    setSelectedProgram(id);
    setActiveTab("overview");
  };

  const closeProgram = () => {
    setSelectedProgram(null);
  };

  const renderDashboardContent = () => {
    if (!selectedProgram) return null;
    const pData = programsData[selectedProgram];
    
    switch (selectedProgram) {
      case "strength-training":
        return <StrengthTrainingDashboard data={pData} activeTab={activeTab} />;
      case "hiit":
        return <HIITDashboard data={pData} activeTab={activeTab} />;
      case "crossfit":
        return <CrossFitDashboard data={pData} activeTab={activeTab} />;
      case "functional-fitness":
        return <FunctionalFitnessDashboard data={pData} activeTab={activeTab} />;
      case "yoga":
        return <YogaDashboard data={pData} activeTab={activeTab} />;
      case "cardio":
        return <CardioDashboard data={pData} activeTab={activeTab} />;
      case "body-transformation":
        return <BodyTransformationDashboard data={pData} activeTab={activeTab} />;
      case "personal-coaching":
        return <PersonalCoachingDashboard data={pData} activeTab={activeTab} />;
      default:
        return null;
    }
  };

  const activeProgramData = selectedProgram ? programs.find((p) => p.id === selectedProgram) : null;
  const activeJSONData = selectedProgram ? programsData[selectedProgram] : null;

  return (
    <section id="programs" className="relative py-24 lg:py-32 bg-charcoal">
      {/* Anchor for scroll actions in shell header */}
      <div id="register-anchor" className="absolute top-0 left-0 h-0 w-0" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Programs</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Choose your <span className="neon-text">weapon.</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Eight signature disciplines. One goal — the strongest version of you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((p) => (
            <motion.article
              key={p.id}
              onClick={() => openProgram(p.id)}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal-2 cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-white/70 line-clamp-2">{p.desc}</p>
                <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neon opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Fullscreen Overlay Dashboard */}
      <AnimatePresence>
        {selectedProgram && activeProgramData && activeJSONData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50"
          >
            <DashboardShell
              id={selectedProgram}
              title={activeJSONData.title}
              difficulty={activeJSONData.difficulty}
              duration={activeJSONData.duration}
              bannerText={activeJSONData.bannerText}
              img={activeProgramData.img}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onClose={closeProgram}
            >
              {renderDashboardContent()}
            </DashboardShell>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
