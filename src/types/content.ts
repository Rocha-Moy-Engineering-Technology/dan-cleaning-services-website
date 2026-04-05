export type ServiceCategoryType = 'home' | 'commercial';

export interface ServiceCategory {
  slug: string;
  title: string;
  description: string;
  accentColor: string;
  features: string[];
  included: string[];
  category: ServiceCategoryType;
  hasCalculator: boolean;
}

export interface ValueProposition {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStepData {
  number: number;
  title: string;
  description: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
  address: string;
}
