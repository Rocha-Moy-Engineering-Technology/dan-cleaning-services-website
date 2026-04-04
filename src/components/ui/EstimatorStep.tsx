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
  return (
    <div>
      <h3 className="mb-6 text-center font-heading text-2xl font-bold text-navy">
        {step.title}
      </h3>
      <div className="mx-auto grid max-w-md gap-3 sm:grid-cols-2">
        {step.options.map((option) => (
          <EstimatorOptionCard
            key={option.value}
            label={option.label}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
