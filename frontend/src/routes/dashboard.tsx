import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, BarChart } from "@/components/site/programs/shared/Charts";
import { Flame, Activity, GlassWater, Trophy, MessageSquare, Send, Check, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  component: UserDashboardPage
});

import { useAuth } from "../hooks/useAuth";

function UserDashboardPage() {
  const { user } = useAuth();
  // Hydration state
  const [water, setWater] = useState(1.2); // liters

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "coach", text: "Hey Alex! Awesome work on the overhead press volume yesterday. How are your shoulders feeling?" },
    { sender: "user", text: "Hey coach, feeling a bit tight but recovery is good. Ready for cardio splits today!" },
    { sender: "coach", text: "Excellent. Keep hydration above 3L today, and hit the foam roller after your HIIT sprint." }
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text: chatInput }]);
    setChatInput("");

    // Simulate coach reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "coach", text: "Got it! I will review your volume metrics and adjust tomorrow's strength split." }
      ]);
    }, 1200);
  };

  const handleAddWater = (amt: number) => {
    setWater((w) => Number((w + amt).toFixed(2)));
    toast.success(`Logged ${amt * 1000}ml of water!`);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-[10px] uppercase font-black text-neon tracking-widest">Active Member Portal</span>
            <h2 className="font-display text-3xl font-black text-white">Welcome back, {user?.name || 'Athlete'}</h2>
            <p className="text-xs text-white/50 mt-1">Manage conditioning metrics, hydration targets, and trainer comms in real-time.</p>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-2">
              <Flame className="h-4.5 w-4.5 text-neon fill-neon animate-pulse" />
              <div>
                <span className="text-[8px] text-white/40 block">STREAK</span>
                <span className="font-black text-white">18 Days</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-2">
              <Trophy className="h-4.5 w-4.5 text-neon" />
              <div>
                <span className="text-[8px] text-white/40 block">LEVEL</span>
                <span className="font-black text-white">PRO Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top widgets */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Hydration Tracker */}
          <div className="glass rounded-3xl p-6.5 border border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Hydration Target</span>
              <h3 className="font-display text-xl font-bold flex items-center gap-2 text-white">
                <GlassWater className="h-5 w-5 text-neon" /> {water} L / 3.5 L
              </h3>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neon rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((water / 3.5) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleAddWater(0.25)}
                className="rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-bold text-white hover:bg-white/10 transition"
              >
                +250 ml
              </button>
              <button
                onClick={() => handleAddWater(0.5)}
                className="rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-bold text-white hover:bg-white/10 transition"
              >
                +500 ml
              </button>
            </div>
          </div>

          {/* Metric details */}
          <div className="glass rounded-3xl p-6.5 border border-white/5 space-y-4">
            <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Today's Calorie Burn</span>
            <div className="flex justify-between items-baseline">
              <h3 className="font-display text-3xl font-black text-neon">420 kcal</h3>
              <span className="text-[10px] text-white/50 font-bold">Goal: 600 kcal</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                <span className="text-white/50">HIIT Conditioning</span>
                <span className="font-bold text-white">310 kcal</span>
              </div>
              <div className="flex justify-between pb-0.5">
                <span className="text-white/50">Lifting Session</span>
                <span className="font-bold text-white">110 kcal</span>
              </div>
            </div>
          </div>

          {/* Upcoming sessions */}
          <div className="glass rounded-3xl p-6.5 border border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-wider text-white/40 font-bold block">Next Session</span>
              <h4 className="font-display text-lg font-bold text-white">Coach Marcus Vance</h4>
              <p className="text-xs text-white/50">Friday, July 31 @ 02:00 PM (Strength Assessment)</p>
            </div>
            <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-[10px] text-white/40">
              <span>Location: Olympic Zone</span>
              <span className="font-black text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded uppercase tracking-wider">
                Reserved
              </span>
            </div>
          </div>
        </div>

        {/* Charts & Comms */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weight Progression Chart */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-neon" /> Weight Reduction & Recomposition (6 Weeks)
            </h3>
            <LineChart
              data={[
                { label: "W1", value: 82 },
                { label: "W2", value: 80.5 },
                { label: "W3", value: 79 },
                { label: "W4", value: 78.2 },
                { label: "W5", value: 76.5 },
                { label: "W6", value: 75.0 }
              ]}
              ySuffix=" kg"
            />
          </div>

          {/* Chat with Coach Widget */}
          <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between h-[360px]">
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold flex items-center gap-2 border-b border-white/5 pb-2">
                <MessageSquare className="h-4.5 w-4.5 text-neon" /> Chat with Coach Marcus
              </h3>

              {/* Message Log */}
              <div className="space-y-3.5 overflow-y-auto h-[220px] scrollbar-none pr-1 text-xs">
                {chatMessages.map((msg, idx) => {
                  const isCoach = msg.sender === "coach";
                  return (
                    <div
                      key={idx}
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                        isCoach
                          ? "bg-white/5 border border-white/10 mr-auto text-white/80"
                          : "bg-neon text-black font-semibold ml-auto"
                      }`}
                    >
                      {msg.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Input field */}
            <form onSubmit={handleSendChat} className="flex gap-2 border-t border-white/5 pt-3">
              <input
                type="text"
                placeholder="Type coach message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:border-neon focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-xl bg-neon text-black hover:opacity-90 transition shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
