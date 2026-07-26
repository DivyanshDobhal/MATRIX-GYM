import { useState } from "react";
import { LineChart } from "./shared/Charts";
import { Accordion } from "./shared/Accordion";
import { Activity, Trophy, Heart, Star } from "lucide-react";
import trainerImg from "@/assets/trainer-1.jpg";

interface CardioProps {
  data: any;
  activeTab: string;
}

const challenges = [
  { title: "5K Speed Run", metric: "Under 22 Mins", desc: "Build anaerobic endurance and leg turnover frequency." },
  { title: "10K Aerobic Base Build", metric: "Zone 2 - 60 Mins", desc: "Build mitochondria density and steady state cardiorespiratory base." },
  { title: "Half Marathon Pace Trial", metric: "21.1 km pacing run", desc: "Test glycolytic efficiency and musculoskeletal endurance over distance." }
];

export default function CardioDashboard({ data, activeTab }: CardioProps) {
  // Target Heart Rate States
  const [age, setAge] = useState(25);
  const [restHR, setRestHR] = useState(60);
  const [zones, setZones] = useState<any>(null);

  const calculateZones = () => {
    // Karvonen Formula
    const maxHR = 220 - age;
    const hrr = maxHR - restHR;

    const calcZone = (minPct: number, maxPct: number) => {
      const min = Math.round(hrr * minPct + restHR);
      const max = Math.round(hrr * maxPct + restHR);
      return `${min} - ${max} bpm`;
    };

    setZones({
      maxHR,
      zone1: calcZone(0.5, 0.6), // Warm up
      zone2: calcZone(0.6, 0.7), // Fat Burn / Aerobic Base
      zone3: calcZone(0.7, 0.8), // Tempo / Aerobic Capacity
      zone4: calcZone(0.8, 0.9), // Anaerobic Threshold
      zone5: calcZone(0.9, 1.0)  // Max Effort
    });
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
              <h3 className="font-display text-xl font-bold">Cardio Modalities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Zone 2 Running", desc: "Aerobic cellular base development." },
                  { title: "Sprint Intervals", desc: "VO2 max explosive capacity spikes." },
                  { title: "Rowing Conditioning", desc: "Full-body low-impact endurance." },
                  { title: "Indoor Cycling", desc: "Leg speed stamina and high calorie oxidation." }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <h4 className="font-display text-sm font-bold text-neon">{card.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{card.desc}</p>
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
                  <span className="font-bold">VO2 Max & Aerobic Engine</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span className="font-bold text-neon">{data.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Intensity tracking</span>
                  <span className="font-bold">Heart Rate Zones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Heart rate zone calculator */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-5 border border-neon/20">
            <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
              <Heart className="h-5 w-5 text-neon" /> Karvonen Target Heart Rate Calculator
            </h3>
            <p className="text-xs text-white/60">
              Compute your personalized cardiorespiratory target zones based on age and resting pulse values.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase text-white/60 tracking-wider">Age (years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-neon focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-white/60 tracking-wider">Resting Heart Rate (BPM)</label>
                <input
                  type="number"
                  value={restHR}
                  onChange={(e) => setRestHR(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-neon focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={calculateZones}
              className="w-full rounded-full bg-neon py-3.5 font-black text-black hover:opacity-90 neon-glow-btn transition"
            >
              Calculate Target Zones
            </button>

            {zones && (
              <div className="border-t border-white/5 pt-5 space-y-3.5">
                <h4 className="font-display text-base font-bold text-white/80">Your Cardiac Target Zones (Max HR: {zones.maxHR} bpm)</h4>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/60">Zone 1 (Active Recovery / Warm Up)</span>
                    <span className="font-bold text-neon">{zones.zone1}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/60 font-bold text-green-400">Zone 2 (Aerobic Base / Fat Burn)</span>
                    <span className="font-bold text-green-400">{zones.zone2}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/60">Zone 3 (Tempo / Aerobic Capacity)</span>
                    <span className="font-bold text-neon">{zones.zone3}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/60">Zone 4 (Threshold / Lactate Limit)</span>
                    <span className="font-bold text-neon">{zones.zone4}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-white/60 font-bold text-red-400">Zone 5 (Max Output / VO2 spikes)</span>
                    <span className="font-bold text-red-400">{zones.zone5}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Running Challenges */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-neon" /> Endurance Challenges
            </h3>
            <div className="space-y-3.5">
              {challenges.map((c) => (
                <div key={c.title} className="glass rounded-2xl p-4.5 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-base font-bold text-white">{c.title}</h4>
                    <span className="text-[10px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">{c.metric}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Aerobic Nutrition</h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Aerobic exercise relies on steady fatty acid oxidation and liver glycogen conversion. To prevent hitting "the wall" during half marathons or endurance rows, strategic pre-run fueling is vital.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Glycogen Storage</strong>: Consume complex carbohydrates prior to long runs to fully saturate muscle glycogen stores.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Electrolyte Saturation</strong>: Maintain cellular fluid volume by supplementing with sodium, potassium, and magnesium.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">Endurance Meal Guidelines</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Pre-Endurance (2H before)</span>
                <span className="text-white/60">Oatmeal, honey, sliced banana</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Post-Endurance (Within 1H)</span>
                <span className="text-white/60">Turkey sandwich, sweet potatoes, green tea</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Steady Hydration</span>
                <span className="text-white/60">400ml electrolyte water every hour of heavy output</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Resting Heart Rate</span>
              <div className="text-3xl font-black text-neon">54 bpm</div>
              <span className="text-[10px] text-white/40">Highly conditioned</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">VO2 Max Score</span>
              <div className="text-3xl font-black text-white">48.2 ml/kg/min</div>
              <span className="text-[10px] text-white/40">Top 10% in age group</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Weekly Run Distance</span>
              <div className="text-3xl font-black text-white">32.4 km</div>
              <span className="text-[10px] text-white/40">Average pace: 4:55 / km</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon" /> VO2 Max Engine Progression (12 Weeks)
            </h3>
            <LineChart
              data={[
                { label: "W1", value: 42.0 },
                { label: "W3", value: 43.5 },
                { label: "W5", value: 44.8 },
                { label: "W7", value: 46.0 },
                { label: "W9", value: 47.1 },
                { label: "W12", value: 48.2 }
              ]}
              ySuffix=" ml"
            />
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={trainerImg}
            alt="Coach Marcus Vance"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">Endurance Coach</span>
              <h3 className="font-display text-2xl font-black">Marcus Vance</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Marcus Vance is a competitive marathon runner and cardiovascular physiology specialist. He specializes in pacing strategies and lactate threshold development.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">USATF L-2 Coach</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">8 Years Exp</span>
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
