export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5 },
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7 },
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.3, y: 50 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { type: "spring" as const, stiffness: 260, damping: 20 },
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -10, scale: 0.8 },
  whileInView: { opacity: 1, rotate: 0, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
};
