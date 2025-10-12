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

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("basics") || input.includes("beginner")) {
      return "Great question! Let me break down the basics of investing:\n\n**1. What is Investing?**\nInvesting is putting your money to work to potentially earn more money over time. Instead of just saving, you're buying assets that can grow in value.\n\n**2. Key Concepts:**\n• **Compound Interest**: Your money earns money, and that money earns more money\n• **Diversification**: Don't put all your eggs in one basket\n• **Risk vs Return**: Higher potential returns usually come with higher risk\n• **Time Horizon**: The longer you invest, the more time your money has to grow\n\n**3. Common Investment Types:**\n• **Stocks**: Ownership in companies\n• **Bonds**: Loans to governments or companies\n• **ETFs/Mutual Funds**: Collections of stocks and bonds\n• **Index Funds**: Track market indexes like the S&P 500\n\nWould you like me to explain any of these concepts in more detail?";
    }

    if (input.includes("portfolio") || input.includes("allocation")) {
      return "Portfolio allocation is crucial for managing risk and achieving your goals! Here's a framework:\n\n**The 100-Age Rule:**\n• If you're 25, consider 75% stocks, 25% bonds\n• If you're 50, consider 50% stocks, 50% bonds\n\n**Asset Allocation by Age:**\n• **20s-30s**: 80-90% stocks, 10-20% bonds\n• **40s-50s**: 60-70% stocks, 30-40% bonds\n• **60s+**: 40-50% stocks, 50-60% bonds\n\n**Diversification Within Stocks:**\n• **Large Cap**: 40% (established companies)\n• **Mid Cap**: 20% (growing companies)\n• **Small Cap**: 10% (smaller companies)\n• **International**: 20% (global exposure)\n• **REITs**: 10% (real estate)\n\n**Key Principles:**\n• Rebalance annually\n• Consider your risk tolerance\n• Think about your time horizon\n• Don't try to time the market\n\nWhat's your current age and risk tolerance? I can help you create a more personalized allocation!";
    }

    if (input.includes("risk") || input.includes("tolerance")) {
      return "Understanding your risk tolerance is essential for successful investing! Here's how to assess it:\n\n**Risk Tolerance Factors:**\n\n**1. Time Horizon**\n• **Short-term (1-3 years)**: Conservative approach\n• **Medium-term (3-10 years)**: Balanced approach\n• **Long-term (10+ years)**: Can take more risk\n\n**2. Financial Situation**\n• **Emergency Fund**: 3-6 months of expenses\n• **Debt Level**: High debt = lower risk tolerance\n• **Income Stability**: Stable job = can take more risk\n\n**3. Emotional Comfort**\n• How much can you lose without losing sleep?\n• Can you handle 20-30% market drops?\n• Do you panic sell during downturns?\n\n**Risk Tolerance Levels:**\n• **Conservative**: 20-30% stocks, 70-80% bonds\n• **Moderate**: 50-60% stocks, 40-50% bonds\n• **Aggressive**: 80-90% stocks, 10-20% bonds\n\n**Quick Test:**\nIf you invested $10,000 and it dropped to $7,000 in a month, would you:\nA) Sell everything (Conservative)\nB) Hold and wait (Moderate)\nC) Buy more (Aggressive)\n\nWhat's your gut reaction to market volatility?";
    }

    if (input.includes("etf") || input.includes("fund")) {
      return "ETFs (Exchange-Traded Funds) are excellent for beginners! Here's why:\n\n**What are ETFs?**\nETFs are investment funds that trade on stock exchanges, like individual stocks, but hold a collection of assets.\n\n**Benefits:**\n• **Diversification**: One ETF can hold hundreds of stocks\n• **Low Cost**: Lower fees than mutual funds\n• **Transparency**: You know exactly what you own\n• **Flexibility**: Buy/sell anytime during market hours\n• **Tax Efficient**: Generally better tax treatment\n\n**Popular Beginner ETFs:**\n• **VTI**: Total US Stock Market\n• **VXUS**: International Stocks\n• **BND**: Total Bond Market\n• **VT**: Total World Stock Market\n\n**How to Choose:**\n• Look for low expense ratios (<0.1%)\n• Consider broad market exposure\n• Check the fund's holdings\n• Review historical performance\n\n**Sample Portfolio:**\n• 60% VTI (US stocks)\n• 20% VXUS (International)\n• 20% BND (Bonds)\n\nWould you like me to explain any specific ETFs or help you build a simple portfolio?";
    }

    if (
      input.includes("retirement") ||
      input.includes("401k") ||
      input.includes("ira")
    ) {
      return "Retirement planning is one of the most important financial goals! Here's your roadmap:\n\n**Retirement Accounts:**\n\n**1. 401(k) - Employer Sponsored**\n• **Traditional**: Pre-tax contributions, taxed in retirement\n• **Roth**: After-tax contributions, tax-free in retirement\n• **Employer Match**: Free money! Contribute at least enough to get the full match\n\n**2. IRA - Individual Retirement Account**\n• **Traditional IRA**: Pre-tax contributions\n• **Roth IRA**: After-tax contributions (income limits apply)\n• **2024 Limits**: $7,000 ($8,000 if 50+)\n\n**Contribution Strategy:**\n1. **First**: Get full 401(k) employer match\n2. **Second**: Max out Roth IRA (if eligible)\n3. **Third**: Max out 401(k) ($23,000 in 2024)\n4. **Fourth**: Taxable brokerage account\n\n**Retirement Math:**\n• **Rule of 25**: Need 25x annual expenses\n• **4% Rule**: Can withdraw 4% annually\n• **Example**: $50,000/year expenses = $1.25M needed\n\n**Time is Your Best Friend:**\n• Start early, even with small amounts\n• Compound interest works magic over decades\n• Every year you wait costs you thousands\n\nWhat's your current age and retirement goal? I can help you calculate how much to save!";
    }

    // Default response for other queries
    return "That's a great question! I'd be happy to help you with that. Could you provide a bit more detail about what specific aspect you'd like me to explain? For example:\n\n• Are you looking for beginner-friendly explanations?\n• Do you want to understand the risks involved?\n• Are you interested in specific investment types?\n• Do you need help with portfolio planning?\n\nI'm here to make investing concepts clear and help you make informed decisions. What would you like to dive deeper into?";
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user" ? "bg-emerald-500" : "bg-blue-500"
                }`}
              >
                {message.role === "user" ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-white" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >
                <div className="text-sm text-slate-200 whitespace-pre-wrap">
                  {message.content}
                </div>
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
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Bot size={16} className="text-white" />
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
