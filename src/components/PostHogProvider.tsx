"use client";

import { ReactNode, useEffect } from "react";
import { PostHogProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  capturePageview,
  getPosthogClient,
  isPosthogEnabled,
} from "@/lib/posthog";

export function PostHogClientProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    capturePageview();
  }, [pathname, searchParams]);

  if (!isPosthogEnabled) {
    return <>{children}</>;
  }

  const client = getPosthogClient();
  if (!client) {
    return <>{children}</>;
  }

  return <PostHogProvider client={client}>{children}</PostHogProvider>;
}

