import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Membership } from "@/components/site/Membership";
import { Calculator, Award, Sparkles, Building, Gift, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/membership")({
  component: MembershipPage
});

function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [months, setMonths] = useState(6);

  const planBaseRates: Record<string, number> = {
    starter: 1499,
    pro: 2999,
    elite: 5499
  };

  const calculateDiscountedRate = () => {
    const rate = planBaseRates[selectedPlan];
    let multiplier = 1.0;
    if (months >= 12) multiplier = 0.8; // 20% off
    else if (months >= 6) multiplier = 0.9; // 10% off
    else if (months >= 3) multiplier = 0.95; // 5% off

    const total = Math.round(rate * months * multiplier);
    const average = Math.round(rate * multiplier);
    const savings = Math.round((rate * months) - total);

    return { total, average, savings };
  };

  const costResult = calculateDiscountedRate();

  return (
    <PageLayout>
      {/* Main pricing component */}
      <Membership />

      {/* Interactive Savings Calculator */}
      <section className="py-24 bg-charcoal border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-black text-neon tracking-widest">Pricing tool</span>
            <h3 className="font-display text-3xl md:text-4xl font-black text-white flex items-center gap-2">
              <Calculator className="h-7 w-7 text-neon" /> Membership Calculator
            </h3>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed">
              Estimate your monthly rates and total savings based on commitment length. Commit longer to unlock up to **20% off** your base rate!
            </p>

            <div className="space-y-4">
              {/* Select Plan */}
              <div>
                <label className="text-[10px] uppercase text-white/50 tracking-wider font-bold">Select Tier</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[
                    { id: "starter", label: "Starter" },
                    { id: "pro", label: "Pro" },
                    { id: "elite", label: "Elite" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlan(p.id)}
                      className={`rounded-xl py-2.5 text-xs font-black transition-all ${
                        selectedPlan === p.id
                          ? "bg-neon text-black font-black"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for commitment */}
              <div>
                <div className="flex justify-between text-[10px] uppercase text-white/50 tracking-wider font-bold">
                  <span>Commitment Length</span>
                  <span className="text-neon font-black">{months} Months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full mt-2 accent-neon cursor-pointer h-1 bg-white/10 rounded-full"
                />
                <div className="flex justify-between text-[9px] text-white/40 mt-1 font-bold">
                  <span>1 Month</span>
                  <span>3 Months (5% off)</span>
                  <span>6 Months (10% off)</span>
                  <span>12 Months (20% off)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Results */}
          <div className="glass rounded-3xl p-6.5 md:p-8 space-y-6 border border-neon/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-neon/5 rounded-full blur-3xl pointer-events-none" />
            <h4 className="font-display text-lg font-bold border-b border-white/5 pb-2">Estimated Package Cost</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[9px] uppercase text-white/50 tracking-wider">Effective Monthly Rate</span>
                <div className="text-2xl font-black text-neon mt-1">₹{costResult.average} <span className="text-[10px] text-white/40 font-normal">/mo</span></div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center">
                <span className="text-[9px] uppercase text-white/50 tracking-wider">Total Package Cost</span>
                <div className="text-2xl font-black text-white mt-1">₹{costResult.total}</div>
              </div>
            </div>

            {costResult.savings > 0 ? (
              <div className="bg-neon/10 border border-neon/20 rounded-2xl p-3 text-center text-xs text-neon font-bold">
                🎉 You save ₹{costResult.savings} with this package!
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Benefits / Corporate Perks / Referrals */}
      <section className="py-24 bg-charcoal-2">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-3 gap-8">
          {/* Corporate Membership */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-3.5">
            <Building className="h-6 w-6 text-neon" />
            <h4 className="font-display text-lg font-bold text-white">Corporate Membership</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Equip your workforce. Corporate packages provide bulk access rates, dedicated health seminars, and private team-building fitness bootcamps.
            </p>
          </div>

          {/* Student Discounts */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-3.5">
            <GraduationCap className="h-6 w-6 text-neon" />
            <h4 className="font-display text-lg font-bold text-white">Student Tiers</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Maintain fitness alongside studies. Students with active university credentials receive **15% off** base rates on Starter and Pro levels.
            </p>
          </div>

          {/* Referral Rewards */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 space-y-3.5">
            <Gift className="h-6 w-6 text-neon" />
            <h4 className="font-display text-lg font-bold text-white">Referral Benefits</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Bring your friends. Receive a free month of membership credit for every successful referee signing up for a Pro or Elite plan.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
