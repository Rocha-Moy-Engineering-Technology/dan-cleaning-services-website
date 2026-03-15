export interface EstimatorStepConfig {
  id: EstimatorStepId;
  title: string;
  options: EstimatorOption[];
}

export interface EstimatorOption {
  label: string;
  value: string;
}

export interface EstimatorSelections {
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  cleaningType: string;
  frequency: string;
}

export interface EstimatorResult {
  low: number;
  high: number;
}

export type EstimatorStepId = keyof EstimatorSelections;
