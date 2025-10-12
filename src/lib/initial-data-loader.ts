import { useUserStore } from "./user-store";
import { useUserProfileStore } from "./userProfile-store";

class InitialDataLoader {
  private static instance: InitialDataLoader;
  private hasLoaded = false;

  private constructor() {}

  static getInstance(): InitialDataLoader {
    if (!InitialDataLoader.instance) {
      InitialDataLoader.instance = new InitialDataLoader();
    }
    return InitialDataLoader.instance;
  }

  async loadInitialData(): Promise<void> {
    if (this.hasLoaded) {
      return;
    }

    const { isAuthenticated, token } = useUserStore.getState();

    if (!isAuthenticated || !token) {
      return;
    }

    try {
      await Promise.all([this.loadAchievements(), this.loadUserProfile()]);

      this.hasLoaded = true;
    } catch (error) {
      console.error("Failed to load initial data:", error);
    }
  }

  private async loadAchievements(): Promise<void> {
    const { fetchAchievements } = useUserStore.getState();
    await fetchAchievements();
  }

  private async loadUserProfile(): Promise<void> {
    const { fetchUserProfileData } = useUserProfileStore.getState();
    await fetchUserProfileData();
  }

  reset(): void {
    this.hasLoaded = false;
  }

  async reloadAllData(): Promise<void> {
    this.hasLoaded = false;
    await this.loadInitialData();
  }
}

export const initialDataLoader = InitialDataLoader.getInstance();

export function useInitialDataLoader() {
  return {
    loadInitialData: () => initialDataLoader.loadInitialData(),
    reset: () => initialDataLoader.reset(),
    reloadAllData: () => initialDataLoader.reloadAllData(),
  };
}
