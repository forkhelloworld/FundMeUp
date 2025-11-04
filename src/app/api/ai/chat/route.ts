import { NextRequest, NextResponse } from "next/server";
import { extractTokenFromHeader, verifyToken } from "@/lib/jwt";
import {
  createApiHandler,
  AuthenticationError,
  ValidationError,
  ApiError,
} from "@/lib/api-error";

interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  error?: {
    message: string;
    type: string;
  };
}

async function chatWithAI(request: NextRequest) {
  // Verify authentication
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    throw new AuthenticationError();
  }

  const payload = verifyToken(token);
  if (!payload || typeof payload !== "object" || !("id" in payload)) {
    throw new AuthenticationError("Invalid or expired token");
  }

  // Parse request body
  const body = await request.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new ValidationError("Messages array is required");
  }

  // System prompt for AI context and instructions
  const systemPrompt: OpenRouterMessage = {
    role: "system",
    content: `You are a helpful and knowledgeable financial investment assistant for FundMeUp, an educational platform teaching people how to invest wisely and achieve financial independence.

Your role is to:
- Provide clear, beginner-friendly explanations of investing concepts
- Help users understand financial planning, portfolio allocation, risk management, and investment strategies
- Use practical examples and real-world scenarios when explaining concepts
- Encourage responsible investing and emphasize long-term thinking
- Support users in their journey toward financial independence

Guidelines for your responses:
- Keep explanations accessible and avoid unnecessary jargon. If you must use technical terms, explain them.
- Be encouraging and supportive, especially for beginners
- Focus on evidence-based investing principles (diversification, low-cost index funds, long-term perspective)
- Always include disclaimers that your advice is educational and not personalized financial advice
- Use markdown formatting (bold, lists, headers) to make responses more readable
- Be concise but thorough - balance detail with clarity
- If asked about specific investment advice, remind users to consider their personal situation and consult with a financial advisor for personalized advice

Remember: Your goal is to educate and empower users, not to replace professional financial advisors for complex situations.`,
  };

  // Validate and format messages for OpenRouter
  const validMessages: OpenRouterMessage[] = messages.map((msg: unknown) => {
    if (
      typeof msg === "object" &&
      msg !== null &&
      "role" in msg &&
      "content" in msg &&
      typeof msg.content === "string"
    ) {
      const message = msg as { role: string; content: string };
      const trimmedContent = message.content.trim();

      if (!trimmedContent) {
        throw new ValidationError("Message content cannot be empty");
      }

      // Allow user and assistant roles (system is added separately)
      if (message.role === "user" || message.role === "assistant") {
        return {
          role: message.role as "user" | "assistant",
          content: trimmedContent,
        };
      }
    }
    throw new ValidationError(
      'Invalid message format. Each message must have "role" (user/assistant) and "content" (non-empty string)'
    );
  });

  // Get API key from environment
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new ApiError("OpenRouter API key is not configured", 500, false);
  }

  // Prepare request for OpenRouter with system prompt at the beginning
  const openRouterRequest: OpenRouterRequest = {
    model: process.env.AI_BUDDY_MODEL || "openai/gpt-oss-20b:free",
    messages: [systemPrompt, ...validMessages],
    temperature: 0.7,
    max_tokens: 2000,
  };

  try {
    // Call OpenRouter API
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": request.headers.get("origin") || "",
          "X-Title": "FundMeUp AI Buddy",
        },
        body: JSON.stringify(openRouterRequest),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error?.message ||
          `OpenRouter API error: ${response.statusText}`,
        response.status,
        true
      );
    }

    const data: OpenRouterResponse = await response.json();

    if (data.error) {
      throw new ApiError(
        data.error.message || "OpenRouter API error",
        500,
        true
      );
    }

    if (
      !data.choices ||
      !Array.isArray(data.choices) ||
      data.choices.length === 0 ||
      !data.choices[0].message?.content
    ) {
      throw new ApiError("Invalid response from OpenRouter API", 500, true);
    }

    return NextResponse.json({
      content: data.choices[0].message.content,
      role: "assistant",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error) {
      // Handle network errors
      if (error.message.includes("fetch")) {
        throw new ApiError("Failed to connect to AI service", 503, true);
      }
      throw new ApiError(`AI service error: ${error.message}`, 500, true);
    }
    throw new ApiError("Unknown error occurred", 500, false);
  }
}

export const POST = createApiHandler(chatWithAI);
