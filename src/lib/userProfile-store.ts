import { create } from "zustand";
import { useUserStore } from "./user-store";

type UserProfileState = {
  currentAge: number;
  selectedFIAge: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  currentNetWorth: number;
  riskTolerance: string;
  timeHorizon: number;
  monthlyContribution: number;
};

type UserProfileActions = {
  setUserProfileData: (data: Partial<UserProfileState>) => void;
  fetchUserProfileData: () => Promise<void>;
};

const useUserProfileStore = create<UserProfileState & UserProfileActions>(
  (set) => ({
    currentAge: 25,
    selectedFIAge: 50,
    monthlyIncome: 2000,
    monthlyExpenses: 1000,
    currentNetWorth: 10000,
    riskTolerance: "moderate",
    timeHorizon: 10,
    monthlyContribution: 500,
    setUserProfileData: (data) => set((state) => ({ ...state, ...data })),
    fetchUserProfileData: async () => {
      const { token } = useUserStore.getState();
      if (!token) {
        return;
      }
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const numericData = {
            currentAge: Number(data.currentAge),
            selectedFIAge: Number(data.selectedFIAge),
            currentNetWorth: Number(data.currentNetWorth),
            monthlyIncome: Number(data.monthlyIncome),
            monthlyExpenses: Number(data.monthlyExpenses),
            riskTolerance: data.riskTolerance.toLowerCase(),
          };
          set(numericData);
        }
      } catch (error) {
        console.error("Failed to fetch simulation data from store", error);
      }
    },
  })
);

export { useUserProfileStore };
