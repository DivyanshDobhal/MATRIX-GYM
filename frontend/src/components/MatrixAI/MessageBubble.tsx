import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Mic, Paperclip, Search, Pin, Edit3, Trash2, Download, Plus,
  MessageSquare, Star, Copy, RefreshCw, X, ChevronLeft, ChevronRight,
  Sparkles, Check, Play, AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface MessageBubbleProps {
  message: {
    sender: "user" | "ai";
    text: string;
    timestamp: string;
  };
}

const breakpoints = [640, 768, 1024, 1280];
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    const listener = () => update();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

const isMobile = () => {
  return useMediaQuery(`(max-width: ${breakpoints[0]}px)`);
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const isMobileView = isMobile();

  // Preprocess the markdown text to convert custom syntax to standard markdown
  const preprocessMarkdown = (text: string) => {
    return text.split('\n').map(line => {
      // Check for emoji headers (without trimming, because original didn't trim)
      const emojis = ['🏋️', '📅', '🥗', '💧', '😴', '⚠️', '🔥'];
      const isEmojiHeader = emojis.some(emoji => line.startsWith(emoji));
      if (isEmojiHeader) {
        return '#### ' + line; // Convert to markdown header (h4)
      }

      // Check for list items: we trim to check the start, but we want to return the entire line (with original indentation) converted?
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('✓')) {
        // Remove the leading marker (- or ✓) and any spaces after it
        const marker = trimmed.startsWith('-') ? '-' : '✓';
        const content = trimmed.slice(1).trimStart();
        // Return a markdown list item
        return '- ' + content;
      }

      return line;
    }).join('\n');
  };

  // Components to override the default rendering of ReactMarkdown
  const components = {
    h4: ({ node, ...props }: any) => (
      <h4 
        {...props} 
        className="font-display text-xs uppercase font-black tracking-wider text-neon mt-4 mb-2 flex items-center gap-1"
      >
        {node.children}
      </h4>
    ),
    strong: ({ node, ...props }: any) => (
      <strong 
        {...props} 
        className="font-black text-neon"
      >
        {node.children}
      </strong>
    ),
    p: ({ node, ...props }: any) => (
      <p 
        {...props} 
        className="text-xs text-white/70 leading-relaxed py-1"
      >
        {node.children}
      </p>
    ),
    ul: ({ node, ...props }: any) => (
      <ul 
        {...props} 
        className="list-none pl-0 m-0"
      >
        {node.children}
      </ul>
    ),
    ol: ({ node, ...props }: any) => (
      <ol 
        {...props} 
        className="list-none pl-0 m-0"
      >
        {node.children}
      </ol>
    ),
    li: ({ node, ...props }: any) => (
      <li 
        {...props} 
        className="pl-4 text-xs text-white/80 leading-relaxed py-0.5 relative list-none"
      >
        {node.children}
      </li>
    ),
  };

  const processedText = preprocessMarkdown(message.text);

  return (
    <div
      className={`max-w-[85%] rounded-2xl p-4.5 space-y-1 ${
        isUser
          ? "bg-neon text-black font-semibold ml-auto shadow-[0_0_15px_rgba(57,255,20,0.15)] border border-neon/30"
          : "glass border-white/5 mr-auto"
      }`}
    >
      <div className="space-y-1">
        {isUser ? (
          <p className="text-xs font-bold leading-relaxed">{message.text}</p>
        ) : (
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
          >
            {processedText}
          </ReactMarkdown>
        )}
      </div>
      <span
        className={`text-[8px] block text-right font-medium tracking-wider uppercase mt-1.5 ${
          isUser ? "text-black/60" : "text-white/30"
        }`}
      >
        {message.timestamp}
      </span>
    </div>
  );
}
