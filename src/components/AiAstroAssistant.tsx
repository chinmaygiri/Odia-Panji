import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AiAstroAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "ଜୟ ଜଗନ୍ନାଥ! 🙏 ମୁଁ ଆପଣଙ୍କ ଓଡ଼ିଶା ସଂସ୍କୃତି ଓ ପାଞ୍ଜି ସାଥୀ AI। ଓଡ଼ିଶାର ପର୍ବପର୍ବାଣୀ, ଓଷା-ବ୍ରତ ରୀତିନୀତି, ନିଷିଦ୍ଧ ଖାଦ୍ୟ କିମ୍ବା ଆଜିର ତିଥି-ନକ୍ଷତ୍ରର ଜ୍ୟୋତିଷ ପ୍ରଭାବ ବିଷୟରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "ରଜ ପର୍ବର ପାରମ୍ପରିକ ବିଧି କଣ?",
    "ପ୍ରଥମାଷ୍ଟମୀରେ ଏଣ୍ଡୁରି ପିଠା କାହିଁକି ପ୍ରସ୍ତୁତ କରାଯାଏ?",
    "ଆଜି କେଉଁ କେଉଁ ଖାଦ୍ୟ ନିଷିଦ୍ଧ ଏବଂ କାହିଁକି?",
    "ରଥଯାତ୍ରାର ଚେରା ପହଁରା ରୀତିର ମହତ୍ତ୍ଵ କଣ?"
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          systemInstruction: "You are an expert in Odia Vedic astrology (Panji), Panchang calculations, and Odisha's rich heritage and cultural rituals. Respond in Odia script or a clean, highly respectful blend of Odia and English. Answer queries about Odisha festivals, food rules, and horoscope transits accurately and with deep cultural pride."
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `କ୍ଷମା କରିବେ, ଏକ ସମସ୍ୟା ଦେଖାଦେଲା: ${data.error}`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.text }
        ]);
      }
    } catch (err) {
      console.error("Error asking Gemini assistant:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "ସର୍ଭର ସହ ଯୋଗାଯୋଗ ହୋଇପାରିଲା ନାହିଁ। ଦୟାକରି ଆପଣଙ୍କ ଇଣ୍ଟରନେଟ୍ କନେକ୍ସନ୍ ଯାଞ୍ଚ କରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-astro-assistant-container" className="max-w-md mx-auto mt-6 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/40 dark:border-slate-800/80 flex flex-col h-[520px] transition-colors duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-left">
        <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-red-600 dark:text-red-400 animate-pulse" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 font-display">
            ଜେମିନି ପାଞ୍ଜି ସାଥୀ (AI Sathi)
          </h3>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans mt-0.5">
            Odia Culture & Astrology Expert
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
        {messages.map((msg, idx) => {
          const isAssistant = msg.role === "assistant";
          return (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] text-left ${
                isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${
                  isAssistant ? "bg-red-600 dark:bg-red-700" : "bg-slate-700 dark:bg-slate-600"
                }`}
              >
                {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed tracking-wide font-sans ${
                  isAssistant
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm whitespace-pre-line"
                    : "bg-red-600 dark:bg-red-700 text-white rounded-tr-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="w-7 h-7 rounded-full bg-red-600 dark:bg-red-700 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl text-xs text-slate-500 dark:text-slate-450 font-semibold flex items-center gap-1.5 rounded-tl-sm">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>ବିଚାର କରୁଛି...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="py-2 flex flex-wrap gap-1.5 justify-start border-t border-slate-50 dark:border-slate-800">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-750 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-all duration-200 text-left shrink-0 cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2"
      >
        <input
          type="text"
          id="ai-assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ଓଡ଼ିଆ କିମ୍ବା ଇଂରାଜୀରେ ପଚାରନ୍ତୁ..."
          className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-850 dark:text-slate-100 rounded-xl px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-red-500 font-sans"
        />
        <button
          type="submit"
          id="ai-assistant-submit-btn"
          disabled={loading || !input.trim()}
          className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800 disabled:bg-slate-300 dark:disabled:bg-slate-800 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
