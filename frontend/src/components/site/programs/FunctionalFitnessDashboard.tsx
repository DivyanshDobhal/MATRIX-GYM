import { useState, useEffect } from "react";
import { BarChart } from "./shared/Charts";
import { Accordion } from "./shared/Accordion";
import { Zap, Play, RotateCcw, Award, Star, Activity, ShieldCheck } from "lucide-react";
import trainerImg from "@/assets/trainer-4.jpg";

interface FunctionalProps {
  data: any;
  activeTab: string;
}

const exercises = [
  { name: "Battle Rope Slams", category: "Power & Core", met: "Critical shoulder/hip stabilization under cyclical loading." },
  { name: "Farmer Carry", category: "Core & Grip Strength", met: "Heavy loaded carries testing posture, grip, and lateral pelvic control." },
  { name: "Medicine Ball Rotational Throws", category: "Rotational Power", met: "Transverse plane core acceleration and power transfer." },
  { name: "Sled Push/Pull", category: "Linear Power", met: "Concentric leg drive and metabolic force production without spinal shear." }
];

export default function FunctionalFitnessDashboard({ data, activeTab }: FunctionalProps) {
  // Reaction Time Test States
  const [testState, setTestState] = useState<"idle" | "waiting" | "click" | "result" | "early">("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const startReactionTest = () => {
    setTestState("waiting");
    setReactionTime(null);

    const delay = 1500 + Math.random() * 2500; // Random delay between 1.5s and 4s
    const tId = setTimeout(() => {
      setTestState("click");
      setStartTime(Date.now());
    }, delay);

    setTimerId(tId);
  };

  const handleClickPanel = () => {
    if (testState === "waiting") {
      // Clicked too early
      if (timerId) clearTimeout(timerId);
      setTestState("early");
    } else if (testState === "click") {
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      setReactionTime(elapsed);
      setTestState("result");
    }
  };

  const getReactionFeedback = (timeMs: number) => {
    if (timeMs < 200) return { label: "Elite (Athlete)", color: "text-neon" };
    if (timeMs < 280) return { label: "Excellent (Above Average)", color: "text-green-400" };
    if (timeMs < 380) return { label: "Good (Average)", color: "text-yellow-400" };
    return { label: "Needs Training", color: "text-red-400" };
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
              <h3 className="font-display text-xl font-bold">Workout Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Core Stability", value: "Anti-rotation & bracing." },
                  { title: "Agility Drills", value: "Rapid multi-planar acceleration." },
                  { title: "Joint Mobility", desc: "Unlock structural ROM." },
                  { title: "Rotational Power", value: "Transverse plane drive." }
                ].map((cat, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <h4 className="font-display text-sm font-bold text-neon">{cat.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{cat.value || cat.desc}</p>
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
                  <span className="text-white/50">Primary Focus</span>
                  <span className="font-bold">Mobility & Balance</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span className="font-bold text-neon">{data.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Duration</span>
                  <span className="font-bold">{data.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reaction time test */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-5 border border-neon/20 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
                <Zap className="h-5 w-5 text-neon" /> Reaction Time Test
              </h3>
              <p className="text-xs text-white/60">
                Measure your neuromuscular activation speed. Click the panel as soon as it changes color to green!
              </p>

              {/* Interaction Panel */}
              <div
                onClick={handleClickPanel}
                className={`h-48 rounded-2xl flex items-center justify-center cursor-pointer select-none transition-all duration-200 border border-white/10 ${
                  testState === "idle" ? "bg-white/[0.02] hover:bg-white/5" :
                  testState === "waiting" ? "bg-red-950/80 animate-pulse border-red-500/30" :
                  testState === "click" ? "bg-neon text-black font-black" :
                  testState === "early" ? "bg-amber-950/80 border-amber-500/30" :
                  "bg-green-950/80 border-green-500/30"
                }`}
              >
                <div className="text-center px-4">
                  {testState === "idle" && (
                    <span className="text-sm font-bold text-white/70">Click "START TEST" below to begin</span>
                  )}
                  {testState === "waiting" && (
                    <span className="text-lg font-black text-red-400 tracking-wider">WAIT FOR GREEN...</span>
                  )}
                  {testState === "click" && (
                    <span className="text-xl font-black tracking-widest text-black">CLICK NOW!</span>
                  )}
                  {testState === "early" && (
                    <div className="space-y-1">
                      <span className="text-lg font-black text-amber-400 block">TOO EARLY!</span>
                      <span className="text-xs text-white/50">Wait for the green signal before clicking.</span>
                    </div>
                  )}
                  {testState === "result" && reactionTime !== null && (
                    <div className="space-y-2">
                      <span className="text-xs text-white/50 block uppercase tracking-widest">Your Reaction Speed</span>
                      <div className="text-4xl font-black text-neon">{reactionTime} ms</div>
                      <span className={`text-xs font-black uppercase tracking-wider ${getReactionFeedback(reactionTime).color}`}>
                        {getReactionFeedback(reactionTime).label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-4">
              <button
                onClick={startReactionTest}
                className="flex items-center gap-1.5 rounded-full bg-neon px-6 py-2.5 text-xs font-black text-black hover:opacity-90 neon-glow-btn transition"
              >
                <Play className="h-3.5 w-3.5 fill-black" /> START TEST
              </button>
              <button
                onClick={() => {
                  setTestState("idle");
                  setReactionTime(null);
                }}
                className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-xs font-bold text-white/70 hover:bg-white/10 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" /> RESET
              </button>
            </div>
          </div>

          {/* Exercises list */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-neon" /> Functional Exercises
            </h3>
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {exercises.map((ex) => (
                <div key={ex.name} className="glass rounded-2xl p-4.5 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-base font-bold text-white">{ex.name}</h4>
                    <span className="text-[10px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">{ex.category}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{ex.met}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Functional Fueling</h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Functional fitness targets cellular energy efficiency, cardiovascular output, and joint recovery. Nutrition centers around high-quality micronutrients, lean proteins, and structural recovery fats.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Anti-Inflammatory Intake</strong>: Consume clean omega-3 fats (salmon, walnuts, chia seeds) to support connective tissue and joint flexibility.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Hydration Density</strong>: Support connective fluid structures and prevent cramps by supplementing with potassium, magnesium, and trace minerals.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">Functional Meal Plan Guidelines</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Breakfast</span>
                <span className="text-white/60">Scrambled eggs, avocado, spinach, organic berries</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Lunch</span>
                <span className="text-white/60">Grilled turkey breast, wild rice, steamed mixed greens</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Dinner</span>
                <span className="text-white/60">Baked trout, quinoa, roasted asparagus</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Functional Balance Score</span>
              <div className="text-3xl font-black text-neon">88 / 100</div>
              <span className="text-[10px] text-white/40">Excellent stability</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Avg Reaction Speed</span>
              <div className="text-3xl font-black text-white flex justify-center items-center gap-1.5">
                <Activity className="h-6 w-6 text-neon" /> 235 ms
              </div>
              <span className="text-[10px] text-white/40">Top 15% in age group</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Power output Index</span>
              <div className="text-3xl font-black text-white">412 W</div>
              <span className="text-[10px] text-white/40">Tested via Sled force run</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon" /> Power & Stability Score (10 Weeks)
            </h3>
            <BarChart
              data={[
                { label: "Week 1", value: 62 },
                { label: "Week 3", value: 68 },
                { label: "Week 5", value: 74 },
                { label: "Week 7", value: 80 },
                { label: "Week 10", value: 88 }
              ]}
            />
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={trainerImg}
            alt="Coach Tyler Vance"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">Functional Biomechanist</span>
              <h3 className="font-display text-2xl font-black">Tyler Vance</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Tyler holds a Master's degree in Biomechanics. He specializes in posture correction, stabilization dynamics, and athletic agility.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">Certified Biomechanist</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">10 Years Exp</span>
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
