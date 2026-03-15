import { describe, it, expect } from 'vitest';
import { calculateEstimate, ESTIMATOR_STEPS } from '../../logic/estimator';
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
