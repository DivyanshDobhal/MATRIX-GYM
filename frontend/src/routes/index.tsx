import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/site/Hero";
import { useCountUp } from "@/hooks/useCountUp";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Activity, GlassWater, Trophy, MessageSquare, Send, Check, Sparkles,
  Award, Brain, Heart, Info, Clock, Dumbbell, ShieldAlert, Cpu, HeartPulse,
  Scale, Calculator, ChevronRight, ChevronLeft, ArrowRight, Play, BookOpen, Star
} from "lucide-react";
import { toast } from "sonner";
import ChatAssistantDashboard from "@/components/MatrixAI/ChatAssistantDashboard";

// Import local image assets for testimonials and highlights
import beforeImg from "@/assets/gallery-5.jpg";
import afterImg from "@/assets/gallery-1.jpg";
import blogImg1 from "@/assets/prog-strength.jpg";
import blogImg2 from "@/assets/prog-hiit.jpg";
import blogImg3 from "@/assets/prog-yoga.jpg";

export const Route = createFileRoute("/")({
  component: PremiumLandingPage
});

function CounterItem({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const { value, ref } = useCountUp(end);
  return (
    <div className="glass rounded-3xl p-6.5 text-center border border-white/5">
      <div className="flex items-baseline justify-center gap-0.5">
        <span ref={ref} className="font-display text-4xl font-black text-white">
          {value.toLocaleString()}
        </span>
        <span className="text-neon font-black text-2xl">{suffix}</span>
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</p>
    </div>
  );
}

function PremiumLandingPage() {
  // BMI Calculator States
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  // Chatbot state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", text: "Hello! I am MATRIX AI. Ask me about custom conditioning splits, calorie limits, or recovery schedules." }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Workout Challenge States
  const [challengeActive, setChallengeActive] = useState(false);
  const [challengeTime, setChallengeTime] = useState(60); // 60s plank countdown
  const [challengeStreak, setChallengeStreak] = useState(5);

  // Blog states
  const blogs = [
    { title: "Zone 5 Cardio Intervals", cat: "Training", img: blogImg2, desc: "How to engineer maximal oxygen uptake (VO2 Max) using periodized HIIT protocols." },
    { title: "Biomechanical Recovery Guide", cat: "Recovery", img: blogImg3, desc: "Prevent joint friction and decompress tissues post-workout." },
    { title: "Macro Tuning for Lean Mass", cat: "Nutrition", img: blogImg1, desc: "A structural breakdown of lean protein and carbohydrate timing schedules." }
  ];

  // Testimonial slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    { name: "Vikram Malhotra", loss: "-18 kg", fat: "-12% Body Fat", desc: "The biomechanical coaching splits completely revolutionized my posture and raw bench volumes.", rating: 5 },
    { name: "Anjali Sen", loss: "+6 kg Muscle", fat: "-4% Body Fat", desc: "The nutrition guides and structured lifting routines enabled me to rebuild core stability.", rating: 5 }
  ];

  // Smart feature modal state
  const [activeModalFeature, setActiveModalFeature] = useState<string | null>(null);

  const smartFeaturesList: Record<string, { title: string; desc: string; tech: string }> = {
    "ai-workout": { title: "AI Workout Generator", desc: "Calculates optimal hypertrophy angles and progressive overload volumes based on historic logged repetitions.", tech: "Neural Networks" },
    "wearable-sync": { title: "Wearable Sync Engine", desc: "Ingests real-time telemetry inputs from Apple Watch, Google Fit, and Garmin to track active cardiovascular zones.", tech: "Telemetry Pipeline" },
    "recovery-analytics": { title: "Recovery Analytics Desk", desc: "Evaluates Heart Rate Variability (HRV) logs to score ready-state muscle recovery prior to strength loading.", tech: "HRV Biometrics" },
    "progress-tracking": { title: "Smart Progress Logs", desc: "Tracks total tonnage lifted, body water composition, and skeletal muscle masses across interactive graphs.", tech: "Structured Databases" },
    "nutrition-intelligence": { title: "Nutrition Intelligence", desc: "Recommends custom macro targets and hydration quotas aligned with immediate athletic training intensities.", tech: "Dynamic Scaling" },
    "mobile-ecosystem": { title: "Mobile Ecosystem", desc: "Provides turnstile entry QR passes, class reservation schedulers, and direct coach message logs.", tech: "SaaS Application" }
  };

  // Chat triggers
  const chatSuggestions = [
    "Create a muscle gain plan",
    "Calculate daily calories",
    "Suggest flexibility workout",
    "Active recovery timing tips"
  ];

  // Daily Challenge timer effect
  useEffect(() => {
    let t: any;
    if (challengeActive && challengeTime > 0) {
      t = setInterval(() => setChallengeTime((c) => c - 1), 1000);
    } else if (challengeTime === 0) {
      setChallengeActive(false);
      setChallengeStreak((s) => s + 1);
      toast.success("Plank challenge complete! Streak extended! 🔥");
      setChallengeTime(60);
    }
    return () => clearInterval(t);
  }, [challengeActive, challengeTime]);

  const handleAskAi = (text: string) => {
    if (!text.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = "I will adjust your conditioning routine to reflect this. Do you have any baseline hydration updates?";
      if (text.includes("muscle gain")) {
        reply = "For hypertrophy, target 4 working sets of 8-12 reps per movement at 75-80% 1RM. Maintain protein above 2g/kg.";
      } else if (text.includes("calories")) {
        reply = "Based on active recovery metrics, target 2,400 kcal on active lifting days, and drop to 1,900 kcal on rest days.";
      } else if (text.includes("flexibility")) {
        reply = "Incorporate 15 minutes of dynamic stretching post-workout, targeting hip flexors and thoracic extensions.";
      }
      setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsAiTyping(false);
    }, 1000);
  };

  const handleCalculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const hMeters = height / 100;
    const result = weight / (hMeters * hMeters);
    setBmiResult(Number(result.toFixed(1)));
    toast.success("BMI Calculated successfully!");
  };

  return (
    <PageLayout>
      {/* 1. Premium Hero section */}
      <Hero />

      {/* 2. 3D Experience Grid Representation */}
      <section className="py-24 bg-charcoal border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-neon font-bold">Pro Training Gear</span>
            <h3 className="font-display text-3xl font-black mt-2">Elite Gym Equipment</h3>
            <p className="text-xs text-white/50 mt-1">Hover over our professional gym equipment to explore their training benefits.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: "Chrome Dumbbell", desc: "Isolate muscles for targeted hypertrophy.", icon: Dumbbell },
              { label: "Olympic Barbell", desc: "Build raw strength with heavy compound lifts.", icon: Activity },
              { label: "Kettlebell", desc: "Improve functional power and endurance.", icon: Flame },
              { label: "Hydration Flask", desc: "Maintain peak performance and hydration.", icon: GlassWater },
              { label: "Trophy Badge", desc: "Crush your personal records.", icon: Trophy }
            ].map((obj, i) => (
              <div
                key={i}
                className="group relative bg-white/[0.01] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-neon hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all duration-300 h-44"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-neon/5 border border-neon/10 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-neon group-hover:text-black transition-all duration-300 text-neon">
                  <obj.icon className="h-7 w-7" />
                </div>
                <h4 className="font-display text-xs font-bold text-white mt-4">{obj.label}</h4>

                {/* Hover Tooltip */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-[9px] text-white/60 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-36 shadow-lg leading-tight z-10">
                  {obj.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Transformation Counter */}
      <section className="py-16 bg-charcoal-2 border-b border-white/5 select-none">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <CounterItem end={42000} suffix=" kg" label="Weight Lost" />
          <CounterItem end={125} suffix="M" label="Calories Burned" />
          <CounterItem end={600000} suffix="+" label="Classes Completed" />
          <CounterItem end={15000} suffix="+" label="Members Joined" />
        </div>
      </section>

      {/* 4. Interactive Fitness Journey Timeline */}
      <section className="py-24 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-neon font-bold">Flow roadmap</span>
            <h3 className="font-display text-3xl font-black mt-2">The Conditioning Path</h3>
          </div>

          <div className="overflow-x-auto scrollbar-none pb-4">
            <div className="flex justify-between items-start gap-4 min-w-[900px] relative pt-8">
              {/* Central Connection line */}
              <div className="absolute top-14 inset-x-0 h-0.5 bg-white/5 -z-10" />

              {[
                { step: "01", name: "Choose Goal", desc: "Determine hypertrophy or fat-loss goals." },
                { step: "02", name: "Assessment", desc: "Biomarker body fat and posture checks." },
                { step: "03", name: "Personal Plan", desc: "Coaches build volume progression cards." },
                { step: "04", name: "Workout", desc: "Sensor-linked gym lifts with rep counts." },
                { step: "05", name: "Nutrition", desc: "Calorie and macro distribution profiles." },
                { step: "06", name: "Track Progress", desc: "Weekly biometric updates and charts." },
                { step: "07", name: "Transformation", desc: "Physical results, structural strength." }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 text-center space-y-3 relative group">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-charcoal border-2 border-white/10 text-white font-black group-hover:border-neon group-hover:text-neon transition">
                    {item.step}
                  </div>
                  <h4 className="font-display text-xs font-bold text-white mt-2">{item.name}</h4>
                  <p className="text-[10px] text-white/40 leading-relaxed max-w-[120px] mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Fitness Assistant */}
      <section className="py-24 bg-charcoal-2 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-neon font-bold flex items-center justify-center gap-1.5">
              <Brain className="h-4 w-4" /> MATRIX CO-PILOT
            </span>
            <h3 className="font-display text-3xl font-black mt-2">Chat with MATRIX AI</h3>
            <p className="text-xs text-white/50 mt-1">
              Ask your elite conversational AI coach about routines, exercises, meals, or check in with general questions.
            </p>
          </div>

          <div className="glass rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
            <ChatAssistantDashboard />
          </div>
        </div>
      </section>

      {/* 6. Daily Workout Challenge */}
      <section className="py-24 bg-charcoal">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center">
          {/* Challenge content */}
          <div className="glass rounded-3xl p-6.5 border border-neon/20 space-y-4">
            <span className="text-[9px] uppercase tracking-widest text-neon font-black bg-neon/10 border border-neon/20 px-2 py-0.5 rounded inline-block">
              Daily Challenge
            </span>
            <h3 className="font-display text-xl font-bold text-white">Workout of the Day (WOD)</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Hit this micro-workout challenge right now and log your streak score:
            </p>
            <div className="space-y-2 text-xs font-semibold text-white/90">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon" /> 20 Explosive Pushups
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon" /> 30 Air Squats
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neon" /> 60-Second Iso Plank Hold
              </div>
            </div>

            <button
              onClick={() => setChallengeActive(true)}
              disabled={challengeActive}
              className="w-full rounded-full bg-neon py-3 text-xs font-black text-black uppercase tracking-wider neon-glow-btn transition"
            >
              {challengeActive ? `Challenge Active (${challengeTime}s)` : "Start Challenge"}
            </button>
          </div>

          {/* Timer and Streak details */}
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <div className="relative h-36 w-36 rounded-full border border-white/10 flex items-center justify-center bg-black/30">
              <div className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: "12s" }} />
              <div>
                <span className="text-3xl font-black font-display text-white">{challengeTime}</span>
                <span className="text-[9px] uppercase text-white/40 block mt-0.5 font-bold">seconds remaining</span>
              </div>
            </div>

            <div className="text-xs">
              Challenge Streak: <strong className="text-neon font-black">{challengeStreak} Days 🔥</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community section summary (Teaser to Stories) */}
      <section className="py-24 bg-charcoal-2 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
          <div className="flex justify-between items-end">
            <div className="max-w-md">
              <span className="text-xs uppercase tracking-widest text-neon font-black">Community</span>
              <h3 className="font-display text-3xl font-black text-white mt-1">Matrix Ecosystem Logs</h3>
            </div>
            <Link
              to="/stories"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black text-neon uppercase tracking-wider hover:underline"
            >
              View More Stories <ChevronRight className="h-4.5 w-4.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-56">
              <h4 className="font-display text-lg font-bold text-white">Transformation Preview</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Review Anjali Sen's metabolic results. Lean muscle gained +6 kg in four months of conditioning.
              </p>
              <Link to="/stories" className="text-xs font-bold text-neon uppercase tracking-wider hover:underline">
                View Transformation →
              </Link>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-56">
              <h4 className="font-display text-lg font-bold text-white">Fitness Challenges</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Rowing sprint trials and volume weightlifting challenge runs. Compete live with members this Saturday.
              </p>
              <Link to="/stories" className="text-xs font-bold text-neon uppercase tracking-wider hover:underline">
                Explore Challenges →
              </Link>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-56">
              <h4 className="font-display text-lg font-bold text-white">Upcoming Events</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Biomechanical stretching seminars and community CrossFit WOD meets led by Arjun Mehta.
              </p>
              <Link to="/stories" className="text-xs font-bold text-neon uppercase tracking-wider hover:underline">
                Explore Events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Smart Features Icon Grid */}
      <section className="py-24 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-neon font-bold">Biometrics Architecture</span>
            <h3 className="font-display text-3xl font-black mt-2">Smart Features Grid</h3>
            <p className="text-xs text-white/50 mt-1">Click any hardware icon to review technical parameters.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
            {[
              { id: "ai-workout", label: "AI Workouts", icon: Brain },
              { id: "wearable-sync", label: "Wearable Sync", icon: Cpu },
              { id: "recovery-analytics", label: "Recovery HRV", icon: HeartPulse },
              { id: "progress-tracking", label: "Tonnage Logs", icon: Scale },
              { id: "nutrition-intelligence", label: "Macro Engine", icon: Calculator },
              { id: "mobile-ecosystem", label: "Mobile Pass", icon: MessageSquare }
            ].map((f) => (
              <div
                key={f.id}
                onClick={() => setActiveModalFeature(f.id)}
                className="group bg-white/[0.01] border border-white/5 rounded-2xl p-4.5 text-center cursor-pointer hover:border-neon hover:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition flex flex-col items-center justify-center h-32"
              >
                <f.icon className="h-6 w-6 text-neon group-hover:scale-110 transition" />
                <h4 className="font-display text-xs font-bold text-white mt-3.5 leading-tight">{f.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Premium Video Banner Placeholder */}
      <section className="relative h-[280px] w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Visual loading/pulsing outline simulating a slow-motion video feed */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
        <div className="absolute inset-0 bg-neon/5 animate-pulse select-none flex items-center justify-center">
          <Play className="h-10 w-10 text-neon filter drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]" />
        </div>
        <div className="relative z-20 text-center max-w-xl px-6 space-y-2">
          <h4 className="font-display text-xl font-bold tracking-widest text-white uppercase">Cinematic Club Tour</h4>
          <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">
            Autoplay streams: 60 FPS Slow-Motion Compound Movements inside Central Arena.
          </p>
        </div>
      </section>

      {/* 10. Interactive BMI Calculator */}
      <section className="py-24 bg-charcoal border-y border-white/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-neon font-black">Fitness metrics</span>
            <h3 className="font-display text-3xl font-black text-white">Check Your BMI Score</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Calculate your Body Mass Index (BMI) instantly. MATRIX recommends personalized programming based on your results.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCalculateBmi} className="glass rounded-3xl p-6.5 border border-white/5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Height (cm)</label>
                <input
                  type="number"
                  required
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Weight (kg)</label>
                <input
                  type="number"
                  required
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-neon py-3.5 font-black text-black uppercase tracking-wider text-xs hover:opacity-90 neon-glow-btn transition"
            >
              Calculate BMI
            </button>

            {bmiResult !== null && (
              <div className="border-t border-white/5 pt-4 text-center space-y-1">
                <span className="text-[9px] uppercase text-white/40 block">Your BMI Score</span>
                <div className="text-3xl font-black text-neon animate-pulse">{bmiResult}</div>
                <span className="text-[10px] text-white/60 block font-semibold">
                  {bmiResult < 18.5
                    ? "Underweight (Strength hyper-gain recommended)"
                    : bmiResult < 25
                    ? "Normal weight (Optimal zone)"
                    : bmiResult < 30
                    ? "Overweight (Cardio intervals advised)"
                    : "Obese (Fat loss splits advised)"}
                </span>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* 11. Testimonials Preview */}
      <section className="py-24 bg-charcoal-2 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-neon font-black">Testimonials</span>
            <h3 className="font-display text-3xl font-black text-white">Client Transformations</h3>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/5 relative min-h-[160px] flex flex-col justify-between text-left">
            <div className="absolute top-5 right-5 flex gap-1">
              {Array.from({ length: testimonials[currentSlide].rating }).map((_, i) => (
                <Star key={i} className="h-4.5 w-4.5 text-neon fill-neon" />
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed italic">
                "{testimonials[currentSlide].desc}"
              </p>
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-full bg-white/10 shrink-0 overflow-hidden">
                  <img src={beforeImg} alt="Review avatar" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{testimonials[currentSlide].name}</h4>
                  <span className="text-[9px] uppercase text-neon font-black tracking-wider block mt-0.5">
                    {testimonials[currentSlide].loss} // {testimonials[currentSlide].fat}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setCurrentSlide((currentSlide - 1 + testimonials.length) % testimonials.length)}
                className="rounded-full bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((currentSlide + 1) % testimonials.length)}
                className="rounded-full bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-black text-neon uppercase tracking-wider hover:underline"
          >
            View All Success Stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 12. Latest Blog section */}
      <section className="py-24 bg-charcoal">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-neon font-black">Resources</span>
            <h3 className="font-display text-3xl font-black text-white mt-1">Latest Fitness Insights</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div key={b.title} className="glass rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-between h-[360px]">
                <div className="h-40 w-full overflow-hidden shrink-0">
                  <img src={b.img} alt={b.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded font-black uppercase tracking-wider inline-block">
                      {b.cat}
                    </span>
                    <h4 className="font-display text-base font-bold text-white leading-tight line-clamp-1">{b.title}</h4>
                    <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2">{b.desc}</p>
                  </div>
                  <Link
                    to="/programs"
                    className="text-xs font-black text-neon uppercase tracking-wider hover:underline inline-flex items-center gap-1 mt-3"
                  >
                    Read More <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Partners section marquee */}
      <section className="py-16 bg-charcoal-2 border-y border-white/5 overflow-hidden relative select-none">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex gap-12 items-center justify-around flex-wrap text-white/30 text-xs font-black uppercase tracking-widest">
            <span>Nike // Fitness</span>
            <span>Technogym // Biometrics</span>
            <span>Rogue // Strength</span>
            <span>MyFitnessPal</span>
            <span>Apple Health</span>
            <span>Fitbit</span>
            <span>Google Fit</span>
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="py-24 bg-charcoal text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full bg-neon/5 blur-[120px] pointer-events-none" />
        <h3 className="font-display text-4xl md:text-5xl font-black text-white">Ready to Start?</h3>
        <p className="text-white/60 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Claim your free 7-day trial pass and experience India's most advanced conditioning ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3.5 pt-4">
          <Link
            to="/membership"
            className="rounded-full bg-neon px-8 py-3.5 text-xs uppercase font-black text-black tracking-wider neon-glow-btn transition"
          >
            Claim Free Trial
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs uppercase font-black text-white hover:bg-white/10 transition"
          >
            Book Consultation
          </Link>
        </div>
      </section>

      {/* Smart Feature Modal Shell */}
      <AnimatePresence>
        {activeModalFeature && smartFeaturesList[activeModalFeature] && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center items-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-charcoal-2 p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <button
                onClick={() => setActiveModalFeature(null)}
                className="absolute top-5 right-5 rounded-full bg-white/10 p-1.5 text-white/70 hover:bg-neon hover:text-black transition"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-neon font-black">
                    {smartFeaturesList[activeModalFeature].tech}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mt-1">
                    {smartFeaturesList[activeModalFeature].title}
                  </h3>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  {smartFeaturesList[activeModalFeature].desc}
                </p>
                <button
                  onClick={() => setActiveModalFeature(null)}
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition"
                >
                  Close parameters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
