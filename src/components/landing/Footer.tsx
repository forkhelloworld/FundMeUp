import { getCurrentYear } from "@/utils/landingUtils";

export const Footer = () => (
  <footer className="py-2 px-4 mb-4">
    <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
      <div>&copy; {getCurrentYear()} FundMeUp. All rights reserved.</div>
      <nav className="flex gap-6 mt-4 md:mt-0" aria-label="Footer navigation">
        <a href="#" className="hover:text-emerald-400 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-emerald-400 transition-colors">
          Terms of Service
        </a>
      </nav>
    </div>
  </footer>
);
