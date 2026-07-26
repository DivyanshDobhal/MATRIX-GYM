import { useState, useEffect } from "react";
import { LineChart } from "./shared/Charts";
import { Accordion } from "./shared/Accordion";
import { Trophy, Play, Pause, RotateCcw, Award, Star, List, Flame, Heart } from "lucide-react";
import trainerImg from "@/assets/trainer-3.jpg";

interface CrossFitDashboardProps {
  data: any;
  activeTab: string;
}

const wods = {
  "Murph": "For Time:\n• 1 Mile Run\n• 100 Pull-Ups\n• 200 Push-Ups\n• 300 Air Squats\n• 1 Mile Run\n(Wearing a 20lb/14lb vest)",
  "Fran": "21 - 15 - 9 Reps for Time:\n• Thrusters (95lbs / 65lbs)\n• Pull-Ups",
  "Helen": "3 Rounds for Time:\n• 400m Run\n• 21 Kettlebell Swings (1.5 pood / 1 pood)\n• 12 Pull-Ups",
  "Cindy": "20 Minute AMRAP (As Many Rounds As Possible):\n• 5 Pull-Ups\n• 10 Push-Ups\n• 15 Air Squats",
  "Grace": "30 Clean & Jerks for Time (135lbs / 95lbs)"
};

const personalRecords = [
  { movement: "Snatch", weight: "95 kg", date: "June 2026" },
  { movement: "Clean & Jerk", weight: "120 kg", date: "July 2026" },
  { movement: "Back Squat", weight: "160 kg", date: "May 2026" },
  { movement: "Deadlift", weight: "210 kg", date: "July 2026" }
];

export default function CrossFitDashboard({ data, activeTab }: CrossFitDashboardProps) {
  const [selectedWod, setSelectedWod] = useState<keyof typeof wods>("Murph");

  // Stopwatch States
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
              <h3 className="font-display text-xl font-bold">Training Pillars</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Olympic Lifting", desc: "Clean, jerk, snatch form details." },
                  { title: "Gymnastics", desc: "Rings, handstands, pull-up scaling." },
                  { title: "MetCon Conditioning", desc: "Aerobic & anaerobic thresholds." },
                  { title: "Joint Mobility", desc: "Prevent shoulder/hip restriction." }
                ].map((pillar) => (
                  <div key={pillar.title} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <h4 className="font-display text-sm font-bold text-neon">{pillar.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{pillar.desc}</p>
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
                  <span className="text-white/50">WOD frequency</span>
                  <span className="font-bold">Daily updates</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span className="font-bold text-neon">{data.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Duration</span>
                  <span className="font-bold">Ongoing cycles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* WOD details selector */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-5 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Benchmark WOD Library</h3>
            <div className="flex flex-wrap gap-2.5">
              {Object.keys(wods).map((wod) => (
                <button
                  key={wod}
                  onClick={() => setSelectedWod(wod as keyof typeof wods)}
                  className={`rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all ${
                    selectedWod === wod
                      ? "bg-neon text-black font-black"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {wod}
                </button>
              ))}
            </div>

            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-28 w-28 bg-neon/5 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-display text-xl font-bold text-neon">Workout {selectedWod}</h4>
              <pre className="mt-3 font-sans text-sm md:text-base leading-relaxed text-white/80 whitespace-pre-line">
                {wods[selectedWod]}
              </pre>
            </div>
          </div>

          {/* Stopwatch */}
          <div className="glass rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-neon/20 relative">
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold flex items-center gap-2">
                <Flame className="h-5 w-5 text-neon" /> WOD Stopwatch
              </h3>
              <div className="flex flex-col items-center py-6">
                <div className="text-4xl md:text-5xl font-black font-mono tracking-wider">{formatTime(time)}</div>
                <span className="text-xs text-white/40 uppercase tracking-widest mt-1">elapsed time</span>
              </div>
            </div>
            <div className="flex justify-center gap-2 pt-4">
              {!isRunning ? (
                <button
                  onClick={() => setIsRunning(true)}
                  className="flex items-center gap-1.5 rounded-full bg-neon px-6 py-2.5 text-xs font-black text-black hover:opacity-90 neon-glow-btn transition"
                >
                  <Play className="h-3.5 w-3.5 fill-black" /> START
                </button>
              ) : (
                <button
                  onClick={() => setIsRunning(false)}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/15 transition"
                >
                  <Pause className="h-3.5 w-3.5 fill-white" /> PAUSE
                </button>
              )}
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTime(0);
                }}
                className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-xs font-bold text-white/70 hover:bg-white/10 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" /> RESET
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">CrossFit Nutrition Strategy</h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              CrossFit requires both massive aerobic capacity and glycolytic output. Therefore, severe low-carb diets are generally discouraged. Carbohydrates are the primary substrate to drive high-intensity exercise.
            </p>
            <div className="space-y-3.5 pt-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Carbohydrate Density</strong>: Focus on clean starches (rice, sweet potatoes, oats) to sustain power outputs during metcons.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>High-Performance Protein</strong>: 2.0g per kg of bodyweight to rebuild shredded muscle fibers from gymnastics and lifting drills.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">WOD Recovery Meal Suggestions</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">WOD Recovery Shake</span>
                <span className="text-white/60">30g Whey + 50g Dextrose/Maltodextrin</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Performance Lunch</span>
                <span className="text-white/60">Flank steak, white rice, avocado, spinach</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Power Dinner</span>
                <span className="text-white/60">Baked cod, sweet potato mash, roasted zucchini</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
            <h3 className="font-display text-lg font-bold flex items-center gap-2 mb-4">
              <List className="h-4 w-4 text-neon" /> Personal Records (PR)
            </h3>
            <div className="space-y-3 text-sm flex-1 flex flex-col justify-center">
              {personalRecords.map((pr) => (
                <div key={pr.movement} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">{pr.movement}</span>
                  <span className="font-bold text-neon">{pr.weight} <span className="text-xs text-white/40">({pr.date})</span></span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-neon" /> Olympic Clean & Jerk Progression
            </h3>
            <LineChart
              data={[
                { label: "W1", value: 100 },
                { label: "W3", value: 102 },
                { label: "W5", value: 108 },
                { label: "W7", value: 110 },
                { label: "W9", value: 115 },
                { label: "W12", value: 120 }
              ]}
              ySuffix="kg"
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
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">CrossFit L-3 Trainer</span>
              <h3 className="font-display text-2xl font-black">Alex Miller</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Alex is a veteran competitor in regional functional fitness tournaments. He specializes in mechanical optimization for complex lifts (snatch, clean & jerk) and gymnastics efficiency.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">CrossFit L-3</span>
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
