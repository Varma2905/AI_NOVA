import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const parts: Array<{ text: string; bordered?: boolean }> = [];

  const re = /\*\*(.+?)\*\*/gs;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(content)) !== null) {
    const idx = match.index;
    if (idx > lastIndex) {
      parts.push({ text: content.slice(lastIndex, idx) });
    }
    parts.push({ text: match[1], bordered: true });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push({ text: content.slice(lastIndex) });
  }

  return (
    <div className={cn(
      "flex w-full animate-fade-in",
      role === "user" ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-lg",
        role === "user" 
          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" 
          : "bg-card text-card-foreground border border-border"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {parts.map((p, i) =>
            p.bordered ? (
              <span
                key={i}
                className="inline-block border rounded px-2 py-0.5 mx-0.5 text-[0.95em]"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {p.text}
              </span>
            ) : (
              <span key={i}>{p.text}</span>
            )
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
