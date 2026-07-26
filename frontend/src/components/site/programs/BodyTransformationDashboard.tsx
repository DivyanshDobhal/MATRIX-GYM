import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { LineChart } from "./shared/Charts";
import { Accordion } from "./shared/Accordion";
import { Sparkles, Calendar, Activity, Star, Eye } from "lucide-react";
import trainerImg from "@/assets/trainer-3.jpg";
import beforeImg from "@/assets/gallery-1.jpg";
import afterImg from "@/assets/gallery-6.jpg";

interface TransformationProps {
  data: any;
  activeTab: string;
}

const milestones = [
  { week: "Week 1", title: "Assessment & Baseline", desc: "Define starting body composition (fat %, lean muscle), calibrate caloric deficit or surplus targets, and master core lifting form." },
  { week: "Week 4", title: "Metabolic Adaptation", desc: "Introduce density training to increase metabolic rate. Re-assess macro response and fine-tune cardiorespiratory zones." },
  { week: "Week 8", title: "Hypertrophy Acceleration", desc: "Increase resistance loading while shifting caloric split. Deep focus on high-protein meal density to protect lean muscle mass." },
  { week: "Week 12", title: "Peak Recomposition", desc: "Final measurements check. Switch to a maintenance protocol to lock in the new metabolic setpoint for long-term sustainability." }
];

export default function BodyTransformationDashboard({ data, activeTab }: TransformationProps) {
  // Timeline selection
  const [activeWeek, setActiveWeek] = useState("Week 1");

  // Before / After Slider States
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
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
              <h3 className="font-display text-xl font-bold">Transformation Milestones</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {milestones.map((ms) => (
                  <div
                    key={ms.week}
                    onClick={() => setActiveWeek(ms.week)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                      activeWeek === ms.week
                        ? "bg-neon/5 border-neon/50 shadow-[0_0_15px_rgba(57,255,20,0.15)]"
                        : "bg-white/[0.02] border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] uppercase font-black text-neon tracking-widest">{ms.week}</span>
                      <Calendar className="h-4 w-4 text-white/40" />
                    </div>
                    <h4 className="font-display text-base font-bold text-white">{ms.title}</h4>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{ms.desc}</p>
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
                  <span className="font-bold">Body Recomposition</span>
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
          {/* Timeline slider checklist */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-5 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Transformation Phase Schedule</h3>
            <div className="flex gap-2 border-b border-white/5 pb-4">
              {milestones.map((ms) => (
                <button
                  key={ms.week}
                  onClick={() => setActiveWeek(ms.week)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    activeWeek === ms.week
                      ? "bg-neon text-black font-black"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {ms.week}
                </button>
              ))}
            </div>

            {/* Selected Phase Details */}
            {(() => {
              const ms = milestones.find((m) => m.week === activeWeek)!;
              return (
                <div className="space-y-4 bg-black/50 border border-white/10 rounded-2xl p-6">
                  <span className="text-[10px] uppercase font-black text-neon tracking-widest">{ms.week} Blueprint</span>
                  <h4 className="font-display text-xl font-bold">{ms.title}</h4>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">{ms.desc}</p>
                </div>
              );
            })()}
          </div>

          {/* Interactive Before/After Split slider */}
          <div className="glass rounded-3xl p-6 border border-neon/20 flex flex-col justify-between">
            <h3 className="font-display text-lg font-bold flex items-center gap-2 mb-3">
              <Eye className="h-4 w-4 text-neon" /> Interactive Recomp Slider
            </h3>
            <p className="text-xs text-white/50 mb-4">Drag across the canvas to view simulated body composition changes.</p>

            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-square w-full rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 select-none"
            >
              {/* After image (Background) */}
              <img
                src={afterImg}
                alt="After transformation"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              />
              <span className="absolute bottom-3 right-3 z-10 text-[9px] uppercase tracking-wider font-black bg-neon text-black px-2 py-0.5 rounded">After</span>

              {/* Before image (Foreground, clipped based on slider) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={beforeImg}
                  alt="Before transformation"
                  className="absolute inset-y-0 left-0 h-full max-w-none object-cover"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                />
              </div>
              <span className="absolute bottom-3 left-3 z-10 text-[9px] uppercase tracking-wider font-bold bg-black/70 text-white/70 px-2 py-0.5 rounded">Before</span>

              {/* Sliding Line Indicator */}
              <div
                className="absolute inset-y-0 w-0.5 bg-neon pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-neon shadow-[0_0_12px_rgba(57,255,20,0.5)] border-2 border-black flex items-center justify-center text-[10px] font-black text-black">
                  ↔
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Recomposition Fueling</h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Body recomposition focuses on shedding adipose fat tissue while depositing dense skeletal muscle. Calorie intake is structured closely to training days vs rest days.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Training Days</strong>: Calorie intake is set to slight surplus/maintenance, with high clean carb density surrounding lifting slots.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Rest Days</strong>: Calorie intake drops to a deficit, with carbs scaled back while protein remains exceptionally high to prevent catabolism.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">Meal Schedule Sample</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Training Day Breakfast</span>
                <span className="text-white/60">Oatmeal, 5 egg whites, scoop of blueberries</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Rest Day Breakfast</span>
                <span className="text-white/60">Avocado toast, 4 egg whites, black coffee</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Daily Protein Target</span>
                <span className="text-white/60">2.2g per kg of total body weight</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Weight Loss</span>
              <div className="text-3xl font-black text-neon">- 6.4 kg</div>
              <span className="text-[10px] text-white/40">Since Week 1</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Lean Muscle Gained</span>
              <div className="text-3xl font-black text-white">+ 2.2 kg</div>
              <span className="text-[10px] text-white/40">Tested via DEXA scan</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Body Fat Reduction</span>
              <div className="text-3xl font-black text-white">- 4.8 %</div>
              <span className="text-[10px] text-white/40">Current: 12.2%</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon" /> Body Fat % Reduction Timeline (12 Weeks)
            </h3>
            <LineChart
              data={[
                { label: "W1", value: 17.0 },
                { label: "W3", value: 16.2 },
                { label: "W5", value: 15.0 },
                { label: "W7", value: 14.1 },
                { label: "W9", value: 13.0 },
                { label: "W12", value: 12.2 }
              ]}
              ySuffix="%"
            />
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={trainerImg}
            alt="Coach Alex Miller"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">Recomposition Coach</span>
              <h3 className="font-display text-2xl font-black">Alex Miller</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Alex Miller focuses on macro budgeting and progressive splits. He has guided over 300 successful recomposition transformations.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">FAS Certified</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">7 Years Exp</span>
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
