import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion } from "./shared/Accordion";
import { Sparkles, Play, RotateCcw, Heart, Eye, Star } from "lucide-react";
import trainerImg from "@/assets/trainer-2.jpg"; // Re-use trainer-2 for yoga or similar

interface YogaProps {
  data: any;
  activeTab: string;
}

const poses = [
  { name: "Tree Pose (Vrikshasana)", level: "Beginner", benefits: "Improves balance, opens hips, strengthens ankles and core." },
  { name: "Cobra Pose (Bhujangasana)", level: "Beginner", benefits: "Strengthens spine, stretches chest and shoulders, relieves lower back stiffness." },
  { name: "Warrior II (Virabhadrasana II)", level: "Intermediate", benefits: "Increases muscular stamina in legs, opens hips, improves structural posture." },
  { name: "Child Pose (Balasana)", level: "Beginner", benefits: "Calms brain, releases tension in lower back, shoulders, and chest." },
  { name: "Downward Dog (Adho Mukha Svanasana)", level: "All Levels", benefits: "Lengthens spine, stretches hamstrings and calves, increases blood flow." }
];

export default function YogaDashboard({ data, activeTab }: YogaProps) {
  // Meditation Timer States
  const [sessionMinutes, setSessionMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Breathing Cycle Effect (Inhale 4s, Hold 4s, Exhale 4s)
  useEffect(() => {
    let breathInterval: NodeJS.Timeout | null = null;
    if (isActive) {
      breathInterval = setInterval(() => {
        setBreathPhase((prev) => {
          if (prev === "Inhale") return "Hold";
          if (prev === "Hold") return "Exhale";
          return "Inhale";
        });
      }, 4000);
    } else {
      setBreathPhase("Inhale");
    }
    return () => {
      if (breathInterval) clearInterval(breathInterval);
    };
  }, [isActive]);

  const selectDuration = (mins: number) => {
    setSessionMinutes(mins);
    setTimeLeft(mins * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4">
              <h2 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Curriculum Overview</h2>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">{data.overview.description}</p>
            </div>
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold">Programs & Disciplines</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Hatha Yoga", desc: "Static holds and alignment." },
                  { title: "Power Yoga", desc: "Aerobic strength flows." },
                  { title: "Vinyasa Flow", desc: "Breath-to-movement syncing." },
                  { title: "Yin Yoga", desc: "Deep fascial recovery stretches." }
                ].map((prog) => (
                  <div key={prog.title} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <h4 className="font-display text-sm font-bold text-neon">{prog.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{prog.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-neon/20">
              <h3 className="font-display text-xl font-bold text-neon">Program Stats</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Primary Goal</span>
                  <span className="font-bold">Flexibility & Recovery</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span className="font-bold text-neon">{data.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Sessions</span>
                  <span className="font-bold">Anytime / Self-guided</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Zen Meditation Timer */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-6 border border-neon/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon/5 via-transparent to-transparent pointer-events-none" />
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
                <Sparkles className="h-5 w-5 text-neon" /> Meditation & Pranayama Timer
              </h3>

              {/* Presets */}
              <div className="flex justify-center gap-2.5">
                {[2, 5, 10, 15].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => selectDuration(mins)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      sessionMinutes === mins && !isActive
                        ? "bg-neon text-black font-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {mins} Min
                  </button>
                ))}
              </div>

              {/* Breathing Circle Guide */}
              <div className="flex flex-col items-center justify-center py-6">
                <motion.div
                  animate={{
                    scale: isActive
                      ? breathPhase === "Inhale"
                        ? 1.35
                        : breathPhase === "Exhale"
                        ? 0.9
                        : 1.35
                      : 1.0,
                    boxShadow: isActive
                      ? breathPhase === "Inhale"
                        ? "0 0 40px rgba(57,255,20,0.3)"
                        : "0 0 10px rgba(57,255,20,0.1)"
                      : "0 0 0px rgba(57,255,20,0)"
                  }}
                  transition={{ duration: 4.0, ease: "easeInOut" }}
                  className="flex items-center justify-center h-40 w-40 rounded-full border border-neon/30 bg-neon/5"
                >
                  <div className="text-center">
                    <span className="text-xs uppercase tracking-widest text-white/50 block">
                      {isActive ? breathPhase : "ZEN STATE"}
                    </span>
                    <div className="text-3xl font-black font-mono mt-1">{formatTime(timeLeft)}</div>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                {!isActive ? (
                  <button
                    onClick={() => setIsActive(true)}
                    className="flex items-center gap-1.5 rounded-full bg-neon px-8 py-3 font-black text-black hover:opacity-90 neon-glow-btn transition"
                  >
                    <Play className="h-4 w-4 fill-black" /> START
                  </button>
                ) : (
                  <button
                    onClick={() => setIsActive(false)}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-8 py-3 font-bold text-white hover:bg-white/15 transition"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={() => selectDuration(sessionMinutes)}
                  className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-8 py-3 font-bold text-white/70 hover:bg-white/10 transition"
                >
                  <RotateCcw className="h-4 w-4" /> RESET
                </button>
              </div>
            </div>
          </div>

          {/* Posture Library */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Eye className="h-5 w-5 text-neon" /> Posture Library (Asanas)
            </h3>
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {poses.map((p) => (
                <div key={p.name} className="glass rounded-2xl p-4.5 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-base font-bold text-white">{p.name}</h4>
                    <span className="text-[10px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">{p.level}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{p.benefits}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Sattvic & Whole Foods</h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Yoga lifestyle encourages the intake of Sattvic (pure, vitalizing, light) foods. This keeps the physical vehicle clean, decreases joint stiffness, supports recovery, and reduces brain fog.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Whole Plants</strong>: High concentration of leafy greens, nuts, organic seeds, and fresh fruits to support cellular alkalinity and elasticity.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Mindful Eating</strong>: Savoring each chew slowly, supporting optimal gastric juices and reducing abdominal stress.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">Mindful Nutrition Plan</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Morning Cleanse</span>
                <span className="text-white/60">Warm lemon-water + ginger, followed by chia seed pudding</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Vitality Lunch</span>
                <span className="text-white/60">Quinoa bowl, steamed spinach, roasted butternut squash, raw pumpkin seeds</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Calming Dinner</span>
                <span className="text-white/60">Moong dal kitchari (easy digestion stew) + steamed green beans</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
            <span className="text-xs uppercase text-white/50 tracking-wider">Practice Frequency</span>
            <div className="text-3xl font-black text-neon">5 Days / Week</div>
            <span className="text-[10px] text-white/40">Highly consistent</span>
          </div>
          <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
            <span className="text-xs uppercase text-white/50 tracking-wider">Flexibility Index</span>
            <div className="text-3xl font-black text-white">+ 4.5 inches</div>
            <span className="text-[10px] text-white/40">Gained in hamstring/back stretch</span>
          </div>
          <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
            <span className="text-xs uppercase text-white/50 tracking-wider">Mindfulness Quotient</span>
            <div className="text-3xl font-black text-white">92 %</div>
            <span className="text-[10px] text-white/40">Self-reported stress reduction score</span>
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={trainerImg}
            alt="Elena Petrova"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">Yoga & Meditation Guide</span>
              <h3 className="font-display text-2xl font-black">Elena Petrova</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Elena trained in Rishikesh, India. She teaches restorative flows, vinyasa choreography, and mindfulness meditation.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">RYT-500 Certified</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">9 Years Exp</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10 flex items-center gap-1">
                <Star className="h-3 w-3 text-neon fill-neon" /> 4.9 Rating
              </span>
            </div>
            <button className="w-full rounded-full bg-neon py-3 text-sm font-black text-black hover:opacity-90 neon-glow-btn transition">
              Book Assessment Session
            </button>
          </div>
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Frequently Asked Questions</h3>
          <Accordion items={data.faqs} />
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Athlete Feedback</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {data.reviews.map((rev: any, i: number) => (
              <div key={i} className="glass rounded-3xl p-6 space-y-3.5 border border-white/5">
                <div className="flex justify-between items-center">
                  <h4 className="font-display text-base font-bold">{rev.name}</h4>
                  <div className="flex gap-0.5 text-neon">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-neon" />
                    ))}
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
