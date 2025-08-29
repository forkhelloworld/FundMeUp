export interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface HowItWorksStep {
  id: string;
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface PricingFeature {
  id: string;
  text: string;
}

export interface StatData {
  id: string;
  value: string;
  label: string;
  subtitle: string;
  color: string;
}

export interface ProblemPoint {
  id: string;
  emoji: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}
