import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Flame, Loader2, ArrowRight, Activity, Award, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5050/api/v1"
    : "https://server-ashy-rho.vercel.app/api/v1");

const plans = [
  {
    id: "trial",
    name: "7-Day Free Trial",
    price: "FREE",
    duration: "7 Days",
    badge: "🔥 BEST WAY TO START",
    features: [
      "Unlimited Gym Access for 7 Days",
      "Full Access to HIIT & CrossFit",
      "Yoga Classes & Cardio Zone",
      "Free Body Composition Analysis",
      "Access to MATRIX Mobile App",
      "One Free Personal Training Session"
    ],
    restrictions: [
      "One trial per user",
      "Valid government ID required",
      "No credit card required"
    ],
    isTrial: true
  },
  {
    id: "starter",
    name: "STARTER",
    price: "1,499",
    duration: "/mo",
    features: [
      "Unlimited Gym Access",
      "Locker Included",
      "Free Fitness Assessment",
      "Access to MATRIX Mobile App",
      "Basic Progress Tracking"
    ],
    restrictions: []
  },
  {
    id: "pro",
    name: "PRO",
    price: "2,999",
    duration: "/mo",
    highlighted: true,
    badge: "⭐ MOST POPULAR",
    features: [
      "Everything in Starter",
      "Unlimited Group Classes",
      "Custom Diet & Workout Plan",
      "Weekly Trainer Consultation Sessions"
    ],
    restrictions: []
  },
  {
    id: "elite",
    name: "ELITE",
    price: "5,499",
    duration: "/mo",
    features: [
      "Unlimited Everything",
      "Dedicated Personal Trainer",
      "Custom Nutrition Coach",
      "Recovery Lounge Access",
      "Priority Support"
    ],
    restrictions: []
  }
];

const comparisonRows = [
  { name: "Gym Access", trial: "7 Days", starter: "Yes", pro: "Yes", elite: "Yes" },
  { name: "Group Classes", trial: "Yes", starter: "No", pro: "Yes", elite: "Yes" },
  { name: "HIIT Sessions", trial: "Yes", starter: "No", pro: "Yes", elite: "Yes" },
  { name: "CrossFit Sessions", trial: "Yes", starter: "No", pro: "Yes", elite: "Yes" },
  { name: "Yoga Classes", trial: "Yes", starter: "No", pro: "Yes", elite: "Yes" },
  { name: "Custom Diet Plan", trial: "No", starter: "No", pro: "Yes", elite: "Yes" },
  { name: "Nutrition Coach", trial: "No", starter: "No", pro: "No", elite: "Yes" },
  { name: "Personal Trainer", trial: "1 Session", starter: "No", pro: "Weekly", elite: "Dedicated" },
  { name: "Locker Access", trial: "Yes", starter: "Yes", pro: "Yes", elite: "Yes" },
  { name: "Recovery Lounge", trial: "No", starter: "No", pro: "No", elite: "Yes" },
  { name: "Mobile App Access", trial: "Yes", starter: "Yes", pro: "Yes", elite: "Yes" },
  { name: "Progress Tracking", trial: "Yes", starter: "Basic", pro: "Yes", elite: "Yes" },
  { name: "Priority Support", trial: "No", starter: "No", pro: "No", elite: "Yes" }
];

export function Membership() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registeredData, setRegisteredData] = useState<any>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "male",
    goal: "gain",
    weight: "",
    height: "",
    time: "Morning",
    agree: false
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    setRegisteredData(null);
  };

  const handleClaimTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("You must agree to the Terms and Conditions.");
      return;
    }

    setSubmitting(true);

    // Sanitize phone number (digits only, last 10 characters)
    const cleanPhone = formData.phone.replace(/\D/g, "").slice(-10);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: cleanPhone,
      membership: "Free Trial",
      preferredTime: formData.time,
      age: formData.age ? Number(formData.age) : undefined,
      gender: formData.gender,
      goal: formData.goal === "lose" ? "Fat Loss" : formData.goal === "gain" ? "Muscle Gain" : "Body Recomposition",
      weight: formData.weight,
      height: formData.height
    };

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result.errors && result.errors.length > 0
          ? result.errors.map((e: any) => e.message).join(". ")
          : result.message || "Failed to register trial.";
        throw new Error(errorMsg);
      }

      // Generate random Membership ID and Expiry Date
      const randomId = "MTX-TR-" + Math.floor(10000 + Math.random() * 90000);
      const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });

      setRegisteredData({
        name: formData.name,
        memberId: randomId,
        expiry: expiryDate
      });

      toast.success("Free Trial Passes Reserved!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "male",
        goal: "gain",
        weight: "",
        height: "",
        time: "Morning",
        agree: false
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="membership" className="relative py-24 lg:py-32 bg-charcoal overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-neon/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Membership</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Choose your <span className="neon-text">weapon.</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg leading-relaxed">
            Unleash your potential. Start with a risk-free trial pass or gain full access with our tiers.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((p) => {
            const isTrial = p.isTrial;
            const highlighted = p.highlighted;

            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-7.5 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isTrial
                    ? "bg-gradient-to-b from-neon/10 to-charcoal-2 border border-neon shadow-[0_0_40px_rgba(57,255,20,0.15)] md:-mt-2"
                    : highlighted
                    ? "bg-gradient-to-b from-neon/15 to-charcoal-2 border-2 border-neon shadow-[0_0_60px_-10px_rgba(57,255,20,0.4)] md:-mt-4 md:mb-4"
                    : "glass border-white/5"
                }`}
              >
                {/* Floating Particles for Free Trial */}
                {isTrial && (
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute top-10 left-10 h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                    <div className="absolute bottom-20 right-10 h-2 w-2 rounded-full bg-neon animate-ping" />
                    <div className="absolute top-1/2 right-1/4 h-1 w-1 rounded-full bg-neon animate-bounce" />
                  </div>
                )}

                {/* Limited Time Ribbon for Trial */}
                {isTrial && (
                  <div className="absolute top-0 right-0 overflow-hidden h-20 w-20 pointer-events-none">
                    <div className="absolute transform rotate-45 bg-red-600 text-[8px] font-black text-white text-center py-1.5 w-28 top-3 -right-6 uppercase tracking-wider shadow">
                      Limited Time
                    </div>
                  </div>
                )}

                {/* Badge Indicator */}
                {(isTrial || highlighted) && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-neon px-3.5 py-1 text-[9px] font-black text-black uppercase tracking-wider shadow-[0_3px_10px_rgba(57,255,20,0.3)]">
                    {isTrial ? <Flame className="h-3.5 w-3.5 fill-black" /> : <Sparkles className="h-3 w-3" />}
                    {p.badge}
                  </span>
                )}

                <div className="space-y-5 flex-1">
                  <div>
                    <h3 className="font-display text-2xl font-black text-white flex items-center gap-1">
                      {isTrial && "⚡"} {p.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      {p.price !== "FREE" && <span className="text-sm text-white/50">₹</span>}
                      <span className="font-display text-5xl font-black text-white">{p.price}</span>
                      <span className="text-white/50 text-xs font-semibold">{p.duration}</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3.5 pt-2">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                        <span className="mt-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-neon/15 shrink-0 border border-neon/30">
                          <Check className="h-3 w-3 text-neon" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Restrictions for Trial */}
                  {isTrial && p.restrictions.length > 0 && (
                    <div className="border-t border-white/5 pt-4 space-y-1.5">
                      <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Restrictions</span>
                      {p.restrictions.map((r, i) => (
                        <div key={i} className="text-[10px] text-white/50 flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-white/30 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {isTrial ? (
                  <button
                    onClick={handleOpenModal}
                    className="mt-8 w-full inline-flex items-center justify-center rounded-full bg-neon py-3.5 text-sm font-black text-black neon-glow-btn transition"
                  >
                    Start Free Trial
                  </button>
                ) : (
                  <a
                    href="#register"
                    className={`mt-8 inline-flex items-center justify-center rounded-full py-3.5 text-sm font-bold transition ${
                      highlighted
                        ? "bg-neon text-black neon-glow-btn"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    Join Now
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="border-t border-white/10 pt-16 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-black text-white">Compare Membership Benefits</h3>
            <p className="text-xs text-white/50 mt-2">See exactly what you unlock with each plan level.</p>
          </div>

          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse text-xs md:text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01]">
                  <th className="py-4 px-4 font-bold text-white/40 uppercase tracking-wider text-[10px]">Compare Tiers</th>
                  <th className="py-4 px-4 font-black text-neon text-center">Free Trial</th>
                  <th className="py-4 px-4 font-bold text-white/80 text-center">Starter</th>
                  <th className="py-4 px-4 font-black text-white text-center">Pro</th>
                  <th className="py-4 px-4 font-bold text-white/80 text-center">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] text-white/70">
                {comparisonRows.map((row) => (
                  <tr key={row.name} className="hover:bg-white/[0.01] transition duration-150">
                    <td className="py-4 px-4 font-bold text-white/90">{row.name}</td>
                    {/* Trial col */}
                    <td className="py-4 px-4 text-center font-bold">
                      {row.trial === "Yes" ? (
                        <Check className="h-4.5 w-4.5 text-neon mx-auto filter drop-shadow-[0_0_4px_rgba(57,255,20,0.5)]" strokeWidth={3} />
                      ) : row.trial === "No" ? (
                        <X className="h-4 w-4 text-white/20 mx-auto" />
                      ) : (
                        <span className="text-neon text-[10px] uppercase font-black">{row.trial}</span>
                      )}
                    </td>
                    {/* Starter col */}
                    <td className="py-4 px-4 text-center">
                      {row.starter === "Yes" ? (
                        <Check className="h-4.5 w-4.5 text-neon mx-auto" strokeWidth={3} />
                      ) : row.starter === "No" ? (
                        <X className="h-4 w-4 text-white/20 mx-auto" />
                      ) : (
                        <span className="text-[10px] text-white/60 font-semibold">{row.starter}</span>
                      )}
                    </td>
                    {/* Pro col */}
                    <td className="py-4 px-4 text-center">
                      {row.pro === "Yes" ? (
                        <Check className="h-4.5 w-4.5 text-neon mx-auto" strokeWidth={3} />
                      ) : row.pro === "No" ? (
                        <X className="h-4 w-4 text-white/20 mx-auto" />
                      ) : (
                        <span className="text-[10px] text-neon font-black">{row.pro}</span>
                      )}
                    </td>
                    {/* Elite col */}
                    <td className="py-4 px-4 text-center">
                      {row.elite === "Yes" ? (
                        <Check className="h-4.5 w-4.5 text-neon mx-auto" strokeWidth={3} />
                      ) : row.elite === "No" ? (
                        <X className="h-4 w-4 text-white/20 mx-auto" />
                      ) : (
                        <span className="text-[10px] text-white font-black">{row.elite}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA section */}
        <div className="glass rounded-[32px] p-8 md:p-12 border border-neon/20 relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon/5 via-transparent to-transparent pointer-events-none" />
          <h3 className="font-display text-3xl md:text-4xl font-black text-white">Still Not Sure?</h3>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Try MATRIX free for 7 days. No commitments, no hidden charges, and absolutely no credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handleOpenModal}
              className="rounded-full bg-neon px-8 py-3.5 text-sm font-black text-black neon-glow-btn transition"
            >
              Start Free Trial
            </button>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              Talk to a Coach
            </a>
          </div>
        </div>
      </div>

      {/* Free Trial Registration Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center items-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-charcoal-2 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 rounded-full bg-white/10 p-1.5 text-white/70 hover:bg-neon hover:text-black transition"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {!registeredData ? (
                // Sign Up Form
                <form onSubmit={handleClaimTrial} className="space-y-5">
                  <div className="border-b border-white/5 pb-3">
                    <span className="text-[10px] uppercase font-black text-neon tracking-widest">Trial Pass Portal</span>
                    <h3 className="font-display text-2xl font-black text-white">Reserve Your 7-Day Access</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Alex Johnson"
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@email.com"
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9876543210"
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Age (years)</label>
                      <input
                        type="number"
                        name="age"
                        required
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="e.g. 25"
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Fitness Goal</label>
                      <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                      >
                        <option value="gain">Gain Muscle</option>
                        <option value="lose">Fat Loss</option>
                        <option value="recomp">Body Recomposition</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="e.g. 75"
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="e.g. 175"
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase text-white/60 tracking-wider">Preferred Workout Time</label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-neon focus:outline-none"
                      >
                        <option value="Morning">Morning (5AM - 12PM)</option>
                        <option value="Afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="Evening">Evening (5PM - 12AM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree-trial"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      className="rounded bg-white/5 border-white/10 text-neon focus:ring-neon/30"
                    />
                    <label htmlFor="agree-trial" className="text-[10px] text-white/50 leading-none cursor-pointer">
                      I agree to the Terms & Conditions and understand one Government ID check is required.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-neon py-4 font-black text-black uppercase tracking-wider text-xs md:text-sm shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:opacity-90 transition disabled:opacity-85"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Reserving Pass...
                      </span>
                    ) : (
                      "Claim My Free Trial"
                    )}
                  </button>
                </form>
              ) : (
                // Success State / Digital Pass Preview
                <div className="space-y-6 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-neon/15 border border-neon/30 text-neon animate-bounce">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-neon font-black">PASS GENERATED</span>
                    <h3 className="font-display text-2xl font-black text-white">Congratulations!</h3>
                    <p className="text-xs text-white/60">
                      Your 7-Day MATRIX Pass has been reserved. Bring a valid government ID to activate.
                    </p>
                  </div>

                  {/* Digital pass layout */}
                  <div className="mx-auto max-w-sm rounded-2xl border border-neon/30 bg-black/60 p-5 space-y-4 text-left relative overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.1)]">
                    <div className="absolute top-0 right-0 h-28 w-28 bg-neon/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <span className="text-xs font-black text-white tracking-widest">MATRIX // PASS</span>
                      <span className="text-[9px] text-neon bg-neon/15 border border-neon/20 px-2 py-0.5 rounded font-black">7-DAY TRIAL</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[8px] uppercase text-white/40 block">Member Name</span>
                        <span className="font-bold text-white text-sm">{registeredData.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[8px] uppercase text-white/40 block">Membership ID</span>
                          <span className="font-bold text-white text-xs font-mono">{registeredData.memberId}</span>
                        </div>
                        <div>
                          <span className="text-[8px] uppercase text-white/40 block">Trial Expiration</span>
                          <span className="font-bold text-neon text-xs">{registeredData.expiry}</span>
                        </div>
                      </div>
                    </div>

                    {/* Simulated QR Pass */}
                    <div className="border-t border-white/5 pt-3.5 flex justify-between items-center gap-3">
                      <div className="text-[9px] text-white/40 leading-relaxed max-w-[160px]">
                        Scan this pass at the front desk terminal alongside your ID to trigger entry.
                      </div>
                      <div className="h-14 w-14 bg-white rounded-lg p-1.5 flex flex-wrap justify-between content-around">
                        {Array.from({ length: 25 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 w-1.5 ${
                              idx % 3 === 0 || idx % 5 === 0 || idx === 0 || idx === 4 || idx === 20 || idx === 24
                                ? "bg-black"
                                : "bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-xs font-bold text-white hover:bg-white/10 transition mt-2"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
