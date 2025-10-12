import { UserProfileForm } from "@/components/settings/UserProfileForm";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <UserProfileForm />
    </div>
  );
}
