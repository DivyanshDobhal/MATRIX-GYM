import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-40">
      <div className="flex space-x-1 p-2 max-w-7xl mx-auto px-6 md:px-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 outline-none select-none shrink-0 ${
                isActive ? "text-black font-black" : "text-white/60 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-full bg-neon shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
