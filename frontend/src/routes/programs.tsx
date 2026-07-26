import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpRight } from "lucide-react";

import strengthImg from "@/assets/prog-strength.jpg";
import hiitImg from "@/assets/prog-hiit.jpg";
import crossfitImg from "@/assets/prog-crossfit.jpg";
import functionalImg from "@/assets/prog-functional.jpg";
import yogaImg from "@/assets/prog-yoga.jpg";
import cardioImg from "@/assets/prog-cardio.jpg";
import transformImg from "@/assets/prog-transform.jpg";
import coachingImg from "@/assets/prog-coaching.jpg";

import programsDataRaw from "@/data/programsData.json";
import { DashboardShell } from "@/components/site/programs/shared/DashboardShell";
import StrengthTrainingDashboard from "@/components/site/programs/StrengthTrainingDashboard";
import HIITDashboard from "@/components/site/programs/HIITDashboard";
import CrossFitDashboard from "@/components/site/programs/CrossFitDashboard";
import FunctionalFitnessDashboard from "@/components/site/programs/FunctionalFitnessDashboard";
import YogaDashboard from "@/components/site/programs/YogaDashboard";
import CardioDashboard from "@/components/site/programs/CardioDashboard";
import BodyTransformationDashboard from "@/components/site/programs/BodyTransformationDashboard";
import PersonalCoachingDashboard from "@/components/site/programs/PersonalCoachingDashboard";

const programsData: Record<string, any> = programsDataRaw;

const programsList = [
  { id: "strength-training", title: "Strength Training", category: "Strength", difficulty: "Advanced", duration: "12 Weeks", goal: "Muscle Gain", desc: "Build raw power with progressive overload and periodized lifting.", img: strengthImg },
  { id: "hiit", title: "HIIT", category: "Cardio", difficulty: "All Levels", duration: "8 Weeks", goal: "Fat Loss", desc: "Torch calories with explosive intervals engineered by our coaches.", img: hiitImg },
  { id: "crossfit", title: "CrossFit", category: "CrossFit", difficulty: "Advanced", duration: "Ongoing", goal: "Conditioning", desc: "Community-driven, high-intensity functional movement.", img: crossfitImg },
  { id: "functional-fitness", title: "Functional Fitness", category: "Mobility", difficulty: "Beginner", duration: "10 Weeks", goal: "Mobility", desc: "Move better in real life with mobility-first programming.", img: functionalImg },
  { id: "yoga", title: "Yoga", category: "Mobility", difficulty: "Beginner", duration: "Ongoing", goal: "Mindfulness", desc: "Restore balance, breath, and flexibility across all levels.", img: yogaImg },
  { id: "cardio", title: "Cardio", category: "Cardio", difficulty: "All Levels", duration: "Ongoing", goal: "Endurance", desc: "Zone-based cycling and treadmill work to build endurance.", img: cardioImg },
  { id: "body-transformation", title: "Body Transformation", category: "Transformation", difficulty: "All Levels", duration: "12 Weeks", goal: "Recomposition", desc: "12-week programs with nutrition and accountability built-in.", img: transformImg },
  { id: "personal-coaching", title: "Personal Coaching", category: "Coaching", difficulty: "All Levels", duration: "Ongoing", goal: "Customized", desc: "1-on-1 training tailored to your goals, body and schedule.", img: coachingImg }
];

export const Route = createFileRoute("/programs")({
  component: ProgramsDashboardPage
});

function ProgramsDashboardPage() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Search & Filter states
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredPrograms = programsList.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficultyFilter === "All" || p.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

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

  const activeProgramData = selectedProgram ? programsList.find((p) => p.id === selectedProgram) : null;
  const activeJSONData = selectedProgram ? programsData[selectedProgram] : null;

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-10">
        {/* Title */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Programs</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-black">
            Fitness <span className="neon-text">disciplines.</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
            Select a discipline below to load your personalized training split, macro calculators, timers, and progress logs.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-white/[0.01] border border-white/5 rounded-3xl p-5 md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search program names or goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
            />
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-white/30 shrink-0" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Mobility">Mobility</option>
            <option value="Transformation">Transformation</option>
            <option value="Coaching">Coaching</option>
          </select>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPrograms.map((p) => (
            <motion.article
              key={p.id}
              onClick={() => {
                setSelectedProgram(p.id);
                setActiveTab("overview");
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal-2 cursor-pointer transition-all duration-300 flex flex-col justify-between"
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
                <div className="flex justify-between items-start gap-1">
                  <h3 className="font-display text-xl font-bold text-white leading-tight">{p.title}</h3>
                  <span className="text-[8px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded font-black uppercase tracking-wider shrink-0 mt-1">
                    {p.category}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-white/60 line-clamp-2 leading-relaxed">{p.desc}</p>
                <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-neon uppercase tracking-wider opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  Open Portal <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expanded Program Dashboard Overlay */}
      <AnimatePresence>
        {selectedProgram && activeProgramData && activeJSONData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
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
              onClose={() => setSelectedProgram(null)}
            >
              {renderDashboardContent()}
            </DashboardShell>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
