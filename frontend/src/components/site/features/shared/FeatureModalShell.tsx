import { ReactNode } from "react";
import { motion } from "framer-motion";
import { X, LucideIcon } from "lucide-react";

interface FeatureModalShellProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  onClose: () => void;
  children: ReactNode;
}

export function FeatureModalShell({
  id,
  title,
  description,
  icon: Icon,
  onClose,
  children
}: FeatureModalShellProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl text-white select-none scrollbar-thin">
      {/* Background Neon Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-10 right-1/4 h-[300px] w-[300px] rounded-full bg-neon/5 blur-[100px]" />
        <div className="absolute bottom-20 left-1/4 h-[350px] w-[350px] rounded-full bg-neon/10 blur-[130px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center py-12 px-6 md:px-10">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-6xl rounded-3xl border border-white/10 bg-charcoal-2/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col min-h-[500px]"
        >
          {/* Header Panel */}
          <div className="relative border-b border-white/5 p-6 md:p-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-neon/10 border border-neon/30 shadow-[0_0_15px_rgba(57,255,20,0.15)]">
                <Icon className="h-6 w-6 text-neon" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-neon tracking-widest">Why Choose Matrix</span>
                <h1 className="font-display text-2xl md:text-3xl font-black text-white">{title}</h1>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-neon hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Description banner */}
          <div className="bg-white/[0.01] border-b border-white/5 px-6 md:px-8 py-4.5">
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-semibold">
              {description}
            </p>
          </div>

          {/* Dynamic Body Slot */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
