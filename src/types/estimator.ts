export interface EstimatorStepConfig {
  id: string;
  title: string;
  options: EstimatorOption[];
  multiSelect?: boolean;
}

export interface EstimatorOption {
  label: string;
  value: string;
}

/** Residential-specific selections (kept for backward compat with tests) */
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

/** Generic calculate function signature */
export type CalculateFn = (
  selections: Record<string, string>,
) => EstimatorResult;

/** Full estimator configuration for a service */
export interface EstimatorConfig {
  steps: EstimatorStepConfig[];
  calculate: CalculateFn;
}
