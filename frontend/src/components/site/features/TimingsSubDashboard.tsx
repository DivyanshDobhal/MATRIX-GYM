import { useState } from "react";
import { Clock, RefreshCw, Users, AlertCircle, Calendar } from "lucide-react";

interface TimingsDashboardProps {
  data: any;
}

export default function TimingsSubDashboard({ data }: TimingsDashboardProps) {
  const [occupancy, setOccupancy] = useState(data.occupancy.liveRate);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshOccupancy = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate random live check-in count
      const updated = Math.floor(35 + Math.random() * 50);
      setOccupancy(updated);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Timetable schedule grid */}
        <div className="glass rounded-3xl p-6 border border-white/5 space-y-4">
          <h3 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-2">
            <Clock className="h-5 w-5 text-neon" /> Opening Hours
          </h3>
          <div className="space-y-2 text-xs">
            {Object.entries(data.schedule).map(([day, hours]: any) => (
              <div key={day} className="flex justify-between border-b border-white/[0.03] pb-1.5">
                <span className="text-white/60">{day}</span>
                <span className="font-bold text-white">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Occupancy Gauge widget */}
        <div className="glass rounded-3xl p-6 border border-neon/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-28 w-28 bg-neon/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold flex items-center justify-between">
              <span className="flex items-center gap-2"><Users className="h-5 w-5 text-neon" /> Live Occupancy</span>
              <button
                onClick={handleRefreshOccupancy}
                disabled={isRefreshing}
                className="text-white/40 hover:text-neon transition"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-neon" : ""}`} />
              </button>
            </h3>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center py-4">
              <div className="relative h-32 w-32 rounded-full border-4 border-white/5 flex items-center justify-center">
                {/* SVG glowing overlay ring based on occupancy percent */}
                <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="#39FF14"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={289}
                    strokeDashoffset={289 - (289 * occupancy) / 100}
                    className="transition-all duration-500"
                    style={{ filter: "drop-shadow(0px 0px 4px rgba(57,255,20,0.5))" }}
                  />
                </svg>
                <div className="text-center z-10">
                  <div className="text-3xl font-black font-display">{occupancy}%</div>
                  <span className="text-[9px] text-white/50 uppercase tracking-widest block font-bold">Capacity</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3.5 flex items-start gap-2 text-[10px] text-white/50 leading-relaxed">
            <AlertCircle className="h-4 w-4 text-neon shrink-0 mt-0.5" />
            <p>
              Current counts show normal capacity. Off-peak hours began at 9:00 PM.
            </p>
          </div>
        </div>

        {/* Peak Hours advice */}
        <div className="glass rounded-3xl p-6 border border-white/5 space-y-4 flex flex-col justify-center">
          <h4 className="font-display text-base font-bold text-white/90">Pacing Recommendations</h4>
          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-white/40 block">Peak Hours (Heavy traffic)</span>
              <p className="text-white/80 font-semibold">{data.occupancy.peakHours}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-white/40 block">Off-Peak Hours (Less Crowded)</span>
              <p className="text-neon font-semibold">{data.occupancy.offPeak}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Class schedules list */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-neon" /> Weekly Group Timetable Classes
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.classes.map((cls: any, i: number) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 space-y-2">
              <span className="text-[9px] text-neon bg-neon/10 border border-neon/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider inline-block">
                {cls.time}
              </span>
              <h4 className="font-display text-sm font-bold text-white line-clamp-1">{cls.name}</h4>
              <p className="text-[10px] text-white/40">{cls.days}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
