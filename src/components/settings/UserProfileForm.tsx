"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/user-store";
import { useUserProfileStore } from "@/lib/userProfile-store";
import { createLocalizedFormSchema } from "@/lib/validationSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import * as z from "zod";

export function UserProfileForm() {
  const { isAuthenticated } = useUserStore();
  const { setUserProfileData, ...userProfileData } = useUserProfileStore();
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");

  const [isLoading, setIsLoading] = useState(false);

  // Create localized schema
  const localizedFormSchema = createLocalizedFormSchema(t);

  const form = useForm<z.infer<typeof localizedFormSchema>>({
    resolver: zodResolver(localizedFormSchema),
    values: userProfileData,
  });

  async function onSubmit(values: z.infer<typeof localizedFormSchema>) {
    if (!isAuthenticated) {
      toast.error(tCommon("error"), {
        description: t("messages.authenticationError"),
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t("messages.profileSaveError"));
      }

      setUserProfileData(values);

      toast.success(tCommon("success"), {
        description: t("messages.profileSaved"),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("messages.unknownError");
      toast.error(tCommon("error"), {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("userProfile.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="currentAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("userProfile.currentAge")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedFIAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("userProfile.targetFIAge")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("userProfile.monthlyIncome")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("userProfile.monthlyExpenses")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentNetWorth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("userProfile.currentNetWorth")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? t("userProfile.saving")
                : t("userProfile.saveProfile")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
