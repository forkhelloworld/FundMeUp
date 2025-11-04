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
import { useUserStore } from "@/lib/user-store";
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
  const { token } = useUserStore();

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
          ...(token && { Authorization: `Bearer ${token}` }),
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
    <div className="m-4 flex flex-col h-[600px] bg-slate-900/50 rounded-lg border border-slate-700">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start space-x-3 max-w-[80%] ${
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
                  <User size={20} className="text-white" />
                ) : (
                  <Bot size={20} className="text-white" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="text-sm text-slate-200 prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Customize markdown elements styling
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
                          <em className="italic text-slate-300" {...props} />
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
                        // Table components
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
                <div className="text-xs text-slate-400 mt-1">
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
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                <div className="flex space-x-1">
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

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-3">
            {t("quickActions.title")}:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-200 text-left"
                >
                  <Icon size={20} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-slate-200">
                      {action.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {action.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
          >
            {isLoading ? t("chat.thinking") : <Send size={16} />}
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
