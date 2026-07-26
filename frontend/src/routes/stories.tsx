import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Trophy, HelpCircle, Activity, Award, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Use high quality gallery assets
import beforeImg from "@/assets/gallery-5.jpg";
import afterImg from "@/assets/gallery-1.jpg";

export const Route = createFileRoute("/stories")({
  component: SuccessStoriesPage
});

const clientStories = [
  {
    name: "Vikram Malhotra",
    goal: "Weight Loss",
    weightLost: "18 kg",
    muscleGained: "+2.5 kg",
    fatChange: "-12%",
    bmiChange: "-5.8",
    description: "MATRIX completely structured my nutrition and conditioning targets. The Coaches were with me at every lift. In 6 months, my posture, strength and energy levels completely flipped.",
    beforeWeight: "92 kg",
    afterWeight: "74 kg",
    duration: "6 Months"
  },
  {
    name: "Anjali Sen",
    goal: "Muscle Gain",
    weightLost: "None",
    muscleGained: "+6 kg",
    fatChange: "-4%",
    bmiChange: "+1.2",
    description: "Focused on progressive overload, barbell volume tracking and hyper-targeted recovery. The smart Rogue Power Racks tracked every session and showed my volume growth clearly.",
    beforeWeight: "52 kg",
    afterWeight: "58 kg",
    duration: "4 Months"
  }
];

function SuccessStoriesPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeFilter, setActiveFilter] = useState("All");

  // Story submission form state
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    beforeWeight: "",
    afterWeight: "",
    goal: "Weight Loss",
    story: ""
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Transformation story submitted for review! Thank you.");
      setFormData({
        name: "",
        email: "",
        beforeWeight: "",
        afterWeight: "",
        goal: "Weight Loss",
        story: ""
      });
    }, 1200);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-16">
        {/* Title */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Success Stories</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-black">
            Real progress, <span className="neon-text">measured.</span>
          </h2>
          <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
            See the concrete biological changes of athletes who transformed their stamina, muscle density, and body composition.
          </p>
        </div>

        {/* Before / After Slider Showcase */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Interactive Split Slider */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-neon" /> Interactive Recomposition Slider
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Drag the control slider below to compare Vikram Malhotra's physical posture shifts after completing the 12-week body transformation split.
            </p>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 select-none">
              {/* After Photo (Full backdrop) */}
              <img src={afterImg} alt="After conditioning" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute top-4 right-4 bg-neon text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow z-10">
                After
              </div>

              {/* Before Photo (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={beforeImg}
                  alt="Before conditioning"
                  className="absolute inset-0 h-full w-full object-cover max-w-none"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="absolute top-4 left-4 bg-white/10 border border-white/20 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow z-10">
                  Before
                </div>
              </div>

              {/* Slider Control Handle Line */}
              <div
                className="absolute inset-y-0 w-1 bg-neon shadow-[0_0_10px_#39ff14] z-20 cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="h-8 w-8 rounded-full bg-neon text-black font-black text-xs flex items-center justify-center shadow-[0_0_15px_#39ff14]">
                  ↔
                </div>
              </div>

              {/* Hidden Input Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 z-30 cursor-ew-resize w-full h-full"
              />
            </div>
          </div>

          {/* Transformation details */}
          <div className="space-y-6">
            {clientStories.map((story) => (
              <div key={story.name} className="glass rounded-3xl p-6.5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">{story.name}</h4>
                    <span className="text-[10px] text-white/40 font-semibold">{story.duration} Commitment ({story.goal})</span>
                  </div>
                  <span className="text-[10px] text-neon uppercase font-black tracking-widest">{story.goal}</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">"{story.description}"</p>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                    <span className="text-[8px] text-white/40 block">Weight Lost</span>
                    <span className="font-black text-neon text-[11px]">{story.weightLost}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                    <span className="text-[8px] text-white/40 block">Muscle Gain</span>
                    <span className="font-black text-white text-[11px]">{story.muscleGained}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                    <span className="text-[8px] text-white/40 block">Fat Reduc.</span>
                    <span className="font-black text-neon text-[11px]">{story.fatChange}</span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                    <span className="text-[8px] text-white/40 block">BMI Shift</span>
                    <span className="font-black text-white text-[11px]">{story.bmiChange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit your story form */}
        <section className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-10 max-w-3xl mx-auto space-y-6">
          <div className="border-b border-white/5 pb-3 text-center">
            <span className="text-[9px] uppercase font-black text-neon tracking-widest">Share results</span>
            <h3 className="font-display text-2xl font-black text-white mt-1">Submit Your Transformation</h3>
            <p className="text-xs text-white/50 mt-1">Has MATRIX helped you smash your benchmarks? Log your journey below.</p>
          </div>

          <form onSubmit={handleSubmitStory} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Before Weight (kg)</label>
                <input
                  type="number"
                  name="beforeWeight"
                  required
                  value={formData.beforeWeight}
                  onChange={handleInputChange}
                  placeholder="e.g. 85"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">After Weight (kg)</label>
                <input
                  type="number"
                  name="afterWeight"
                  required
                  value={formData.afterWeight}
                  onChange={handleInputChange}
                  placeholder="e.g. 72"
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Primary Goal</label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
              >
                <option value="Weight Loss">Weight Loss / Fat Loss</option>
                <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
                <option value="Athlete">Athletic Performance</option>
                <option value="Lifestyle">General Health & Mobility</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Describe Your Experience</label>
              <textarea
                name="story"
                required
                rows={4}
                value={formData.story}
                onChange={handleInputChange}
                placeholder="Share your coaching, diet, and training insights..."
                className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-neon py-3.5 font-black text-black uppercase tracking-wider text-xs md:text-sm hover:opacity-90 neon-glow-btn transition"
            >
              {submitting ? "Submitting story..." : "Submit Story For Review"}
            </button>
          </form>
        </section>
      </div>
    </PageLayout>
  );
}
