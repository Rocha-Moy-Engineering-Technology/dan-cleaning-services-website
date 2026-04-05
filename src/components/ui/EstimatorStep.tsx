import type { EstimatorStepConfig } from '../../types/estimator';
import EstimatorOptionCard from './EstimatorOptionCard';

interface EstimatorStepProps {
  step: EstimatorStepConfig;
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function EstimatorStep({
  step,
  selectedValue,
  onSelect,
}: EstimatorStepProps) {
  const selectedValues = step.multiSelect
    ? selectedValue.split(',').filter(Boolean)
    : [];

  return (
    <div>
      <h3 className="mb-6 text-center font-heading text-2xl font-semibold text-charcoal">
        {step.title}
      </h3>
      {step.multiSelect && (
        <p className="mb-4 text-center text-sm text-warm-gray">
          Select all that apply
        </p>
      )}
      <div className="mx-auto grid max-w-md gap-3 sm:grid-cols-2">
        {step.options.map((option) => (
          <EstimatorOptionCard
            key={option.value}
            label={option.label}
            selected={
              step.multiSelect
                ? selectedValues.includes(option.value)
                : selectedValue === option.value
            }
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
