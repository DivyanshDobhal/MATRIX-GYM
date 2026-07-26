import { useState, useEffect } from "react";
import { LineChart, BarChart } from "./shared/Charts";
import { Accordion } from "./shared/Accordion";
import { Flame, Play, Pause, RotateCcw, Clock, Award, Star, Activity, Sparkles } from "lucide-react";
import sarah from "@/assets/trainer-2.jpg";

interface HIITDashboardProps {
  data: any;
  activeTab: string;
}

const exerciseLibrary = [
  { name: "Burpees", estBurn: "12-15 kcal/min", desc: "Full-body plyometric movement targeting strength, stamina, and cardiovascular limit." },
  { name: "Jump Squats", estBurn: "10-12 kcal/min", desc: "Explosive lower-body exercise that targets power generation in the quadriceps and glutes." },
  { name: "Mountain Climbers", estBurn: "8-10 kcal/min", desc: "Core-stabilizing conditioning exercise that challenges rapid hip flexion and shoulder endurance." },
  { name: "Explosive Push Ups", estBurn: "9-11 kcal/min", desc: "Upper body power exercise focusing on chest and triceps fast-twitch muscle fibers." },
  { name: "Jump Lunges", estBurn: "11-13 kcal/min", desc: "High-intensity unilateral movement testing balance, leg power, and dynamic coordination." }
];

export default function HIITDashboard({ data, activeTab }: HIITDashboardProps) {
  // Timer States
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(15);
  const [rounds, setRounds] = useState(8);

  const [currentRound, setCurrentRound] = useState(1);
  const [timerMode, setTimerMode] = useState<"idle" | "work" | "rest" | "done">("idle");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);

  // Calculator States
  const [weight, setWeight] = useState(70);
  const [duration, setDuration] = useState(20);
  const [intensity, setIntensity] = useState("medium");
  const [burnedKcal, setBurnedKcal] = useState<number | null>(null);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (timeLeft > 1) {
          setTimeLeft((prev) => prev - 1);
        } else {
          // Timer state transition
          if (timerMode === "work") {
            setTimerMode("rest");
            setTimeLeft(restTime);
          } else if (timerMode === "rest") {
            if (currentRound < rounds) {
              setCurrentRound((prev) => prev + 1);
              setTimerMode("work");
              setTimeLeft(workTime);
            } else {
              setTimerMode("done");
              setIsActive(false);
            }
          }
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, timerMode, currentRound, rounds, workTime, restTime]);

  const startTimer = () => {
    if (timerMode === "idle" || timerMode === "done") {
      setTimerMode("work");
      setTimeLeft(workTime);
      setCurrentRound(1);
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimerMode("idle");
    setTimeLeft(workTime);
    setCurrentRound(1);
  };

  const calculateBurn = () => {
    // MET factor based on intensity
    const met = intensity === "low" ? 7 : intensity === "medium" ? 9 : 12;
    // Calorie formula: (MET * 3.5 * weight) / 200 * duration
    const burn = Math.round(((met * 3.5 * weight) / 200) * duration);
    setBurnedKcal(burn);
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
            {/* Workout types cards */}
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-display text-xl font-bold">HIIT Circuit Formats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Tabata Protocol", value: "20s Work / 10s Rest" },
                  { title: "AMRAP Conditioning", value: "As Many Rounds As Possible" },
                  { title: "EMOM Drills", value: "Every Minute On the Minute" },
                  { title: "Fat Oxidation", value: "HIIT heart-rate conditioning" },
                  { title: "Aerobic Intervals", value: "VO2 max targeted triggers" }
                ].map((type, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <h4 className="font-display text-sm font-bold text-neon">{type.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{type.value}</p>
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
                  <span className="text-white/50">Avg Calories Burn</span>
                  <span className="font-bold">400 - 700 kcal</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Duration</span>
                  <span className="font-bold">{data.duration}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span className="font-bold text-neon">{data.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Workout Duration</span>
                  <span className="font-bold">25 - 35 Mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* HIIT Timer widget */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-neon/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
                <Clock className="h-5 w-5 text-neon" /> HIIT Interval Timer
              </h3>

              {/* Timer Settings (only if idle) */}
              {timerMode === "idle" && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase text-white/50 tracking-wider">Work (sec)</label>
                    <input
                      type="number"
                      value={workTime}
                      onChange={(e) => {
                        setWorkTime(Number(e.target.value));
                        setTimeLeft(Number(e.target.value));
                      }}
                      className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-center text-white focus:border-neon focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-white/50 tracking-wider">Rest (sec)</label>
                    <input
                      type="number"
                      value={restTime}
                      onChange={(e) => setRestTime(Number(e.target.value))}
                      className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-center text-white focus:border-neon focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-white/50 tracking-wider">Rounds</label>
                    <input
                      type="number"
                      value={rounds}
                      onChange={(e) => setRounds(Number(e.target.value))}
                      className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-center text-white focus:border-neon focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Timer Display */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className={`relative flex items-center justify-center h-48 w-48 rounded-full border-4 ${
                  timerMode === "work" ? "border-neon shadow-[0_0_25px_rgba(57,255,20,0.25)]" :
                  timerMode === "rest" ? "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.25)]" : "border-white/10"
                } transition-all duration-300`}>
                  <div className="text-center">
                    <span className={`text-xs uppercase tracking-widest font-black ${
                      timerMode === "work" ? "text-neon" :
                      timerMode === "rest" ? "text-red-500" : "text-white/40"
                    }`}>
                      {timerMode === "idle" ? "READY" : timerMode === "work" ? "WORK" : timerMode === "rest" ? "REST" : "DONE!"}
                    </span>
                    <div className="text-5xl font-black font-display tracking-tight mt-1">{timeLeft}</div>
                    {timerMode !== "idle" && timerMode !== "done" && (
                      <span className="text-xs text-white/50 block mt-1">Round {currentRound} / {rounds}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-3">
                {!isActive ? (
                  <button
                    onClick={startTimer}
                    className="flex items-center gap-2 rounded-full bg-neon px-8 py-3 font-black text-black hover:opacity-90 neon-glow-btn transition"
                  >
                    <Play className="h-4 w-4 fill-black" /> START
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 py-3 font-bold text-white hover:bg-white/15 transition"
                  >
                    <Pause className="h-4 w-4 fill-white" /> PAUSE
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-3 font-bold text-white/70 hover:bg-white/10 transition"
                >
                  <RotateCcw className="h-4 w-4" /> RESET
                </button>
              </div>
            </div>
          </div>

          {/* Exercise Library */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Flame className="h-5 w-5 text-neon" /> Exercise Library
            </h3>
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
              {exerciseLibrary.map((ex) => (
                <div key={ex.name} className="glass rounded-2xl p-4.5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-base font-bold text-white">{ex.name}</h4>
                    <span className="text-[10px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">{ex.estBurn}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calorie Burn Calculator */}
          <div className="glass rounded-3xl p-6 md:p-8 space-y-5">
            <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
              <Flame className="h-5 w-5 text-neon" /> Calorie Burn Calculator
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase text-white/60 tracking-wider">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-neon focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase text-white/60 tracking-wider">Duration (min)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-neon focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-white/60 tracking-wider">Intensity Level</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[
                  { id: "low", label: "Low (Steady)" },
                  { id: "medium", label: "Medium (Intervals)" },
                  { id: "high", label: "High (Max Output)" }
                ].map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setIntensity(i.id)}
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                      intensity === i.id
                        ? "bg-neon text-black font-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateBurn}
              className="w-full rounded-full bg-neon py-3.5 font-black text-black hover:opacity-90 neon-glow-btn transition"
            >
              Calculate Burn
            </button>
          </div>

          {/* Results & HIIT Nutrition */}
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6">
            {burnedKcal !== null ? (
              <div className="text-center py-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                <span className="text-xs uppercase text-white/50 tracking-wider">Estimated Energy Expended</span>
                <div className="text-4xl font-black text-neon mt-1.5">{burnedKcal} kcal</div>
                <p className="text-[10px] text-white/40 mt-1 max-w-xs mx-auto">Calculated based on MET guidelines for cardiorespiratory interval drills.</p>
              </div>
            ) : null}

            <div className="space-y-4">
              <h4 className="font-display text-lg font-bold border-b border-white/5 pb-2">HIIT Nutrition Guideline</h4>
              <div className="space-y-3.5 text-xs md:text-sm">
                <div>
                  <h5 className="font-bold text-neon">Pre-Workout (1-2 Hours Before)</h5>
                  <p className="text-white/60 mt-0.5 leading-relaxed">High in complex carbs to fuel explosive output (e.g. banana with almond butter or oatmeal).</p>
                </div>
                <div>
                  <h5 className="font-bold text-neon">Post-Workout (Within 45 Min)</h5>
                  <p className="text-white/60 mt-0.5 leading-relaxed">Whey protein isolate combined with fast-digesting carbohydrates to restore glycogen levels quickly.</p>
                </div>
                <div>
                  <h5 className="font-bold text-neon">Hydration Strategy</h5>
                  <p className="text-white/60 mt-0.5 leading-relaxed">Consume at least 500ml water prior to training, and supplement with electrolytes during heavy conditioning blocks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Est. Calories Burned (Week)</span>
              <div className="text-3xl font-black text-neon">2,450 kcal</div>
              <span className="text-[10px] text-white/40">Across 4 HIIT circuits</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Avg Active Heart Rate</span>
              <div className="text-3xl font-black text-white flex justify-center items-center gap-1.5">
                <Activity className="h-6 w-6 text-neon" /> 162 bpm
              </div>
              <span className="text-[10px] text-white/40">Peak: 188 bpm (Zone 5)</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Heart Rate Recovery</span>
              <div className="text-3xl font-black text-white">-35 bpm</div>
              <span className="text-[10px] text-white/40">Reduction in first 60s of rest</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon" /> Weekly Active Burn Progression
            </h3>
            <BarChart
              data={[
                { label: "Mon", value: 450 },
                { label: "Tue", value: 0 },
                { label: "Wed", value: 580 },
                { label: "Thu", value: 420 },
                { label: "Fri", value: 0 },
                { label: "Sat", value: 650 },
                { label: "Sun", value: 0 }
              ]}
            />
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={sarah}
            alt="Sarah Jenkins"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">HIIT Specialist</span>
              <h3 className="font-display text-2xl font-black">Sarah Jenkins</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Sarah is an expert in VO2 Max development and anaerobic threshold conditioning. She has coached HIIT classes for 6 years, helping hundreds of clients drop fat rapidly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">NASM Certified</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">6 Years Exp</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10 flex items-center gap-1">
                <Star className="h-3 w-3 text-neon fill-neon" /> 4.8 Rating
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
