import type {
  EstimatorStepConfig,
  EstimatorSelections,
  EstimatorResult,
  EstimatorConfig,
} from '../types/estimator';

// ---------------------------------------------------------------------------
// RESIDENTIAL CLEANING
// ---------------------------------------------------------------------------

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
const MOVE_IN_OUT_MULTIPLIER = 1.75;
const POST_RENOVATION_MULTIPLIER = 2.0;

const FREQUENCY_DISCOUNTS: Record<string, number> = {
  'one-time': 0,
  weekly: 0.15,
  'bi-weekly': 0.1,
  monthly: 0.05,
};

const CLEANING_TYPE_MULTIPLIERS: Record<string, number> = {
  standard: 1.0,
  deep: DEEP_CLEAN_MULTIPLIER,
  'move-in-out': MOVE_IN_OUT_MULTIPLIER,
  'post-renovation': POST_RENOVATION_MULTIPLIER,
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
      { label: 'Move-In / Move-Out', value: 'move-in-out' },
      { label: 'Post-Renovation', value: 'post-renovation' },
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
  selections: EstimatorSelections,
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

  const multiplier = CLEANING_TYPE_MULTIPLIERS[selections.cleaningType] ?? 1.0;
  low *= multiplier;
  high *= multiplier;

  const discount = FREQUENCY_DISCOUNTS[selections.frequency] ?? 0;
  low = Math.round(low * (1 - discount));
  high = Math.round(high * (1 - discount));

  return { low, high };
}

export const RESIDENTIAL_CONFIG: EstimatorConfig = {
  steps: ESTIMATOR_STEPS,
  calculate: calculateEstimate as (
    s: Record<string, string>,
  ) => EstimatorResult,
};

// ---------------------------------------------------------------------------
// RENTAL & AIRBNB CLEANING
// ---------------------------------------------------------------------------

const RENTAL_PROPERTY_PRICING: Record<string, EstimatorResult> = {
  studio: { low: 80, high: 100 },
  '1-bedroom': { low: 100, high: 130 },
  '2-bedroom': { low: 130, high: 170 },
  '3-bedroom': { low: 170, high: 220 },
  '4-plus': { low: 220, high: 280 },
};

const RENTAL_BATHROOM_ADDON = { low: 20, high: 25 };

const RENTAL_CLEANING_MULTIPLIERS: Record<string, number> = {
  'standard-turnover': 1.0,
  'deep-clean': 1.5,
  'move-in-out': 1.75,
};

const RENTAL_FREQUENCY_DISCOUNTS: Record<string, number> = {
  'per-booking': 0,
  weekly: 0.15,
  'bi-weekly': 0.1,
  monthly: 0.05,
};

const RENTAL_STEPS: EstimatorStepConfig[] = [
  {
    id: 'propertyType',
    title: 'Property type?',
    options: [
      { label: 'Studio', value: 'studio' },
      { label: '1 Bedroom', value: '1-bedroom' },
      { label: '2 Bedrooms', value: '2-bedroom' },
      { label: '3 Bedrooms', value: '3-bedroom' },
      { label: '4+ Bedrooms', value: '4-plus' },
    ],
  },
  {
    id: 'bathrooms',
    title: 'How many bathrooms?',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4+', value: '4' },
    ],
  },
  {
    id: 'cleaningType',
    title: 'What type of turnover?',
    options: [
      { label: 'Standard Turnover', value: 'standard-turnover' },
      { label: 'Deep Clean', value: 'deep-clean' },
      { label: 'Move-In / Move-Out', value: 'move-in-out' },
    ],
  },
  {
    id: 'extras',
    title: 'Any extras?',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Linen Change & Bed Making', value: 'linen' },
      { label: 'Amenity Restocking Assist', value: 'restock' },
      { label: 'Linen + Restocking', value: 'linen-restock' },
    ],
  },
  {
    id: 'frequency',
    title: 'How often?',
    options: [
      { label: 'Per Booking', value: 'per-booking' },
      { label: 'Weekly (15% off)', value: 'weekly' },
      { label: 'Bi-Weekly (10% off)', value: 'bi-weekly' },
      { label: 'Monthly (5% off)', value: 'monthly' },
    ],
  },
];

function calculateRentalEstimate(
  selections: Record<string, string>,
): EstimatorResult {
  const base = RENTAL_PROPERTY_PRICING[selections.propertyType] ?? {
    low: 100,
    high: 130,
  };

  const extraBathrooms = Math.max(0, parseInt(selections.bathrooms, 10) - 1);

  let low = base.low + extraBathrooms * RENTAL_BATHROOM_ADDON.low;
  let high = base.high + extraBathrooms * RENTAL_BATHROOM_ADDON.high;

  const multiplier =
    RENTAL_CLEANING_MULTIPLIERS[selections.cleaningType] ?? 1.0;
  low *= multiplier;
  high *= multiplier;

  const extrasAddon: Record<string, EstimatorResult> = {
    none: { low: 0, high: 0 },
    linen: { low: 25, high: 35 },
    restock: { low: 20, high: 30 },
    'linen-restock': { low: 40, high: 55 },
  };
  const extras = extrasAddon[selections.extras] ?? { low: 0, high: 0 };
  low += extras.low;
  high += extras.high;

  const discount = RENTAL_FREQUENCY_DISCOUNTS[selections.frequency] ?? 0;
  low = Math.round(low * (1 - discount));
  high = Math.round(high * (1 - discount));

  return { low, high };
}

export const RENTAL_CONFIG: EstimatorConfig = {
  steps: RENTAL_STEPS,
  calculate: calculateRentalEstimate,
};

// ---------------------------------------------------------------------------
// SPECIALTY CLEANING (carpet, upholstery, windows, mattress)
// ---------------------------------------------------------------------------

const SPECIALTY_BASE_PRICING: Record<string, Record<string, EstimatorResult>> =
  {
    carpet: {
      small: { low: 80, high: 100 },
      medium: { low: 120, high: 160 },
      large: { low: 180, high: 230 },
      'extra-large': { low: 250, high: 320 },
    },
    upholstery: {
      small: { low: 60, high: 80 },
      medium: { low: 100, high: 140 },
      large: { low: 160, high: 210 },
      'extra-large': { low: 230, high: 300 },
    },
    windows: {
      small: { low: 80, high: 100 },
      medium: { low: 120, high: 160 },
      large: { low: 180, high: 230 },
      'extra-large': { low: 250, high: 320 },
    },
    mattress: {
      small: { low: 60, high: 80 },
      medium: { low: 80, high: 110 },
      large: { low: 100, high: 140 },
      'extra-large': { low: 150, high: 220 },
    },
  };

const CONDITION_MULTIPLIERS: Record<string, number> = {
  light: 1.0,
  moderate: 1.2,
  heavy: 1.5,
};

const SPECIALTY_EXTRAS_ADDON: Record<string, EstimatorResult> = {
  none: { low: 0, high: 0 },
  stain: { low: 25, high: 35 },
  deodorize: { low: 20, high: 30 },
  protection: { low: 30, high: 40 },
  'stain-deodorize': { low: 40, high: 55 },
};

const SPECIALTY_STEPS: EstimatorStepConfig[] = [
  {
    id: 'serviceType',
    title: 'What do you need cleaned?',
    options: [
      { label: 'Carpet Cleaning', value: 'carpet' },
      { label: 'Couch & Upholstery', value: 'upholstery' },
      { label: 'Window Cleaning', value: 'windows' },
      { label: 'Mattress Cleaning', value: 'mattress' },
    ],
  },
  {
    id: 'size',
    title: 'How large is the job?',
    options: [
      { label: 'Small (1–2 rooms / pieces)', value: 'small' },
      { label: 'Medium (3–4 rooms / pieces)', value: 'medium' },
      { label: 'Large (5–6 rooms / pieces)', value: 'large' },
      { label: 'Extra Large (7+)', value: 'extra-large' },
    ],
  },
  {
    id: 'condition',
    title: 'Current condition?',
    options: [
      { label: 'Light Soiling', value: 'light' },
      { label: 'Moderate Use', value: 'moderate' },
      { label: 'Heavy Stains / Buildup', value: 'heavy' },
    ],
  },
  {
    id: 'extras',
    title: 'Any add-on treatments?',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Stain Treatment (+$25–35)', value: 'stain' },
      { label: 'Deodorizing (+$20–30)', value: 'deodorize' },
      { label: 'Protection Coating (+$30–40)', value: 'protection' },
      { label: 'Stain + Deodorize (+$40–55)', value: 'stain-deodorize' },
    ],
  },
];

function calculateSpecialtyEstimate(
  selections: Record<string, string>,
): EstimatorResult {
  const typePricing = SPECIALTY_BASE_PRICING[selections.serviceType];
  const base = typePricing?.[selections.size] ?? { low: 100, high: 140 };

  const conditionMult = CONDITION_MULTIPLIERS[selections.condition] ?? 1.0;
  let low = base.low * conditionMult;
  let high = base.high * conditionMult;

  const extras = SPECIALTY_EXTRAS_ADDON[selections.extras] ?? {
    low: 0,
    high: 0,
  };
  low = Math.round(low + extras.low);
  high = Math.round(high + extras.high);

  return { low, high };
}

export const SPECIALTY_CONFIG: EstimatorConfig = {
  steps: SPECIALTY_STEPS,
  calculate: calculateSpecialtyEstimate,
};

// ---------------------------------------------------------------------------
// SPECIAL SERVICES (garage, closet, attic/basement, storage)
// ---------------------------------------------------------------------------

const SPECIAL_BASE_PRICING: Record<string, Record<string, EstimatorResult>> = {
  garage: {
    small: { low: 150, high: 200 },
    medium: { low: 220, high: 300 },
    large: { low: 320, high: 420 },
    'extra-large': { low: 450, high: 580 },
  },
  closet: {
    small: { low: 60, high: 90 },
    medium: { low: 100, high: 150 },
    large: { low: 170, high: 240 },
    'extra-large': { low: 280, high: 380 },
  },
  'attic-basement': {
    small: { low: 120, high: 170 },
    medium: { low: 190, high: 260 },
    large: { low: 280, high: 380 },
    'extra-large': { low: 400, high: 530 },
  },
  storage: {
    small: { low: 80, high: 110 },
    medium: { low: 120, high: 170 },
    large: { low: 190, high: 260 },
    'extra-large': { low: 280, high: 380 },
  },
};

const WORK_LEVEL_MULTIPLIERS: Record<string, number> = {
  'light-organizing': 1.0,
  'full-declutter': 1.3,
  'complete-cleanout': 1.6,
};

const DISPOSAL_ADDON: Record<string, EstimatorResult> = {
  none: { low: 0, high: 0 },
  some: { low: 50, high: 75 },
  full: { low: 100, high: 150 },
};

const SPECIAL_STEPS: EstimatorStepConfig[] = [
  {
    id: 'serviceType',
    title: 'What space needs work?',
    options: [
      { label: 'Garage', value: 'garage' },
      { label: 'Closet', value: 'closet' },
      { label: 'Attic / Basement', value: 'attic-basement' },
      { label: 'Storage Space', value: 'storage' },
    ],
  },
  {
    id: 'size',
    title: 'How large is the space?',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
      { label: 'Extra Large', value: 'extra-large' },
    ],
  },
  {
    id: 'workLevel',
    title: 'Level of work needed?',
    options: [
      { label: 'Light Organizing', value: 'light-organizing' },
      { label: 'Full Declutter', value: 'full-declutter' },
      { label: 'Complete Clean-Out', value: 'complete-cleanout' },
    ],
  },
  {
    id: 'disposal',
    title: 'Do you need items hauled away?',
    options: [
      { label: 'No Disposal Needed', value: 'none' },
      { label: 'Some Items (+$50–75)', value: 'some' },
      { label: 'Full Haul-Away (+$100–150)', value: 'full' },
    ],
  },
];

function calculateSpecialEstimate(
  selections: Record<string, string>,
): EstimatorResult {
  const typePricing = SPECIAL_BASE_PRICING[selections.serviceType];
  const base = typePricing?.[selections.size] ?? { low: 150, high: 200 };

  const workMult = WORK_LEVEL_MULTIPLIERS[selections.workLevel] ?? 1.0;
  let low = base.low * workMult;
  let high = base.high * workMult;

  const disposal = DISPOSAL_ADDON[selections.disposal] ?? { low: 0, high: 0 };
  low = Math.round(low + disposal.low);
  high = Math.round(high + disposal.high);

  return { low, high };
}

export const SPECIAL_CONFIG: EstimatorConfig = {
  steps: SPECIAL_STEPS,
  calculate: calculateSpecialEstimate,
};

// ---------------------------------------------------------------------------
// CONFIG LOOKUP
// ---------------------------------------------------------------------------

export const ESTIMATOR_CONFIGS: Record<string, EstimatorConfig> = {
  residential: RESIDENTIAL_CONFIG,
  rentals: RENTAL_CONFIG,
  specialty: SPECIALTY_CONFIG,
  'special-services': SPECIAL_CONFIG,
};
