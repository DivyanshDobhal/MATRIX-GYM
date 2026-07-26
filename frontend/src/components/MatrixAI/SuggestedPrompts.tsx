interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  "Create a muscle gain plan",
  "Calculate my daily calories",
  "Suggest a HIIT workout",
  "Help me lose fat",
  "Generate a Push Pull Legs split",
  "Create a vegetarian diet",
  "Best exercises for chest",
  "Improve flexibility",
  "Explain creatine"
];

export default function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-2.5">
      {prompts.map((p, idx) => (
        <button
          key={idx}
          onClick={() => onSelectPrompt(p)}
          className="rounded-full bg-white/5 hover:bg-neon hover:text-black border border-white/10 px-4 py-2 text-xs text-white/80 font-bold transition-all duration-200"
        >
          {p}
        </button>
      ))}
    </div>
  );
}
