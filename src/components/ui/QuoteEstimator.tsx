import { useState } from 'react';
import { cn } from '../../lib/utils';
import type {
  EstimatorSelections,
  EstimatorStepId,
} from '../../types/estimator';
import { ESTIMATOR_STEPS, calculateEstimate } from '../../logic/estimator';
import EstimatorStep from './EstimatorStep';
import EstimatorResult from './EstimatorResult';
import Button from './Button';

const INITIAL_SELECTIONS: EstimatorSelections = {
  bedrooms: '',
  bathrooms: '',
  squareFootage: '',
  cleaningType: '',
  frequency: '',
};

export default function QuoteEstimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] =
    useState<EstimatorSelections>(INITIAL_SELECTIONS);

  const totalSteps = ESTIMATOR_STEPS.length;
  const isComplete = currentStep >= totalSteps;

  function handleSelect(value: string) {
    const stepId: EstimatorStepId = ESTIMATOR_STEPS[currentStep].id;
    setSelections((prev) => ({ ...prev, [stepId]: value }));
    setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    setCurrentStep((prev) => prev - 1);
  }

  function handleStartOver() {
    setSelections(INITIAL_SELECTIONS);
    setCurrentStep(0);
  }

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-center font-heading text-3xl font-bold text-navy">
          Estimate Your Cleaning Cost
        </h2>
        <p className="mb-8 text-center text-slate">
          Answer a few quick questions for a ballpark price.
        </p>

        <div className="mb-8 flex items-center justify-center gap-2">
          {ESTIMATOR_STEPS.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-colors duration-200',
                index < currentStep && 'bg-deep',
                index === currentStep && !isComplete && 'bg-sky',
                index > currentStep && 'bg-steel',
                isComplete && 'bg-deep'
              )}
            />
          ))}
        </div>

        <div className="rounded-xl bg-ice p-6 shadow-md sm:p-8">
          {isComplete ? (
            <EstimatorResult
              result={calculateEstimate(selections)}
              onStartOver={handleStartOver}
            />
          ) : (
            <>
              <EstimatorStep
                step={ESTIMATOR_STEPS[currentStep]}
                selectedValue={selections[ESTIMATOR_STEPS[currentStep].id]}
                onSelect={handleSelect}
              />
              {currentStep > 0 && (
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
