import { useState, useEffect, useRef } from "react";
import { Accordion } from "./shared/Accordion";
import { MessageSquare, Calendar, Send, Star, User, Video, ShieldCheck, Check } from "lucide-react";
import trainerImg from "@/assets/trainer-1.jpg";

interface CoachingProps {
  data: any;
  activeTab: string;
}

const calendarSlots = [
  { day: "Mon", date: "July 27", slots: ["09:00 AM", "11:30 AM", "03:00 PM", "05:30 PM"] },
  { day: "Wed", date: "July 29", slots: ["10:00 AM", "01:00 PM", "04:30 PM", "06:00 PM"] },
  { day: "Fri", date: "July 31", slots: ["08:30 AM", "11:00 AM", "02:00 PM", "05:00 PM"] },
  { day: "Sat", date: "August 01", slots: ["09:00 AM", "12:00 PM", "02:30 PM"] }
];

const initialMessages = [
  { sender: "coach", text: "Hey! Welcome to your MATRIX Personal Coaching portal.", time: "10:30 AM" },
  { sender: "coach", text: "I've reviewed your biometric baseline. Have you had a chance to track your macros today?", time: "10:31 AM" }
];

const coachReplies = [
  "Awesome! Keep up the consistency. Remember that hydration is key during heavy lifting days.",
  "Excellent effort. Make sure you are prioritizing 8 hours of sleep tonight for muscle recovery.",
  "Understood. If you feel any joint strain during deadlifts, film a quick set and send it here for form analysis.",
  "Let's focus on progressive overload this week. Try to add 2.5kg to your working sets if form permits!",
  "Great job hitting your protein target. Fueling the body correctly is 70% of the battle!"
];

export default function PersonalCoachingDashboard({ data, activeTab }: CoachingProps) {
  // Calendar States
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedStatus, setBookedStatus] = useState<string | null>(null);

  // Chat States
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulated Coach Reply
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        sender: "coach",
        text: coachReplies[Math.floor(Math.random() * coachReplies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const handleBookSlot = () => {
    if (!selectedSlot) return;
    const selectedDate = calendarSlots.find((c) => c.day === selectedDay)?.date;
    setBookedStatus(`${selectedDate} at ${selectedSlot}`);
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
              <h3 className="font-display text-xl font-bold">What is Included</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Custom Workouts", desc: "Tailored lifts and conditioning splits." },
                  { title: "Custom Nutrition", desc: "Macro budgets and meal updates." },
                  { title: "Video Consultation", desc: "Weekly 1-on-1 progress reviews." },
                  { title: "Continuous Chat", desc: "Direct messaging portal with your coach." }
                ].map((inc) => (
                  <div key={inc.title} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                    <h4 className="font-display text-sm font-bold text-neon">{inc.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{inc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-neon/20">
              <h3 className="font-display text-xl font-bold text-neon">Program Stats</h3>
              <div className="space-y-3.5">
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Primary Focus</span>
                  <span className="font-bold">1-on-1 customization</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-white/50">Availability</span>
                  <span className="font-bold text-neon">6 days / week</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Communication</span>
                  <span className="font-bold">Chat & video calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "workouts" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Slot Selector */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 space-y-5 border border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold flex items-center gap-2 border-b border-white/10 pb-3">
                <Calendar className="h-5 w-5 text-neon" /> Book 1-on-1 Coaching Consultation
              </h3>

              {/* Day selection */}
              <div className="grid grid-cols-4 gap-2">
                {calendarSlots.map((c) => (
                  <button
                    key={c.day}
                    onClick={() => {
                      setSelectedDay(c.day);
                      setSelectedSlot("");
                      setBookedStatus(null);
                    }}
                    className={`rounded-xl p-3 text-center border transition-all ${
                      selectedDay === c.day
                        ? "bg-neon/10 border-neon text-neon"
                        : "bg-white/[0.02] border-white/5 hover:border-white/10"
                    }`}
                  >
                    <span className="text-[10px] uppercase text-white/50 block">{c.day}</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{c.date.split(" ")[1]}</span>
                  </button>
                ))}
              </div>

              {/* Slots selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase text-white/60 tracking-wider">Available time slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {calendarSlots
                    .find((c) => c.day === selectedDay)
                    ?.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setBookedStatus(null);
                        }}
                        className={`rounded-xl py-2.5 text-xs font-semibold transition-all ${
                          selectedSlot === slot
                            ? "bg-neon text-black font-black"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Book trigger */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                {bookedStatus ? (
                  <span className="text-xs text-green-400 font-bold flex items-center gap-1.5 justify-center sm:justify-start">
                    <Check className="h-4 w-4" /> Booked: {bookedStatus}
                  </span>
                ) : selectedSlot ? (
                  <span className="text-xs text-white/60">Selected slot: <strong className="text-neon">{selectedSlot}</strong></span>
                ) : (
                  <span className="text-xs text-white/40">Select a day and slot to book.</span>
                )}
              </div>
              <button
                onClick={handleBookSlot}
                disabled={!selectedSlot || !!bookedStatus}
                className="rounded-full bg-neon px-8 py-3 text-xs font-black text-black disabled:opacity-50 disabled:cursor-not-allowed neon-glow-btn transition"
              >
                {bookedStatus ? "Session Reserved" : "Confirm Booking"}
              </button>
            </div>
          </div>

          {/* Video Consultation Box */}
          <div className="glass rounded-3xl p-6 border border-neon/20 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Video className="h-4 w-4 text-neon" /> Video Consultation
              </h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Connect live with your coach for a weekly biomechanics review and body fat caliper progress check.
              </p>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] uppercase text-white/50 tracking-wider block">Next Scheduled Video Call</span>
                <span className="text-sm font-bold text-white block mt-1">Friday, July 31 @ 2:00 PM</span>
              </div>
            </div>
            <button className="w-full rounded-full bg-white/10 border border-white/20 py-3 text-xs font-bold text-white/80 hover:bg-neon hover:text-black hover:border-transparent transition-all mt-4">
              Enter Virtual Room
            </button>
          </div>
        </div>
      )}

      {activeTab === "nutrition" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h3 className="font-display text-2xl font-bold border-b border-white/10 pb-3">Tailored Programming</h3>
            <p className="text-sm md:text-base text-white/70 leading-relaxed">
              Unlike static templates, your workout and nutrition splits are rewritten weekly by your trainer to sync with sleep metrics, metabolic adaptions, and joint recovery rates.
            </p>
            <div className="space-y-3 pt-2 text-xs md:text-sm">
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Bi-Weekly Calibrations</strong>: Adjust calorie splits according to scale trends and biofeedback measurements.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-neon font-black">•</span>
                <p className="text-white/60"><strong>Direct Bio-Syncing</strong>: Training volume scales down during high-cortisol weeks to prioritize recovery.</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8 space-y-4 border border-white/5">
            <h4 className="font-display text-lg font-bold">Bi-Weekly Review Checkpoints</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Bio-Tracker Updates</span>
                <span className="text-white/60">Every Sunday evening (Calipers & tape)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-white/70">Macro Calibrations</span>
                <span className="text-white/60">Every 2 weeks depending on scale progression</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-white/70">Support Access</span>
                <span className="text-white/60">Mon - Sat (10:00 AM - 8:00 PM chat window)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neon" /> Bio-Metric Trends
              </h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Your trainer maps weekly changes in circumference measurements to track visceral fat reduction.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-2">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <span className="text-[9px] uppercase text-white/50 tracking-wider">Waist</span>
                  <div className="text-base font-black text-neon mt-0.5">- 3.2 cm</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <span className="text-[9px] uppercase text-white/50 tracking-wider">Chest</span>
                  <div className="text-base font-black text-white mt-0.5">+ 2.0 cm</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <span className="text-[9px] uppercase text-white/50 tracking-wider">Arms</span>
                  <div className="text-base font-black text-white mt-0.5">+ 0.8 cm</div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <span className="text-[9px] uppercase text-white/50 tracking-wider">Thighs</span>
                  <div className="text-base font-black text-neon mt-0.5">- 1.2 cm</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-neon/20 flex flex-col justify-between text-center">
            <span className="text-xs uppercase text-white/50 tracking-wider">Compliancy Score</span>
            <div className="text-4xl font-black text-neon my-2">95 %</div>
            <p className="text-[10px] text-white/40 leading-relaxed max-w-xs mx-auto">Calculated from completed training log submissions and diet tracking checklist submission logs.</p>
          </div>
        </div>
      )}

      {activeTab === "trainer" && (
        <div className="max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-neon/10">
          <img
            src={trainerImg}
            alt="Coach Marcus Vance"
            className="h-44 w-44 rounded-2xl object-cover shrink-0 mx-auto"
          />
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] uppercase font-black text-neon tracking-widest">Master Personal Trainer</span>
              <h3 className="font-display text-2xl font-black">Marcus Vance</h3>
              <p className="text-white/60 text-sm mt-1 leading-relaxed">
                Marcus specializes in bio-adaptive physical coaching. He will be your primary point of contact, managing your nutrition, routines, and weekly consultations.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">CSCS *D Credential</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10">8 Years Exp</span>
              <span className="rounded-full bg-white/5 px-3 py-1 font-bold text-white/80 border border-white/10 flex items-center gap-1">
                <Star className="h-3 w-3 text-neon fill-neon" /> 4.9 Rating
              </span>
            </div>
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
          {/* Chat Interface Inside Reviews (Or as messaging placeholder) */}
          <div className="glass rounded-3xl border border-neon/20 overflow-hidden flex flex-col h-[380px] bg-black/60 backdrop-blur-md">
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-3">
              <div className="relative">
                <img src={trainerImg} className="h-10 w-10 rounded-full object-cover" alt="Coach Marcus" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-neon border border-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Coach Marcus Vance</h4>
                <span className="text-[10px] text-neon uppercase font-black tracking-wider">Active Consultation</span>
              </div>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[75%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-neon text-black font-semibold"
                        : "bg-white/5 border border-white/10 text-white/90"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-white/30 mt-1">{msg.time}</span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 text-neon max-w-[75%] bg-white/5 border border-white/10 px-4 py-3 rounded-2xl mr-auto">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat inputs */}
            <div className="border-t border-white/5 p-4 flex gap-2.5 bg-black/40">
              <input
                type="text"
                placeholder="Type message to Coach..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-neon"
              />
              <button
                onClick={handleSendMessage}
                className="rounded-xl bg-neon p-2.5 text-black hover:opacity-90 transition shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
