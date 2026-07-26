import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Cpu, Salad, Clock, Smartphone, LineChart } from "lucide-react";

import featuresDataRaw from "@/data/featuresData.json";
import { FeatureModalShell } from "./features/shared/FeatureModalShell";
import TrainersSubDashboard from "./features/TrainersSubDashboard";
import EquipmentSubDashboard from "./features/EquipmentSubDashboard";
import NutritionSubDashboard from "./features/NutritionSubDashboard";
import TimingsSubDashboard from "./features/TimingsSubDashboard";
import MobileAppSubDashboard from "./features/MobileAppSubDashboard";
import PerformanceSubDashboard from "./features/PerformanceSubDashboard";

const featuresData: Record<string, any> = featuresDataRaw;

const features = [
  { id: "certified-trainers", icon: Award, title: "Certified Trainers", desc: "Coaches accredited by NASM, ACE and CrossFit-L2." },
  { id: "smart-equipment", icon: Cpu, title: "Smart Equipment", desc: "Sensor-driven machines that track every rep." },
  { id: "nutrition-guidance", icon: Salad, title: "Nutrition Guidance", desc: "Personalised macros and meal plans that adapt." },
  { id: "flexible-timings", icon: Clock, title: "Flexible Timings", desc: "Open 5AM to midnight, seven days a week." },
  { id: "mobile-app", icon: Smartphone, title: "Mobile App", desc: "Book classes, log workouts, track progress." },
  { id: "performance-tracking", icon: LineChart, title: "Performance Tracking", desc: "Weekly insights on strength, cardio and body." },
];

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const openFeature = (id: string) => {
    setSelectedFeature(id);
  };

  const closeFeature = () => {
    setSelectedFeature(null);
  };

  const renderSubDashboard = () => {
    if (!selectedFeature) return null;
    const fData = featuresData[selectedFeature];

    switch (selectedFeature) {
      case "certified-trainers":
        return <TrainersSubDashboard data={fData} />;
      case "smart-equipment":
        return <EquipmentSubDashboard data={fData} />;
      case "nutrition-guidance":
        return <NutritionSubDashboard data={fData} />;
      case "flexible-timings":
        return <TimingsSubDashboard data={fData} />;
      case "mobile-app":
        return <MobileAppSubDashboard data={fData} />;
      case "performance-tracking":
        return <PerformanceSubDashboard data={fData} />;
      default:
        return null;
    }
  };

  const activeFeatureData = selectedFeature ? features.find((f) => f.id === selectedFeature) : null;
  const activeJSONData = selectedFeature ? featuresData[selectedFeature] : null;

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-charcoal to-charcoal-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Why MATRIX</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Built for the <span className="neon-text">obsessed.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.id}
              onClick={() => openFeature(f.id)}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-7 border border-white/5 cursor-pointer hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-neon/10 border border-neon/30">
                  <f.icon className="h-6 w-6 text-neon" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-xs md:text-sm text-white/60 leading-relaxed">{f.desc}</p>
              </div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest mt-4 inline-block hover:underline">
                Explore Dashboard →
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedFeature && activeFeatureData && activeJSONData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
          >
            <FeatureModalShell
              id={selectedFeature}
              title={activeJSONData.title}
              description={activeJSONData.description}
              icon={activeFeatureData.icon}
              onClose={closeFeature}
            >
              {renderSubDashboard()}
            </FeatureModalShell>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
