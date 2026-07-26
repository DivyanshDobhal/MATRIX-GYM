import { useState } from "react";
import { LineChart } from "./shared/Charts";
import { Accordion } from "./shared/Accordion";
import { Calculator, Trophy, Flame, User, MessageCircle, Heart, Star, Check } from "lucide-react";
import marcus from "@/assets/trainer-1.jpg";

interface StrengthDashboardProps {
  data: any;
  activeTab: string;
}

const workoutSplits = {
  "Push Pull Legs": [
    { name: "Barbell Squat (Legs)", sets: 4, reps: "6-8", rest: "3 min", muscles: "Quadriceps, Glutes" },
    { name: "Barbell Bench Press (Push)", sets: 4, reps: "6-8", rest: "3 min", muscles: "Pectorals, Anterior Deltoids" },
    { name: "Barbell Deadlift (Pull)", sets: 3, reps: "5", rest: "4 min", muscles: "Hamstrings, Spinal Erectors" },
    { name: "Overhead Barbell Press (Push)", sets: 3, reps: "8", rest: "2.5 min", muscles: "Deltoids, Triceps" },
    { name: "Weighted Pull-Ups (Pull)", sets: 3, reps: "8-10", rest: "2 min", muscles: "Latissimus Dorsi, Biceps" }
  ],
  "Arnold Split": [
    { name: "Incline Dumbbell Press (Chest/Back)", sets: 4, reps: "8-10", rest: "2 min", muscles: "Upper Chest, Front Delts" },
    { name: "Barbell Row (Chest/Back)", sets: 4, reps: "8-10", rest: "2 min", muscles: "Lats, Rhomboids" },
    { name: "Dumbbell Lateral Raise (Shoulders/Arms)", sets: 4, reps: "12-15", rest: "90 sec", muscles: "Lateral Deltoids" },
    { name: "Barbell Bicep Curl (Shoulders/Arms)", sets: 3, reps: "10-12", rest: "90 sec", muscles: "Biceps" },
    { name: "Overhead Tricep Extension (Shoulders/Arms)", sets: 3, reps: "10-12", rest: "90 sec", muscles: "Triceps" }
  ],
  "Upper Lower": [
    { name: "Dumbbell Bench Press (Upper)", sets: 4, reps: "8-10", rest: "2 min", muscles: "Chest, Shoulders" },
    { name: "Lat Pulldown (Upper)", sets: 4, reps: "10-12", rest: "90 sec", muscles: "Lats, Upper Back" },
    { name: "Romanian Deadlift (Lower)", sets: 4, reps: "8", rest: "2 min", muscles: "Hamstrings, Glutes" },
    { name: "Leg Press (Lower)", sets: 3, reps: "10-12", rest: "2 min", muscles: "Quads, Adductors" }
  ],
  "Bro Split": [
    { name: "Flat Bench Press (Chest)", sets: 4, reps: "8-12", rest: "2 min", muscles: "Chest" },
    { name: "Deadlift (Back)", sets: 3, reps: "5", rest: "3 min", muscles: "Spine, Hams" },
    { name: "Standing Barbell Press (Shoulders)", sets: 4, reps: "8-10", rest: "2 min", muscles: "Shoulders" },
    { name: "Barbell Bicep Curl (Arms)", sets: 3, reps: "10-12", rest: "90 sec", muscles: "Biceps" }
  ],
  "Full Body": [
    { name: "Barbell Squat", sets: 3, reps: "8-10", rest: "2.5 min", muscles: "Legs" },
    { name: "Incline Bench Press", sets: 3, reps: "8-10", rest: "2 min", muscles: "Chest" },
    { name: "Barbell Row", sets: 3, reps: "8-10", rest: "2 min", muscles: "Back" },
    { name: "Plank Hold", sets: 3, reps: "60 sec", rest: "60 sec", muscles: "Core" }
  ]
};

export default function StrengthTrainingDashboard({ data, activeTab }: StrengthDashboardProps) {
  // Calculator States
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("gain");
  const [macros, setMacros] = useState<any>(null);

  // Split States
  const [activeSplit, setActiveSplit] = useState<keyof typeof workoutSplits>("Push Pull Legs");

  // Booking States
  const [isBooked, setIsBooked] = useState(false);

  const calculateMacros = () => {
    // Mifflin-St Jeor Equation
    const genderOffset = gender === "male" ? 5 : -161;
    const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;
    const tdee = Math.round(bmr * 1.375); // Light activity

    let targetCalories = tdee;
    if (goal === "lose") targetCalories = tdee - 500;
    if (goal === "gain") targetCalories = tdee + 400;

    // Macro grams calculations
    const protein = Math.round(weight * 2.0); // 2g per kg
    const fat = Math.round(weight * 0.9); // 0.9g per kg
    const carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);
    const water = (weight * 0.045).toFixed(1);

    setMacros({
      calories: targetCalories,
      protein,
      carbs,
      fat,
      water
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
              <h3 className="font-display text-xl font-bold">Goal & Targeting</h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">{data.overview.goal}</p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {data.overview.muscleGroups.map((mg: string) => (
                  <span key={mg} className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-bold text-white/80">
                    {mg}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-neon/20">
              <h3 className="font-display text-xl font-bold text-neon">Program Stats</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Duration</span>
                  <span className="font-bold">{data.duration}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Difficulty</span>
                  <span className="font-bold text-neon">{data.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Sessions</span>
                  <span className="font-bold">4-5 days / week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="space-y-8">
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
            {Object.keys(workoutSplits).map((split) => (
              <button
                key={split}
                onClick={() => setActiveSplit(split as keyof typeof workoutSplits)}
                className={`rounded-full px-5 py-2.5 text-xs md:text-sm font-bold transition-all ${
                  activeSplit === split
                    ? "bg-neon text-black font-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {split}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutSplits[activeSplit].map((workout, index) => (
              <div key={index} className="glass rounded-3xl p-6 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-all">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-black text-neon tracking-widest">Exercise {index + 1}</span>
                  <h4 className="font-display text-lg md:text-xl font-black">{workout.name}</h4>
                  <div className="flex flex-wrap gap-2 text-xs text-white/50">
                    <span>Sets: <strong className="text-white">{workout.sets}</strong></span>
                    <span>•</span>
                    <span>Reps: <strong className="text-white">{workout.reps}</strong></span>
                    <span>•</span>
                    <span>Rest: <strong className="text-white">{workout.rest}</strong></span>
                  </div>
                </div>
                <div className="mt-5 border-t border-white/5 pt-3.5 flex items-center justify-between">
                  <span className="text-xs text-white/60">{workout.muscles}</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-neon/40 hover:text-neon cursor-pointer transition">Demo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="glass rounded-3xl p-6 md:p-8 space-y-5">
            <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
              <Calculator className="h-5 w-5 text-neon" /> Macro Calculator
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
                <label className="text-xs uppercase text-white/60 tracking-wider">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-neon focus:outline-none"
                />
              </div>
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
                <label className="text-xs uppercase text-white/60 tracking-wider">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-neon focus:outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase text-white/60 tracking-wider">Fitness Goal</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[
                  { id: "lose", label: "Fat Loss" },
                  { id: "maintain", label: "Maintenance" },
                  { id: "gain", label: "Gain Muscle" }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                      goal === g.id
                        ? "bg-neon text-black font-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateMacros}
              className="w-full rounded-full bg-neon py-3.5 font-black text-black hover:opacity-90 neon-glow-btn transition"
            >
              Generate Daily Plan
            </button>
          </div>

          {/* Results */}
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Macro Strategy</h3>
            {macros ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] uppercase text-white/50 tracking-wider">Calories</span>
                    <div className="text-lg md:text-xl font-black text-neon mt-1">{macros.calories} kcal</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] uppercase text-white/50 tracking-wider">Protein</span>
                    <div className="text-lg md:text-xl font-black text-white mt-1">{macros.protein}g</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] uppercase text-white/50 tracking-wider">Carbs</span>
                    <div className="text-lg md:text-xl font-black text-white mt-1">{macros.carbs}g</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] uppercase text-white/50 tracking-wider">Fats</span>
                    <div className="text-lg md:text-xl font-black text-white mt-1">{macros.fat}g</div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-5 space-y-4">
                  <h4 className="font-display text-lg font-bold text-white/80">Suggested Meal Guidelines</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-white/70">Breakfast</span>
                      <span className="text-white/60">Egg white omelette, oats with berries</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-white/70">Lunch</span>
                      <span className="text-white/60">Grilled chicken breast, jasmine rice, broccoli</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-white/70">Snack</span>
                      <span className="text-white/60">Whey isolate shake, handful of almonds</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="font-bold text-white/70">Dinner</span>
                      <span className="text-white/60">Baked salmon fillet, sweet potatoes, asparagus</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-center items-center text-center text-white/40 py-10">
                <Calculator className="h-12 w-12 stroke-1 mb-2.5" />
                <p className="text-sm">Click "Generate Daily Plan" to calculate macro guidelines.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">BMI index</span>
              <div className="text-3xl font-black text-neon">22.4</div>
              <span className="text-[10px] text-white/40 bg-neon/10 border border-neon/20 rounded-full px-2.5 py-0.5 inline-block font-bold">Normal Range</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Body Fat</span>
              <div className="text-3xl font-black text-white">14.2 %</div>
              <span className="text-[10px] text-white/40">-1.8% from last month</span>
            </div>
            <div className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
              <span className="text-xs uppercase text-white/50 tracking-wider">Workout Streak</span>
              <div className="text-3xl font-black text-white flex justify-center items-center gap-1.5">
                <Flame className="h-7 w-7 text-neon fill-neon" /> 18 Days
              </div>
              <span className="text-[10px] text-white/40">Personal record streak!</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-neon" /> Est. 1RM Squat Progression (12 Weeks)
            </h3>
            <LineChart
              data={[
                { label: "W1", value: 100 },
                { label: "W3", value: 105 },
                { label: "W5", value: 110 },
                { label: "W7", value: 112 },
                { label: "W9", value: 118 },
                { label: "W12", value: 125 }
              ]}
              ySuffix="kg"
            />
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={marcus}
            alt="Marcus Vance"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">Strength Coach</span>
              <h3 className="font-display text-2xl font-black">Marcus Vance</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Marcus has trained competitive powerlifters and regional athletes for over 8 years. He specializes in mechanical optimization and progressive load splits.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">CSCS Credential</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">8 Years Exp</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10 flex items-center gap-1">
                <Star className="h-3 w-3 text-neon fill-neon" /> 4.9 Rating
              </span>
            </div>
            <button
              onClick={() => setIsBooked(true)}
              disabled={isBooked}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-black transition-all ${
                isBooked
                  ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/5"
                  : "bg-neon text-black hover:opacity-90 neon-glow-btn"
              }`}
            >
              {isBooked ? <><Check className="h-4 w-4" /> Assessment Booked</> : "Book Assessment Session"}
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
