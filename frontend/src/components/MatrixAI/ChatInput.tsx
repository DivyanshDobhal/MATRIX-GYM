import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (msg: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 bg-white/[0.01] border border-white/5 rounded-2xl p-2.5">
      <input
        type="text"
        disabled={disabled}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "Coach is formulating response..." : "Ask your coach (e.g., Generate a Push Pull Legs split)..."}
        className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:border-neon focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="grid h-12 w-12 place-items-center rounded-xl bg-neon text-black hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-[0_0_10px_rgba(57,255,20,0.2)]"
      >
        {disabled ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}
