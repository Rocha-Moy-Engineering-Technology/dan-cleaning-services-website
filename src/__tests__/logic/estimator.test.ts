import { describe, it, expect } from 'vitest';
import {
  calculateEstimate,
  ESTIMATOR_STEPS,
  RENTAL_CONFIG,
  SPECIALTY_CONFIG,
  SPECIAL_CONFIG,
} from '../../logic/estimator';
import type { EstimatorSelections } from '../../types/estimator';

function makeSelections(
  overrides: Partial<EstimatorSelections> = {}
): EstimatorSelections {
  return {
    bedrooms: '1',
    bathrooms: '1',
    squareFootage: 'under-1000',
    cleaningType: 'standard',
    frequency: 'one-time',
    ...overrides,
  };
}

function makeRentalSelections(
  overrides: Record<string, string> = {}
): Record<string, string> {
  return {
    propertyType: 'studio',
    bathrooms: '1',
    cleaningType: 'standard-turnover',
    extras: '',
    frequency: 'per-booking',
    ...overrides,
  };
}

function makeSpecialtySelections(
  overrides: Record<string, string> = {}
): Record<string, string> {
  return {
    serviceType: 'carpet',
    size: 'small',
    condition: 'light',
    extras: 'none',
    ...overrides,
  };
}

function makeSpecialSelections(
  overrides: Record<string, string> = {}
): Record<string, string> {
  return {
    serviceType: 'garage',
    size: 'small',
    workLevel: 'light-organizing',
    disposal: 'none',
    ...overrides,
  };
}

describe('calculateEstimate', () => {
  describe('base pricing by square footage', () => {
    it('returns $120-$150 for under 1000 sqft', () => {
      const result = calculateEstimate(
        makeSelections({ squareFootage: 'under-1000' })
      );
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('returns $150-$190 for 1000-1500 sqft', () => {
      const result = calculateEstimate(
        makeSelections({ squareFootage: '1000-1500' })
      );
      expect(result).toEqual({ low: 150, high: 190 });
    });

    it('returns $190-$240 for 1500-2000 sqft', () => {
      const result = calculateEstimate(
        makeSelections({ squareFootage: '1500-2000' })
      );
      expect(result).toEqual({ low: 190, high: 240 });
    });

    it('returns $240-$300 for 2000-2500 sqft', () => {
      const result = calculateEstimate(
        makeSelections({ squareFootage: '2000-2500' })
      );
      expect(result).toEqual({ low: 240, high: 300 });
    });

    it('returns $300-$370 for 2500-3000 sqft', () => {
      const result = calculateEstimate(
        makeSelections({ squareFootage: '2500-3000' })
      );
      expect(result).toEqual({ low: 300, high: 370 });
    });

    it('returns $370-$450 for 3000+ sqft', () => {
      const result = calculateEstimate(
        makeSelections({ squareFootage: '3000-plus' })
      );
      expect(result).toEqual({ low: 370, high: 450 });
    });
  });

  describe('bedroom addons', () => {
    it('adds nothing for 1 bedroom', () => {
      const result = calculateEstimate(makeSelections({ bedrooms: '1' }));
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('adds $15/$20 per extra bedroom', () => {
      const result = calculateEstimate(makeSelections({ bedrooms: '3' }));
      expect(result).toEqual({ low: 120 + 30, high: 150 + 40 });
    });

    it('handles 6+ bedrooms (5 extra)', () => {
      const result = calculateEstimate(makeSelections({ bedrooms: '6' }));
      expect(result).toEqual({ low: 120 + 75, high: 150 + 100 });
    });
  });

  describe('bathroom addons', () => {
    it('adds nothing for 1 bathroom', () => {
      const result = calculateEstimate(makeSelections({ bathrooms: '1' }));
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('adds $20/$25 per extra bathroom', () => {
      const result = calculateEstimate(makeSelections({ bathrooms: '3' }));
      expect(result).toEqual({ low: 120 + 40, high: 150 + 50 });
    });

    it('handles 5+ bathrooms (4 extra)', () => {
      const result = calculateEstimate(makeSelections({ bathrooms: '5' }));
      expect(result).toEqual({ low: 120 + 80, high: 150 + 100 });
    });
  });

  describe('deep clean multiplier', () => {
    it('applies 1.5x for deep cleaning', () => {
      const result = calculateEstimate(
        makeSelections({ cleaningType: 'deep' })
      );
      expect(result).toEqual({ low: 180, high: 225 });
    });

    it('applies multiplier after bedroom/bathroom addons', () => {
      const result = calculateEstimate(
        makeSelections({
          bedrooms: '2',
          bathrooms: '2',
          cleaningType: 'deep',
        })
      );
      expect(result).toEqual({
        low: Math.round((120 + 15 + 20) * 1.5),
        high: Math.round((150 + 20 + 25) * 1.5),
      });
    });
  });

  describe('frequency discounts', () => {
    it('no discount for one-time', () => {
      const result = calculateEstimate(
        makeSelections({ frequency: 'one-time' })
      );
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('15% off for weekly', () => {
      const result = calculateEstimate(makeSelections({ frequency: 'weekly' }));
      expect(result).toEqual({
        low: Math.round(120 * 0.85),
        high: Math.round(150 * 0.85),
      });
    });

    it('10% off for bi-weekly', () => {
      const result = calculateEstimate(
        makeSelections({ frequency: 'bi-weekly' })
      );
      expect(result).toEqual({
        low: Math.round(120 * 0.9),
        high: Math.round(150 * 0.9),
      });
    });

    it('5% off for monthly', () => {
      const result = calculateEstimate(
        makeSelections({ frequency: 'monthly' })
      );
      expect(result).toEqual({
        low: Math.round(120 * 0.95),
        high: Math.round(150 * 0.95),
      });
    });

    it('applies discount after deep clean multiplier', () => {
      const result = calculateEstimate(
        makeSelections({ cleaningType: 'deep', frequency: 'weekly' })
      );
      expect(result).toEqual({
        low: Math.round(180 * 0.85),
        high: Math.round(225 * 0.85),
      });
    });
  });

  describe('combined selections', () => {
    it('calculates full combo: large house, deep clean, weekly', () => {
      const result = calculateEstimate(
        makeSelections({
          bedrooms: '4',
          bathrooms: '3',
          squareFootage: '2500-3000',
          cleaningType: 'deep',
          frequency: 'weekly',
        })
      );
      const baseLow = 300 + 3 * 15 + 2 * 20;
      const baseHigh = 370 + 3 * 20 + 2 * 25;
      expect(result).toEqual({
        low: Math.round(baseLow * 1.5 * 0.85),
        high: Math.round(baseHigh * 1.5 * 0.85),
      });
    });
  });
});

describe('ESTIMATOR_STEPS', () => {
  it('has 5 steps', () => {
    expect(ESTIMATOR_STEPS).toHaveLength(5);
  });

  it('steps have correct ids in order', () => {
    const ids = ESTIMATOR_STEPS.map((s) => s.id);
    expect(ids).toEqual([
      'bedrooms',
      'bathrooms',
      'squareFootage',
      'cleaningType',
      'frequency',
    ]);
  });

  it('every step has at least 2 options', () => {
    for (const step of ESTIMATOR_STEPS) {
      expect(step.options.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('every option has label and value', () => {
    for (const step of ESTIMATOR_STEPS) {
      for (const option of step.options) {
        expect(option.label).toBeTruthy();
        expect(option.value).toBeTruthy();
      }
    }
  });
});

// ---------------------------------------------------------------------------
// RENTAL / AIRBNB CALCULATOR
// ---------------------------------------------------------------------------

const calculateRental = RENTAL_CONFIG.calculate;

describe('calculateRentalEstimate', () => {
  describe('base pricing by property type', () => {
    it('returns $120-$150 for studio', () => {
      const result = calculateRental(makeRentalSelections({ propertyType: 'studio' }));
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('returns $150-$190 for 1-bedroom', () => {
      const result = calculateRental(makeRentalSelections({ propertyType: '1-bedroom' }));
      expect(result).toEqual({ low: 150, high: 190 });
    });

    it('returns $190-$240 for 2-bedroom', () => {
      const result = calculateRental(makeRentalSelections({ propertyType: '2-bedroom' }));
      expect(result).toEqual({ low: 190, high: 240 });
    });

    it('returns $240-$300 for 3-bedroom', () => {
      const result = calculateRental(makeRentalSelections({ propertyType: '3-bedroom' }));
      expect(result).toEqual({ low: 240, high: 300 });
    });

    it('returns $300-$370 for 4+ bedrooms', () => {
      const result = calculateRental(makeRentalSelections({ propertyType: '4-plus' }));
      expect(result).toEqual({ low: 300, high: 370 });
    });
  });

  describe('bathroom addons', () => {
    it('adds nothing for 1 bathroom', () => {
      const result = calculateRental(makeRentalSelections({ bathrooms: '1' }));
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('adds $20/$25 per extra bathroom', () => {
      const result = calculateRental(makeRentalSelections({ bathrooms: '3' }));
      expect(result).toEqual({ low: 120 + 40, high: 150 + 50 });
    });
  });

  describe('cleaning type multipliers', () => {
    it('applies 1.0x for standard turnover', () => {
      const result = calculateRental(
        makeRentalSelections({ cleaningType: 'standard-turnover' })
      );
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('applies 1.5x for deep clean', () => {
      const result = calculateRental(
        makeRentalSelections({ cleaningType: 'deep-clean' })
      );
      expect(result).toEqual({ low: 180, high: 225 });
    });

    it('applies 1.75x for move-in/out', () => {
      const result = calculateRental(
        makeRentalSelections({ cleaningType: 'move-in-out' })
      );
      expect(result).toEqual({ low: 210, high: 263 });
    });
  });

  describe('extras (multi-select)', () => {
    it('adds nothing when no extras selected', () => {
      const result = calculateRental(makeRentalSelections({ extras: '' }));
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('adds $25/$35 for linen', () => {
      const result = calculateRental(makeRentalSelections({ extras: 'linen' }));
      expect(result).toEqual({ low: 145, high: 185 });
    });

    it('adds $20/$30 for restock', () => {
      const result = calculateRental(makeRentalSelections({ extras: 'restock' }));
      expect(result).toEqual({ low: 140, high: 180 });
    });

    it('sums both extras when both selected', () => {
      const result = calculateRental(
        makeRentalSelections({ extras: 'linen,restock' })
      );
      expect(result).toEqual({ low: 165, high: 215 });
    });

    it('ignores unknown extras', () => {
      const result = calculateRental(
        makeRentalSelections({ extras: 'linen,unknown' })
      );
      expect(result).toEqual({ low: 145, high: 185 });
    });
  });

  describe('frequency discounts', () => {
    it('no discount for per-booking', () => {
      const result = calculateRental(
        makeRentalSelections({ frequency: 'per-booking' })
      );
      expect(result).toEqual({ low: 120, high: 150 });
    });

    it('15% off for weekly', () => {
      const result = calculateRental(
        makeRentalSelections({ frequency: 'weekly' })
      );
      expect(result).toEqual({
        low: Math.round(120 * 0.85),
        high: Math.round(150 * 0.85),
      });
    });

    it('10% off for bi-weekly', () => {
      const result = calculateRental(
        makeRentalSelections({ frequency: 'bi-weekly' })
      );
      expect(result).toEqual({
        low: Math.round(120 * 0.9),
        high: Math.round(150 * 0.9),
      });
    });

    it('5% off for monthly', () => {
      const result = calculateRental(
        makeRentalSelections({ frequency: 'monthly' })
      );
      expect(result).toEqual({
        low: Math.round(120 * 0.95),
        high: Math.round(150 * 0.95),
      });
    });
  });

  describe('combined selections', () => {
    it('calculates full combo: 3-bed, 2-bath, deep, both extras, weekly', () => {
      const result = calculateRental(
        makeRentalSelections({
          propertyType: '3-bedroom',
          bathrooms: '2',
          cleaningType: 'deep-clean',
          extras: 'linen,restock',
          frequency: 'weekly',
        })
      );
      const baseLow = 240 + 1 * 20;
      const baseHigh = 300 + 1 * 25;
      const afterMultLow = baseLow * 1.5;
      const afterMultHigh = baseHigh * 1.5;
      const afterExtrasLow = afterMultLow + 25 + 20;
      const afterExtrasHigh = afterMultHigh + 35 + 30;
      expect(result).toEqual({
        low: Math.round(afterExtrasLow * 0.85),
        high: Math.round(afterExtrasHigh * 0.85),
      });
    });
  });
});

describe('RENTAL_CONFIG.steps', () => {
  it('has 5 steps', () => {
    expect(RENTAL_CONFIG.steps).toHaveLength(5);
  });

  it('extras step has multiSelect enabled', () => {
    const extrasStep = RENTAL_CONFIG.steps.find((s) => s.id === 'extras');
    expect(extrasStep?.multiSelect).toBe(true);
  });

  it('every step has at least 2 options', () => {
    for (const step of RENTAL_CONFIG.steps) {
      expect(step.options.length).toBeGreaterThanOrEqual(2);
    }
  });
});

// ---------------------------------------------------------------------------
// SPECIALTY CALCULATOR (carpet, upholstery, windows, mattress)
// ---------------------------------------------------------------------------

const calculateSpecialty = SPECIALTY_CONFIG.calculate;

describe('calculateSpecialtyEstimate', () => {
  describe('base pricing by service type and size', () => {
    it('returns $80-$100 for small carpet', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ serviceType: 'carpet', size: 'small' })
      );
      expect(result).toEqual({ low: 80, high: 100 });
    });

    it('returns $60-$80 for small upholstery', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ serviceType: 'upholstery', size: 'small' })
      );
      expect(result).toEqual({ low: 60, high: 80 });
    });

    it('returns $180-$230 for large windows', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ serviceType: 'windows', size: 'large' })
      );
      expect(result).toEqual({ low: 180, high: 230 });
    });

    it('returns $150-$220 for extra-large mattress', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ serviceType: 'mattress', size: 'extra-large' })
      );
      expect(result).toEqual({ low: 150, high: 220 });
    });
  });

  describe('condition multipliers', () => {
    it('applies 1.0x for light soiling', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ condition: 'light' })
      );
      expect(result).toEqual({ low: 80, high: 100 });
    });

    it('applies 1.2x for moderate use', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ condition: 'moderate' })
      );
      expect(result).toEqual({ low: Math.round(80 * 1.2), high: Math.round(100 * 1.2) });
    });

    it('applies 1.5x for heavy stains', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ condition: 'heavy' })
      );
      expect(result).toEqual({ low: Math.round(80 * 1.5), high: Math.round(100 * 1.5) });
    });
  });

  describe('extras', () => {
    it('adds nothing for none', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ extras: 'none' })
      );
      expect(result).toEqual({ low: 80, high: 100 });
    });

    it('adds $25/$35 for stain treatment', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ extras: 'stain' })
      );
      expect(result).toEqual({ low: 105, high: 135 });
    });

    it('adds $20/$30 for deodorizing', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ extras: 'deodorize' })
      );
      expect(result).toEqual({ low: 100, high: 130 });
    });

    it('adds $30/$40 for protection coating', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ extras: 'protection' })
      );
      expect(result).toEqual({ low: 110, high: 140 });
    });

    it('adds $40/$55 for stain + deodorize', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({ extras: 'stain-deodorize' })
      );
      expect(result).toEqual({ low: 120, high: 155 });
    });
  });

  describe('combined selections', () => {
    it('calculates large carpet, heavy, with stain treatment', () => {
      const result = calculateSpecialty(
        makeSpecialtySelections({
          serviceType: 'carpet',
          size: 'large',
          condition: 'heavy',
          extras: 'stain',
        })
      );
      expect(result).toEqual({
        low: Math.round(180 * 1.5) + 25,
        high: Math.round(230 * 1.5) + 35,
      });
    });
  });
});

describe('SPECIALTY_CONFIG.steps', () => {
  it('has 4 steps', () => {
    expect(SPECIALTY_CONFIG.steps).toHaveLength(4);
  });

  it('every step has at least 2 options', () => {
    for (const step of SPECIALTY_CONFIG.steps) {
      expect(step.options.length).toBeGreaterThanOrEqual(2);
    }
  });
});

// ---------------------------------------------------------------------------
// SPECIAL SERVICES CALCULATOR (garage, closet, attic/basement, storage)
// ---------------------------------------------------------------------------

const calculateSpecial = SPECIAL_CONFIG.calculate;

describe('calculateSpecialEstimate', () => {
  describe('base pricing by service type and size', () => {
    it('returns $150-$200 for small garage', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ serviceType: 'garage', size: 'small' })
      );
      expect(result).toEqual({ low: 150, high: 200 });
    });

    it('returns $60-$90 for small closet', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ serviceType: 'closet', size: 'small' })
      );
      expect(result).toEqual({ low: 60, high: 90 });
    });

    it('returns $280-$380 for large attic/basement', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ serviceType: 'attic-basement', size: 'large' })
      );
      expect(result).toEqual({ low: 280, high: 380 });
    });

    it('returns $280-$380 for extra-large storage', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ serviceType: 'storage', size: 'extra-large' })
      );
      expect(result).toEqual({ low: 280, high: 380 });
    });
  });

  describe('work level multipliers', () => {
    it('applies 1.0x for light organizing', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ workLevel: 'light-organizing' })
      );
      expect(result).toEqual({ low: 150, high: 200 });
    });

    it('applies 1.3x for full declutter', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ workLevel: 'full-declutter' })
      );
      expect(result).toEqual({
        low: Math.round(150 * 1.3),
        high: Math.round(200 * 1.3),
      });
    });

    it('applies 1.6x for complete clean-out', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ workLevel: 'complete-cleanout' })
      );
      expect(result).toEqual({
        low: Math.round(150 * 1.6),
        high: Math.round(200 * 1.6),
      });
    });
  });

  describe('disposal addons', () => {
    it('adds nothing for no disposal', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ disposal: 'none' })
      );
      expect(result).toEqual({ low: 150, high: 200 });
    });

    it('adds $50/$75 for some items', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ disposal: 'some' })
      );
      expect(result).toEqual({ low: 200, high: 275 });
    });

    it('adds $100/$150 for full haul-away', () => {
      const result = calculateSpecial(
        makeSpecialSelections({ disposal: 'full' })
      );
      expect(result).toEqual({ low: 250, high: 350 });
    });
  });

  describe('combined selections', () => {
    it('calculates medium attic, full declutter, full disposal', () => {
      const result = calculateSpecial(
        makeSpecialSelections({
          serviceType: 'attic-basement',
          size: 'medium',
          workLevel: 'full-declutter',
          disposal: 'full',
        })
      );
      expect(result).toEqual({
        low: Math.round(190 * 1.3) + 100,
        high: Math.round(260 * 1.3) + 150,
      });
    });
  });
});

describe('SPECIAL_CONFIG.steps', () => {
  it('has 4 steps', () => {
    expect(SPECIAL_CONFIG.steps).toHaveLength(4);
  });

  it('every step has at least 2 options', () => {
    for (const step of SPECIAL_CONFIG.steps) {
      expect(step.options.length).toBeGreaterThanOrEqual(2);
    }
  });
});
