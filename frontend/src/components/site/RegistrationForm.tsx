import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5050/api/v1"
    : "https://server-ashy-rho.vercel.app/api/v1");

async function submitRegistration(data: Record<string, string>) {
  // Sanitize phone: strip non-digits and keep last 10 characters
  const phone = data.phone.replace(/\D/g, "").slice(-10);

  // Map plans to backend-expected TitleCase values
  const membershipMap: Record<string, string> = {
    starter: "Starter",
    pro: "Pro",
    elite: "Elite"
  };
  const membership = membershipMap[data.plan] || "Starter";

  // Map workout slot to simple slots required by Zod schema
  const time = data.time || "";
  let preferredTime = "Morning";
  if (time.includes("Afternoon")) {
    preferredTime = "Afternoon";
  } else if (time.includes("Evening") || time.includes("Night")) {
    preferredTime = "Evening";
  }

  const payload = {
    name: data.name,
    email: data.email,
    phone,
    membership,
    preferredTime
  };

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMsg = result.errors && result.errors.length > 0
      ? result.errors.map((e: any) => e.message).join(". ")
      : result.message || "Failed to join MATRIX.";
    throw new Error(errorMsg);
  }

  return result;
}

export function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    try {
      await submitRegistration(data);
      setStatus("success");
      toast.success("Welcome to MATRIX! Registration Successful.");
      e.currentTarget.reset();
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err: any) {
      setStatus("idle");
      toast.error(err.message || "Failed to register. Please try again.");
    }
  };

  const inputCls =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/30 transition";

  return (
    <section id="register" className="relative py-24 lg:py-32 bg-gradient-to-b from-charcoal-2 to-charcoal">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-neon font-bold">Join</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-black">
            Start your <span className="neon-text">transformation.</span>
          </h2>
          <p className="mt-4 text-white/60">One form. One decision. A stronger you.</p>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-8 md:p-12 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase text-white/60 tracking-widest">Full Name</label>
              <input name="name" required placeholder="Alex Johnson" className={`mt-1 ${inputCls}`} />
            </div>
            <div>
              <label className="text-xs uppercase text-white/60 tracking-widest">Email</label>
              <input name="email" type="email" required placeholder="you@email.com" className={`mt-1 ${inputCls}`} />
            </div>
            <div>
              <label className="text-xs uppercase text-white/60 tracking-widest">Phone Number</label>
              <input name="phone" type="tel" required placeholder="+91 98765 43210" className={`mt-1 ${inputCls}`} />
            </div>
            <div>
              <label className="text-xs uppercase text-white/60 tracking-widest">Membership Plan</label>
              <select name="plan" required className={`mt-1 ${inputCls}`} defaultValue="">
                <option value="" disabled>Select plan</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="elite">Elite</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase text-white/60 tracking-widest">Preferred Workout Time</label>
              <select name="time" required className={`mt-1 ${inputCls}`} defaultValue="">
                <option value="" disabled>Choose a slot</option>
                <option>Early Morning (5AM - 8AM)</option>
                <option>Morning (8AM - 12PM)</option>
                <option>Afternoon (12PM - 5PM)</option>
                <option>Evening (5PM - 9PM)</option>
                <option>Night (9PM - 12AM)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 font-bold text-black neon-glow-btn disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {status === "loading" && <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>}
            {status === "success" && <><CheckCircle2 className="h-4 w-4" /> You're in! We'll be in touch.</>}
            {status === "idle" && <>Join MATRIX</>}
          </button>
        </form>
      </div>
    </section>
  );
}
