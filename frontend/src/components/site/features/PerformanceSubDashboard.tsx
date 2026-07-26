import { useState } from "react";
import { LineChart } from "../programs/shared/Charts";
import { Trophy, Download, Loader2, Check, Award, Flame, Activity } from "lucide-react";
import { toast } from "sonner";

interface PerformanceDashboardProps {
  data: any;
}

export default function PerformanceSubDashboard({ data }: PerformanceDashboardProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportComplete(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      toast.success("Fitness analytics report exported successfully!");
    }, 1800);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {data.metrics.map((m: any) => (
          <div key={m.name} className="glass rounded-3xl p-6 text-center space-y-2 border border-white/5">
            <span className="text-xs uppercase text-white/50 tracking-wider">{m.name}</span>
            <div className="text-3xl font-black text-neon">{m.value}</div>
          </div>
        ))}
      </div>

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

        {/* Milestone Badges & Export */}
        <div className="glass rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-2">
              <Trophy className="h-4.5 w-4.5 text-neon" /> Milestone Achievements
            </h3>
            <div className="space-y-3.5">
              {data.milestones.map((ms: any) => (
                <div key={ms.title} className="flex gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neon/10 border border-neon/30 text-neon">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ms.title}</h4>
                    <p className="text-[10px] text-white/40 mt-0.5 leading-relaxed">{ms.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neon py-3 text-xs font-black text-black neon-glow-btn disabled:opacity-80 transition"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Compiling Report...
                </>
              ) : exportComplete ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Report Exported
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" /> Export Analytics Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
