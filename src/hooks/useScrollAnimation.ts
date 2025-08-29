import { useState, useEffect, useRef, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number; // Percentage of element visible (0-1)
  rootMargin?: string; // CSS margin around root
  triggerOnce?: boolean; // Whether to trigger animation only once
}

/**
 * Custom hook for scroll-triggered animations
 * @param options - Configuration options for the intersection observer
 * @returns Object containing isVisible state and ref to attach to element
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<Element>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If triggerOnce is true, disconnect the observer after triggering
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // If not triggerOnce, hide when element is out of view
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    isVisible,
    elementRef: elementRef as RefObject<HTMLElement | HTMLDivElement>,
  };
};

/**
 * Custom hook for scroll-triggered count animation
 * @param target - The target count value
 * @param delay - Delay before starting the animation (in milliseconds)
 * @param options - Intersection observer options
 * @returns Object containing count value and ref to attach to element
 */
export const useScrollCountAnimation = (
  target: number,
  delay: number = 0,
  options: UseScrollAnimationOptions = {}
) => {
  const [count, setCount] = useState(0);
  const { isVisible, elementRef } = useScrollAnimation(options);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setCount(target), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, target, delay]);

  return { count, elementRef };
};
