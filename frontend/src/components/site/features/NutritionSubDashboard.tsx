import { useState } from "react";
import { BarChart } from "../programs/shared/Charts";
import { Calculator, Star, Check, Award, Heart, HelpCircle, Activity } from "lucide-react";
import nutritionistImg from "@/assets/trainer-2.jpg";

interface NutritionDashboardProps {
  data: any;
}

export default function NutritionSubDashboard({ data }: NutritionDashboardProps) {
  // Calculator States
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(26);
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("lose");
  const [macros, setMacros] = useState<any>(null);

  const [isBooked, setIsBooked] = useState(false);

  const calculateNutrition = () => {
    // Mifflin-St Jeor Equation
    const genderOffset = gender === "male" ? 5 : -161;
    const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;
    const tdee = Math.round(bmr * 1.375); // Light activity

    let targetCalories = tdee;
    if (goal === "lose") targetCalories = tdee - 500;
    if (goal === "gain") targetCalories = tdee + 400;

    const protein = Math.round(weight * 2.0); // 2g per kg
    const fat = Math.round(weight * 0.9); // 0.9g per kg
    const carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);
    const water = (weight * 0.04).toFixed(1);

    setMacros({
      calories: targetCalories,
      protein,
      carbs,
      fat,
      water
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Widget */}
        <div className="glass rounded-3xl p-6 md:p-8 space-y-5 border border-neon/10">
          <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
            <Calculator className="h-5 w-5 text-neon" /> Personalized Macro Calculator
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase text-white/50 tracking-wider">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-white/50 tracking-wider">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-white/50 tracking-wider">Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase text-white/50 tracking-wider">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase text-white/50 tracking-wider">Goal</label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {[
                { id: "lose", label: "Fat Loss" },
                { id: "maintain", label: "Maintenance" },
                { id: "gain", label: "Gain Muscle" }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
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
            onClick={calculateNutrition}
            className="w-full rounded-full bg-neon py-3.5 font-black text-black hover:opacity-90 neon-glow-btn transition"
          >
            Calculate Macro Targets
          </button>
        </div>

        {/* Nutritionist Profile & Booking */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-white/5">
          <img src={nutritionistImg} className="h-40 w-40 rounded-2xl object-cover shrink-0 mx-auto" alt="Nutritionist" />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[9px] uppercase font-black text-neon tracking-widest">{data.nutritionist.role}</span>
              <h4 className="font-display text-xl font-bold text-white">{data.nutritionist.name}</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">{data.nutritionist.bio}</p>
            </div>
            <div className="space-y-1.5 text-[10px] text-white/70">
              {data.nutritionist.certs.map((c: string, idx: number) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-neon" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsBooked(true)}
              disabled={isBooked}
              className={`w-full rounded-full py-2.5 text-xs font-black transition-all ${
                isBooked
                  ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/5"
                  : "bg-neon text-black hover:opacity-90 neon-glow-btn"
              }`}
            >
              {isBooked ? (
                <span className="flex items-center justify-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Consultation Requested
                </span>
              ) : (
                "Book Consultation"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Target Results details */}
      {macros && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <h4 className="font-display text-xl font-bold border-b border-white/10 pb-3">Macro Distribution</h4>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Target Daily Calories</span>
                  <span className="font-bold text-neon">{macros.calories} kcal</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Protein target</span>
                  <span className="font-bold text-white">{macros.protein}g <span className="text-[10px] text-white/40">({macros.protein * 4} kcal)</span></span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Carbohydrate target</span>
                  <span className="font-bold text-white">{macros.carbs}g <span className="text-[10px] text-white/40">({macros.carbs * 4} kcal)</span></span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Healthy Fats target</span>
                  <span className="font-bold text-white">{macros.fat}g <span className="text-[10px] text-white/40">({macros.fat * 9} kcal)</span></span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-white/60">Water Intake target</span>
                  <span className="font-bold text-neon">{macros.water} L / day</span>
                </div>
              </div>
              <BarChart
                data={[
                  { label: "Protein (g)", value: macros.protein },
                  { label: "Carbs (g)", value: macros.carbs },
                  { label: "Fats (g)", value: macros.fat }
                ]}
              />
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">Suggested Daily Meal Guide</h4>
            <div className="space-y-3 text-[11px] md:text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Breakfast</span>
                <span className="text-white/60 text-right">Oats, banana, whey isolate shake</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Lunch</span>
                <span className="text-white/60 text-right">Lean ground beef, jasmine rice, spinach</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Snack</span>
                <span className="text-white/60 text-right">Boiled egg whites + rice cake with peanut butter</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Dinner</span>
                <span className="text-white/60 text-right">Baked salmon, asparagus, sweet potato</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supplement Advice List */}
      <div className="space-y-4">
        <h4 className="font-display text-lg font-bold flex items-center gap-2">
          <Heart className="h-5 w-5 text-neon" /> Bio-Active Supplementation Blueprint
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.supplements.map((sup: any) => (
            <div key={sup.name} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 space-y-2">
              <h5 className="font-display text-sm font-bold text-neon">{sup.name}</h5>
              <p className="text-[10px] text-white/50 leading-relaxed">{sup.purpose}</p>
              <div className="border-t border-white/5 pt-2 text-[10px]">
                Dosage: <strong className="text-white">{sup.dosage}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
