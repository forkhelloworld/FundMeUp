import { useState, useEffect } from "react";

/**
 * Custom hook for count animation
 * @param target - The target count value
 * @param delay - Delay before starting the animation (in milliseconds)
 * @returns The current count value
 */
export const useCountAnimation = (target: number, delay: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCount(target), delay);
    return () => clearTimeout(timer);
  }, [target, delay]);

  return count;
};

/**
 * Custom hook for visibility animation
 * @returns Whether the component should be visible
 */
export const useVisibilityAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return isVisible;
};
