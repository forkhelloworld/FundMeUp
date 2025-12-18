"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Bot,
  User,
  TrendingUp,
  BookOpen,
  Calculator,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function AIChatInterface() {
  const t = useTranslations("aiBuddy");

  const QUICK_ACTIONS = [
    {
      id: "explain-basics",
      title: t("quickActions.explainBasics.title"),
      description: t("quickActions.explainBasics.description"),
      icon: BookOpen,
      prompt: t("quickActions.explainBasics.prompt"),
    },
    {
      id: "portfolio-help",
      title: t("quickActions.portfolioHelp.title"),
      description: t("quickActions.portfolioHelp.description"),
      icon: TrendingUp,
      prompt: t("quickActions.portfolioHelp.prompt"),
    },
    {
      id: "risk-assessment",
      title: t("quickActions.riskAssessment.title"),
      description: t("quickActions.riskAssessment.description"),
      icon: Calculator,
      prompt: t("quickActions.riskAssessment.prompt"),
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("chat.welcome"),
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };

    // Prepare messages for API (include conversation history + new user message)
    const apiMessages = [
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: content.trim(),
      },
    ];

    // Update UI with user message
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call AI API
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get AI response");
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          data.content || "I apologize, but I couldn't generate a response.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error
            ? `Sorry, there was an error: ${error.message}`
            : "Sorry, there was an error communicating with the AI. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] overflow-hidden md:static md:h-screen md:py-2 md:overflow-visible">
      <div className="mx-auto w-full max-w-5xl px-3 sm:px-4 h-full overflow-hidden md:w-full md:max-w-none md:px-6 md:h-full md:overflow-hidden">
        <div className="relative flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-xl overflow-hidden md:rounded-xl md:border md:shadow-xl md:h-full">
          {/* Suggested prompts */}
          {messages.length === 1 && (
            <div className="border-b border-slate-800 bg-slate-900/85 px-3 sm:px-4 py-3 md:px-6 md:py-4">
              <p className="text-xs text-slate-400 mb-2">
                {t("quickActions.title") || "Try one of these:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-100 hover:border-emerald-400/60 transition-colors"
                    >
                      <Icon size={16} className="text-emerald-300 shrink-0" />
                      <span className="whitespace-nowrap">{action.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-4 space-y-4 bg-gradient-to-b from-slate-900/80 to-slate-950 md:px-6 md:py-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 sm:gap-3 max-w-[99%] sm:max-w-[75%] md:max-w-[85%] lg:max-w-[80%] ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user" ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User size={18} className="text-white" />
                    ) : (
                      <Bot size={18} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-[16px] leading-relaxed shadow-md break-words max-w-full overflow-hidden ${
                      message.role === "user"
                        ? "bg-emerald-500/20 border border-emerald-400/30"
                        : "bg-slate-800/80 border border-slate-700"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="text-sm text-slate-200 prose prose-invert prose-sm max-w-none break-words overflow-x-auto">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ ...props }) => (
                              <h1
                                className="text-lg font-bold text-slate-100 mb-2 mt-2"
                                {...props}
                              />
                            ),
                            h2: ({ ...props }) => (
                              <h2
                                className="text-base font-bold text-slate-100 mb-2 mt-2"
                                {...props}
                              />
                            ),
                            h3: ({ ...props }) => (
                              <h3
                                className="text-sm font-semibold text-slate-100 mb-1 mt-1"
                                {...props}
                              />
                            ),
                            p: ({ ...props }) => (
                              <p className="mb-2 text-slate-200" {...props} />
                            ),
                            ul: ({ ...props }) => (
                              <ul
                                className="list-disc list-inside mb-2 space-y-1 text-slate-200"
                                {...props}
                              />
                            ),
                            ol: ({ ...props }) => (
                              <ol
                                className="list-decimal list-inside mb-2 space-y-1 text-slate-200"
                                {...props}
                              />
                            ),
                            li: ({ ...props }) => (
                              <li className="text-slate-200" {...props} />
                            ),
                            strong: ({ ...props }) => (
                              <strong
                                className="font-semibold text-slate-100"
                                {...props}
                              />
                            ),
                            em: ({ ...props }) => (
                              <em
                                className="italic text-slate-300"
                                {...props}
                              />
                            ),
                            code: ({ ...props }) => (
                              <code
                                className="bg-slate-700/50 text-emerald-300 px-1 py-0.5 rounded text-xs"
                                {...props}
                              />
                            ),
                            pre: ({ ...props }) => (
                              <pre
                                className="bg-slate-900 p-2 rounded mb-2 overflow-x-auto"
                                {...props}
                              />
                            ),
                            blockquote: ({ ...props }) => (
                              <blockquote
                                className="border-l-4 border-emerald-500/50 pl-3 italic text-slate-300 mb-2"
                                {...props}
                              />
                            ),
                            table: ({ ...props }) => (
                              <div className="overflow-x-auto my-3">
                                <table
                                  className="min-w-full border-collapse border border-slate-600 rounded"
                                  {...props}
                                />
                              </div>
                            ),
                            thead: ({ ...props }) => (
                              <thead className="bg-slate-700/50" {...props} />
                            ),
                            tbody: ({ ...props }) => <tbody {...props} />,
                            tr: ({ ...props }) => (
                              <tr
                                className="border-b border-slate-600 hover:bg-slate-700/30 transition-colors"
                                {...props}
                              />
                            ),
                            th: ({ ...props }) => (
                              <th
                                className="border border-slate-600 px-4 py-2 text-left font-semibold text-slate-100 bg-slate-700/70"
                                {...props}
                              />
                            ),
                            td: ({ ...props }) => (
                              <td
                                className="border border-slate-600 px-4 py-2 text-slate-200"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-200 whitespace-pre-wrap">
                        {message.content}
                      </div>
                    )}
                    <div className="text-[11px] text-slate-400 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 bg-slate-900/85 px-3 sm:px-4 py-3 md:px-6 md:py-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("chat.placeholder")}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                className="flex-1 bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-400 focus:border-emerald-500"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 min-w-[44px] min-h-[44px]"
              >
                {isLoading ? t("chat.thinking") : <Send size={16} />}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
