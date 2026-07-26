export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mr-auto max-w-[80px] justify-center">
      <span className="h-1.5 w-1.5 bg-neon rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-1.5 w-1.5 bg-neon rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="h-1.5 w-1.5 bg-neon rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}
