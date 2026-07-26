import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { Link } from "@tanstack/react-router";

function Stat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { value, ref } = useCountUp(end);
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span ref={ref} className="font-display text-3xl md:text-4xl font-black text-white">
          {value.toLocaleString()}
        </span>
        <span className="text-neon font-black text-2xl">{suffix}</span>
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-charcoal" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-neon/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[10px] uppercase tracking-widest text-white/80 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-neon" />
            India's most advanced AI-powered fitness ecosystem
          </span>
        </div>

        <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          UNLOCK YOUR
          <br />
          <span className="neon-text">STRONGEST SELF.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Train with biosensor-linked smart hardware, elite trainers, and custom athletic conditioning protocols.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/membership"
            className="group inline-flex items-center gap-2 rounded-full bg-neon px-7 py-4 text-xs uppercase font-black tracking-wider text-black neon-glow-btn"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-xs uppercase font-black tracking-wider text-white backdrop-blur-md hover:bg-white/10 transition"
          >
            Explore Programs
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Stat end={15000} suffix="+" label="Active Members" />
          <Stat end={120} suffix="+" label="Expert Trainers" />
          <Stat end={50} suffix="+" label="Programs" />
          <Stat end={98} suffix="%" label="Transformation Success" />
        </div>

        <Link
          to="/programs"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-neon transition"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8 animate-scroll-bounce" />
        </Link>
      </div>
    </section>
  );
}
