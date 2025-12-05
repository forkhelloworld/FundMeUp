"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { useUserStore } from "@/lib/user-store";
import { loginSchema } from "@/lib/validationSchemes";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/posthog";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const t = useTranslations("auth.login");
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("auth.messages");
  const { login, isLoading } = useUserStore();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);

      trackEvent("auth_login", { method: "credentials" });

      toast.success(tMessages("loginSuccess"), {
        description: "You've successfully logged in to FundMeUp.",
      });

      form.reset();
      router.push("/lessons");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(tMessages("loginError"), {
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials and try again.",
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
      </CardContent>
    </Card>
  );
}
