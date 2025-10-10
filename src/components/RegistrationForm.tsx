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
import { registrationSchema } from "@/lib/validationSchemes";
import { useTranslations } from "next-intl";

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const t = useTranslations("auth.register");
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("auth.messages");
  const { register, isLoading } = useUserStore();
  const router = useRouter();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      toast.success(tMessages("registerSuccess"), {
        description:
          "Your account has been created successfully. Let's start your financial education journey!",
      });

      form.reset();
      router.push("/lessons");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(tMessages("registerError"), {
        description:
          error instanceof Error
            ? error.message
            : "Please check your information and try again.",
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-emerald-400">
                      {t("firstName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-emerald-400">
                      {t("lastName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="bg-slate-900/80 border-slate-600 text-white placeholder:text-emerald-400/60 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 font-mono transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono text-emerald-400">
                    {t("confirmPassword")}
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
              {isLoading ? tCommon("loading") : t("createAccount")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
