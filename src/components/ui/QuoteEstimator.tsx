import { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import type {
  EstimatorStepConfig,
  CalculateFn,
} from '../../types/estimator';
import EstimatorStep from './EstimatorStep';
import EstimatorResult from './EstimatorResult';
import Button from './Button';

interface QuoteEstimatorProps {
  steps: EstimatorStepConfig[];
  calculateFn: CalculateFn;
}

export default function QuoteEstimator({
  steps,
  calculateFn,
}: QuoteEstimatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const step of steps) {
      initial[step.id] = '';
    }
    return initial;
  });

  const totalSteps = steps.length;
  const isComplete = currentStep >= totalSteps;

  function handleSelect(value: string) {
    const stepId = steps[currentStep].id;
    setSelections((prev) => ({ ...prev, [stepId]: value }));
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
  }

  function handleBack() {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  }

  function handleStartOver() {
    const initial: Record<string, string> = {};
    for (const step of steps) {
      initial[step.id] = '';
    }
    setSelections(initial);
    setDirection(-1);
    setCurrentStep(0);
  }

  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-center font-heading text-3xl font-semibold text-charcoal">
          Estimate Your Cleaning Cost
        </h2>
        <span className="block mx-auto mt-2 mb-2 h-0.5 w-10 rounded-full bg-gold" />
        <p className="mb-8 text-center text-warm-gray">
          Answer a few quick questions for a ballpark price.
        </p>

        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-colors duration-300',
                index < currentStep && 'bg-forest',
                index === currentStep && !isComplete && 'bg-sage',
                index > currentStep && 'bg-sand',
                isComplete && 'bg-forest',
              )}
            />
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-sand/50 bg-cream p-6 shadow-sm sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {isComplete ? (
                <EstimatorResult
                  result={calculateFn(selections)}
                  onStartOver={handleStartOver}
                />
              ) : (
                <>
                  <EstimatorStep
                    step={steps[currentStep]}
                    selectedValue={selections[steps[currentStep].id]}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
