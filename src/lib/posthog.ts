import posthog, { PostHog } from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let posthogClient: PostHog | null = null;

const isBrowser = typeof window !== "undefined";

export const isPosthogEnabled = Boolean(isBrowser && POSTHOG_KEY);

function initPosthog() {
  if (!isPosthogEnabled || posthogClient) return posthogClient;

  posthog.init(POSTHOG_KEY as string, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false, // handled manually for app router
    disable_session_recording: true,
  });

  posthogClient = posthog;
  return posthogClient;
}

export function getPosthogClient() {
  return initPosthog();
}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
): void {
  const client = getPosthogClient();
  if (!client) return;
  client.capture(name, properties);
}

export function capturePageview(): void {
  const client = getPosthogClient();
  if (!client) return;
  client.capture("$pageview");
}

export function identifyUser(
  userId?: string,
  properties?: Record<string, unknown>
): void {
  const client = getPosthogClient();
  if (!client || !userId) return;
  client.identify(userId, properties);
}

export function resetPosthog(): void {
  if (!posthogClient) return;
  posthogClient.reset();
  posthogClient = null;
}
