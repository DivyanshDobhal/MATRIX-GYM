import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Info, Cpu, Activity, AlertCircle } from "lucide-react";

// Import existing high-quality assets to map to machines
import treadmillImg from "@/assets/prog-cardio.jpg";
import powerRackImg from "@/assets/prog-strength.jpg";
import hammerImg from "@/assets/gallery-3.jpg";
import rowerImg from "@/assets/gallery-4.jpg";
import airBikeImg from "@/assets/prog-hiit.jpg";
import cableImg from "@/assets/prog-coaching.jpg";
import platformImg from "@/assets/prog-crossfit.jpg";
import rigImg from "@/assets/prog-functional.jpg";
import dumbbellImg from "@/assets/gallery-2.jpg";
import recoveryImg from "@/assets/gallery-5.jpg";

interface EquipmentDashboardProps {
  data: any;
}

export default function EquipmentSubDashboard({ data }: EquipmentDashboardProps) {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  // Map machine names to local assets
  const assetMap: Record<string, string> = {
    "Technogym Smart Treadmill": treadmillImg,
    "Rogue Power Rack": powerRackImg,
    "Hammer Strength Machines": hammerImg,
    "Concept2 Rowing Machine": rowerImg,
    "Assault Air Bike": airBikeImg,
    "Smart Cable Machine": cableImg,
    "Olympic Platform": platformImg,
    "Functional Rig": rigImg,
    "Dumbbell Zone": dumbbellImg,
    "Recovery Area": recoveryImg
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-4">
        <h3 className="font-display text-xl font-bold text-neon flex items-center justify-center gap-1.5">
          <Cpu className="h-4 w-4" /> BIOMECHANICAL HARDWARE
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Click any smart equipment card to inspect its mechanical parameters and integrated sensor features.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.equipment.map((eq: any) => {
          const img = assetMap[eq.name] || treadmillImg;
          const isSelected = selectedMachine === eq.name;

          return (
            <div
              key={eq.name}
              onClick={() => setSelectedMachine(isSelected ? null : eq.name)}
              className={`glass rounded-2xl overflow-hidden border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                isSelected
                  ? "border-neon shadow-[0_0_15px_rgba(57,255,20,0.15)] ring-1 ring-neon/30"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <div className="relative aspect-video w-full overflow-hidden shrink-0">
                <img src={img} alt={eq.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="p-3">
                <h4 className="font-display text-xs font-bold text-white line-clamp-1">{eq.name}</h4>
                <span className="text-[9px] text-neon uppercase font-black tracking-wider block mt-0.5">{eq.difficulty}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Equipment Panel */}
      <AnimatePresence mode="wait">
        {selectedMachine && (() => {
          const eq = data.equipment.find((e: any) => e.name === selectedMachine);
          const img = assetMap[selectedMachine];

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-3xl p-6 border border-neon/20 flex flex-col md:flex-row gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-40 w-40 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
              <img src={img} alt={selectedMachine} className="h-44 w-full md:w-64 rounded-2xl object-cover shrink-0" />
              
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-black text-neon tracking-widest">Active Device Blueprint</span>
                  <h4 className="font-display text-2xl font-black text-white">{selectedMachine}</h4>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    <strong>Primary Purpose</strong>: {eq.purpose}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-1.5">
                    <span className="text-[9px] uppercase text-white/40 tracking-wider font-bold block">Smart Integrations</span>
                    <div className="space-y-1 text-white/80">
                      {eq.features.map((feat: string, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px]">
                          <Cpu className="h-3.5 w-3.5 text-neon" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase text-white/40 tracking-wider font-bold block">Biomechanical Targets</span>
                      <p className="text-[10px] text-white/80 mt-1 leading-relaxed">
                        <strong>Target Muscles</strong>: {eq.muscles}
                      </p>
                    </div>
                    <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[10px]">
                      <span className="text-white/40">Status</span>
                      <span className="font-black text-neon flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> Fully Operational
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
