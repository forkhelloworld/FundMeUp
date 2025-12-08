"use client";
import { useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/posthog";
import { loginSchema } from "@/lib/validationSchemes";
import { signInWithGoogle, signInWithCredentials } from "@/lib/auth-actions";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const t = useTranslations("auth.login");
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("auth.messages");
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Get current locale from pathname
  const locale = pathname?.split("/")[1] || "en";
  const callbackUrl = `/${locale}/lessons`;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectWithTracking = async (url: string) => {
    trackEvent("auth_login", { method: "credentials" });
    // Give PostHog a brief moment to send the event before navigation
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.location.href = url;
  };

  const handleEmailSignIn = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signInWithCredentials(
        data.email,
        data.password,
        callbackUrl
      );

      if (result?.error) {
        toast.error(tMessages("loginError"), {
          description: "Invalid email or password. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        await redirectWithTracking(result.redirectUrl || callbackUrl);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(tMessages("loginError"), {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle(callbackUrl);
      // Redirect happens on server side
    } catch (error) {
      console.error("Login error:", error);
      setIsGoogleLoading(false);
      toast.error(tMessages("loginError"), {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-800/50 border-slate-700 shadow-2xl backdrop-blur-md rounded-2xl hover:shadow-emerald-500/10 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-emerald-400 font-mono text-2xl">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-slate-400 font-sans">
          {t("subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEmailSignIn)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-emerald-400">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      className="bg-slate-900/80 border-slate-600 text-white placeholder:text-emerald-400/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 font-mono transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-emerald-400">
                    {t("password")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-slate-900/80 border-slate-600 text-white placeholder:text-emerald-400/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 font-mono transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-mono text-lg shadow-lg border-0 transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? tCommon("loading") : t("signIn")}
            </Button>
          </form>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-800/50 px-2 text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white font-mono transition-all duration-200"
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? tCommon("loading") : "Sign in with Google"}
        </Button>
      </CardContent>
    </Card>
  );
}
