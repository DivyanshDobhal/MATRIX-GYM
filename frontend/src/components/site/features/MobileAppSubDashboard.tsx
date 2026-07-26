import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Apple, Play, Cpu, ShieldCheck, Heart, Sparkles } from "lucide-react";

interface MobileDashboardProps {
  data: any;
}

export default function MobileAppSubDashboard({ data }: MobileDashboardProps) {
  const [activeScreen, setActiveScreen] = useState<"dashboard" | "booking" | "qr">("dashboard");

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Features list & Download buttons */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-black text-white">The MATRIX Member App</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Your key to the club. Manage session times, book coaching slots, log weight lifts, track hydration, and check in contactless via your smartphone.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-white/80">
            {data.features.map((feat: string, i: number) => (
              <div key={i} className="flex items-center gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-neon shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Wearables Integration */}
          <div className="border-t border-white/5 pt-5 space-y-3.5">
            <h4 className="font-display text-base font-bold flex items-center gap-1.5 text-white/90">
              <Cpu className="h-4 w-4 text-neon" /> Wearable Ecosystem Sync
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {data.wearables.map((w: any) => (
                <div key={w.name} className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-center">
                  <h5 className="font-display text-[11px] font-bold text-neon">{w.name}</h5>
                  <p className="text-[9px] text-white/40 mt-0.5 leading-tight">{w.metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download triggers */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-5 py-2.5 transition">
              <Apple className="h-5 w-5 text-white fill-white" />
              <div className="text-left leading-none">
                <span className="text-[8px] uppercase text-white/40 block">Download on the</span>
                <span className="text-xs font-bold text-white font-display">App Store</span>
              </div>
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-5 py-2.5 transition">
              <Play className="h-5 w-5 text-white fill-white" />
              <div className="text-left leading-none">
                <span className="text-[8px] uppercase text-white/40 block">GET IT ON</span>
                <span className="text-xs font-bold text-white font-display">Google Play</span>
              </div>
            </button>
          </div>
        </div>

        {/* Interactive Phone Mockup Frame */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex gap-2">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "booking", label: "Booking" },
              { id: "qr", label: "QR Entry" }
            ].map((scr) => (
              <button
                key={scr.id}
                onClick={() => setActiveScreen(scr.id as any)}
                className={`rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-all ${
                  activeScreen === scr.id
                    ? "bg-neon text-black font-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {scr.label}
              </button>
            ))}
          </div>

          {/* Smartphone Frame Vector */}
          <div className="relative h-[480px] w-[240px] rounded-[40px] border-[5px] border-white/10 bg-black shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-black rounded-b-xl z-20 flex justify-center items-center">
              <div className="h-1 w-6 bg-white/20 rounded-full" />
            </div>

            {/* Screens */}
            <div className="absolute inset-0 p-4 pt-7 flex flex-col justify-between z-10 text-xs">
              <AnimatePresence mode="wait">
                {activeScreen === "dashboard" && (
                  <motion.div
                    key="dash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-white/50">Welcome back,</span>
                        <Sparkles className="h-3.5 w-3.5 text-neon" />
                      </div>
                      <h4 className="font-display text-sm font-black">Alex Johnson</h4>
                      
                      {/* Metric widgets */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                          <span className="text-[8px] text-white/40 block">TODAY BURN</span>
                          <span className="font-black text-neon text-xs">420 kcal</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                          <span className="text-[8px] text-white/40 block">STREAK</span>
                          <span className="font-black text-white text-xs">18 Days</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bars inside screen */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                      <span className="text-[8px] text-white/40 block">WEEKLY GOAL</span>
                      <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                        <div className="h-full bg-neon rounded-full" style={{ width: "70%" }} />
                      </div>
                      <span className="text-[8px] text-white/60 block text-right">3 / 4 Workouts</span>
                    </div>
                  </motion.div>
                )}

                {activeScreen === "booking" && (
                  <motion.div
                    key="book"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 space-y-3"
                  >
                    <h4 className="font-display text-sm font-black border-b border-white/5 pb-2">Active Bookings</h4>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                      <span className="text-[8px] text-neon uppercase font-black tracking-wider block">Coaching Call</span>
                      <span className="font-bold text-white block">Coach Marcus Vance</span>
                      <span className="text-[9px] text-white/50 block">Friday, July 31 @ 2:00 PM</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                      <span className="text-[8px] text-white/50 uppercase tracking-wider block">WOD Class</span>
                      <span className="font-bold text-white block">Sunrise Spin Session</span>
                      <span className="text-[9px] text-white/50 block">Tomorrow @ 6:15 AM</span>
                    </div>
                  </motion.div>
                )}

                {activeScreen === "qr" && (
                  <motion.div
                    key="qr-scr"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-center items-center text-center space-y-4"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-neon font-black">SCAN ENTRY PASS</span>
                    
                    {/* Simulated vector QR Code */}
                    <div className="h-32 w-32 border border-neon/30 rounded-2xl p-2.5 bg-white flex flex-wrap justify-between items-center content-around">
                      {Array.from({ length: 49 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-3 w-3 ${
                            idx % 3 === 0 || idx % 7 === 0 || idx === 0 || idx === 6 || idx === 42 || idx === 48
                              ? "bg-black"
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[9px] text-white/40">Hold scanner close to physical turnstile panel.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
