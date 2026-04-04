import type { ProcessStepData } from '../../types/content';

interface ProcessStepProps {
  step: ProcessStepData;
}

export default function ProcessStep({ step }: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-forest bg-forest/10 text-2xl font-bold text-forest">
        {step.number}
      </div>
      <h3 className="font-heading mt-4 text-xl font-semibold text-charcoal">
        {step.title}
      </h3>
      <p className="mt-2 text-warm-gray">{step.description}</p>
    </div>
  );
}
