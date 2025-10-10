import { getCurrentYear } from "@/utils/landingUtils";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("landing.footer");

  return (
    <footer className="py-2 px-4 mb-4">
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
        <div>&copy; {getCurrentYear()} FundMeUp. All rights reserved.</div>
        <nav className="flex gap-6 mt-4 md:mt-0" aria-label="Footer navigation">
          <a href="#" className="hover:text-emerald-400 transition-colors">
            {t("links.privacy")}
          </a>
          <a href="#" className="hover:text-emerald-400 transition-colors">
            {t("links.terms")}
          </a>
        </nav>
      </div>
    </footer>
  );
};
