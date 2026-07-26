import { useState } from "react";
import { Calculator } from "lucide-react";

export function BMI() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [result, setResult] = useState<{ bmi: number; label: string; color: string } | null>(null);

  const calc = (e: React.FormEvent) => {
    e.preventDefault();
    const hm = parseFloat(h) / 100;
    const wk = parseFloat(w);
    if (!hm || !wk) return;
    const bmi = +(wk / (hm * hm)).toFixed(1);
    let label = "Normal", color = "text-neon";
    if (bmi < 18.5) { label = "Underweight"; color = "text-blue-400"; }
    else if (bmi >= 25 && bmi < 30) { label = "Overweight"; color = "text-yellow-400"; }
    else if (bmi >= 30) { label = "Obese"; color = "text-red-400"; }
    setResult({ bmi, label, color });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-charcoal to-charcoal-2">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="glass rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Tools</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-black">
              Know your <span className="neon-text">baseline.</span>
            </h2>
            <p className="mt-4 text-white/60">
              Your BMI is the first checkpoint. Enter your stats and get an instant reading.
            </p>

            <form onSubmit={calc} className="mt-8 space-y-4">
              <div>
                <label className="text-xs uppercase text-white/60 tracking-widest">Height (cm)</label>
                <input
                  type="number"
                  value={h}
                  onChange={(e) => setH(e.target.value)}
                  placeholder="175"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/30 transition"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase text-white/60 tracking-widest">Weight (kg)</label>
                <input
                  type="number"
                  value={w}
                  onChange={(e) => setW(e.target.value)}
                  placeholder="70"
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/30 transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 font-bold text-black neon-glow-btn"
              >
                <Calculator className="h-4 w-4" /> Calculate
              </button>
            </form>
          </div>

          <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-neon/10 via-charcoal-2 to-charcoal border border-white/10 grid place-items-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            {result ? (
              <div className="relative text-center animate-fade-up">
                <div className="text-xs uppercase tracking-widest text-white/60">Your BMI</div>
                <div className="mt-2 font-display text-7xl md:text-8xl font-black neon-text">
                  {result.bmi}
                </div>
                <div className={`mt-2 text-2xl font-bold ${result.color}`}>{result.label}</div>
                <p className="mt-4 text-sm text-white/60 max-w-xs mx-auto">
                  A MATRIX coach can build the perfect program to move you toward your goal.
                </p>
              </div>
            ) : (
              <div className="relative text-center text-white/40">
                <Calculator className="h-16 w-16 mx-auto text-neon/60 animate-float" />
                <p className="mt-4">Your result will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
