import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";

interface ChatWindowProps {
  messages: Array<{
    sender: "user" | "ai";
    text: string;
    timestamp: string;
  }>;
  isTyping: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export default function ChatWindow({ messages, isTyping, onSelectPrompt }: ChatWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col flex-1 h-[450px] justify-between">
      {/* Messages viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/5 py-4"
      >
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Suggested prompts list */}
      {messages.length <= 1 && (
        <div className="border-t border-white/5 pt-4">
          <span className="text-[9px] uppercase tracking-widest text-white/40 text-center block mb-2 font-bold">Suggested Coach Queries</span>
          <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
        </div>
      )}
    </div>
  );
}
