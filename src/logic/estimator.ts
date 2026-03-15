import type {
  EstimatorStepConfig,
  EstimatorSelections,
  EstimatorResult,
} from '../types/estimator';

const SQFT_BASE_PRICING: Record<string, EstimatorResult> = {
  'under-1000': { low: 120, high: 150 },
  '1000-1500': { low: 150, high: 190 },
  '1500-2000': { low: 190, high: 240 },
  '2000-2500': { low: 240, high: 300 },
  '2500-3000': { low: 300, high: 370 },
  '3000-plus': { low: 370, high: 450 },
};

const BEDROOM_ADDON = { low: 15, high: 20 };
const BATHROOM_ADDON = { low: 20, high: 25 };
const DEEP_CLEAN_MULTIPLIER = 1.5;

const FREQUENCY_DISCOUNTS: Record<string, number> = {
  'one-time': 0,
  weekly: 0.15,
  'bi-weekly': 0.1,
  monthly: 0.05,
};

export const ESTIMATOR_STEPS: EstimatorStepConfig[] = [
  {
    id: 'bedrooms',
    title: 'How many bedrooms?',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6+', value: '6' },
    ],
  },
  {
    id: 'bathrooms',
    title: 'How many bathrooms?',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5+', value: '5' },
    ],
  },
  {
    id: 'squareFootage',
    title: 'Approximate square footage?',
    options: [
      { label: 'Under 1,000', value: 'under-1000' },
      { label: '1,000 – 1,500', value: '1000-1500' },
      { label: '1,500 – 2,000', value: '1500-2000' },
      { label: '2,000 – 2,500', value: '2000-2500' },
      { label: '2,500 – 3,000', value: '2500-3000' },
      { label: '3,000+', value: '3000-plus' },
    ],
  },
  {
    id: 'cleaningType',
    title: 'What type of cleaning?',
    options: [
      { label: 'Standard', value: 'standard' },
      { label: 'Deep Clean', value: 'deep' },
    ],
  },
  {
    id: 'frequency',
    title: 'How often?',
    options: [
      { label: 'One-Time', value: 'one-time' },
      { label: 'Weekly (15% off)', value: 'weekly' },
      { label: 'Bi-Weekly (10% off)', value: 'bi-weekly' },
      { label: 'Monthly (5% off)', value: 'monthly' },
    ],
  },
];

export function calculateEstimate(
  selections: EstimatorSelections
): EstimatorResult {
  const base = SQFT_BASE_PRICING[selections.squareFootage];

  const extraBedrooms = Math.max(0, parseInt(selections.bedrooms, 10) - 1);
  const extraBathrooms = Math.max(0, parseInt(selections.bathrooms, 10) - 1);

  let low =
    base.low +
    extraBedrooms * BEDROOM_ADDON.low +
    extraBathrooms * BATHROOM_ADDON.low;
  let high =
    base.high +
    extraBedrooms * BEDROOM_ADDON.high +
    extraBathrooms * BATHROOM_ADDON.high;

  if (selections.cleaningType === 'deep') {
    low *= DEEP_CLEAN_MULTIPLIER;
    high *= DEEP_CLEAN_MULTIPLIER;
  }

  const discount = FREQUENCY_DISCOUNTS[selections.frequency];
  low = Math.round(low * (1 - discount));
  high = Math.round(high * (1 - discount));

  return { low, high };
}
