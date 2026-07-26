import { useState } from "react";
import { Star, Check, Calendar, Globe, Award, Sparkles } from "lucide-react";
import john from "@/assets/trainer-1.jpg";
import sarah from "@/assets/trainer-2.jpg";
import david from "@/assets/trainer-3.jpg";
import emily from "@/assets/trainer-4.jpg";

interface TrainersDashboardProps {
  data: any;
}

export default function TrainersSubDashboard({ data }: TrainersDashboardProps) {
  const [bookedTrainer, setBookedTrainer] = useState<string | null>(null);

  // Map trainer name to local asset
  const imageMap: Record<string, string> = {
    "John Carter": john,
    "Sarah Wilson": sarah,
    "David Miller": david,
    "Emily Brown": emily
  };

  const handleBook = (name: string) => {
    setBookedTrainer(name);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-4">
        <h3 className="font-display text-xl font-bold text-neon flex items-center justify-center gap-1">
          <Sparkles className="h-4 w-4" /> MEET THE ELITE TEAM
        </h3>
        <p className="text-xs text-white/50 mt-1 leading-relaxed">
          Book an assessment session with any of our certified conditioning, weightlifting, and mobility coaches.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.trainers.map((tr: any) => {
          const isBooked = bookedTrainer === tr.name;
          const photo = imageMap[tr.name] || john;

          return (
            <div
              key={tr.name}
              className="glass rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-300"
            >
              {/* Photo & Rating Overlay */}
              <div className="relative aspect-square w-full overflow-hidden shrink-0">
                <img src={photo} alt={tr.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-black/70 border border-white/10 rounded-full px-2.5 py-1 flex items-center gap-1 text-[10px] font-bold text-white">
                  <Star className="h-3 w-3 text-neon fill-neon" /> 5.0 Rating
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div>
                    <h4 className="font-display text-lg font-black text-white leading-tight">{tr.name}</h4>
                    <span className="text-[10px] text-neon uppercase font-black tracking-widest">{tr.role}</span>
                  </div>
                  <p className="text-xs text-white/40">{tr.experience}</p>
                  
                  {/* Certs list */}
                  <div className="space-y-1.5 pt-1.5">
                    {tr.certs.map((c: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[10px] text-white/70">
                        <Award className="h-3.5 w-3.5 text-neon/60 shrink-0 mt-0.5" />
                        <span className="leading-tight">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="space-y-1.5 text-[10px] text-white/50">
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-white/30" />
                      <span>Languages: <strong className="text-white/80">{tr.languages.join(", ")}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-white/30" />
                      <span>Slots: <strong className="text-white/80">{tr.availability.split("(")[0]}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(tr.name)}
                    disabled={isBooked}
                    className={`w-full rounded-full py-2.5 text-xs font-black transition-all ${
                      isBooked
                        ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/5"
                        : "bg-neon text-black hover:opacity-90 neon-glow-btn"
                    }`}
                  >
                    {isBooked ? (
                      <span className="flex items-center justify-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Assessment Booked
                      </span>
                    ) : (
                      "Book Consultation"
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
