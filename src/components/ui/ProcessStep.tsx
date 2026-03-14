import type { ProcessStepData } from '../../types/content';

interface ProcessStepProps {
  step: ProcessStepData;
}

export default function ProcessStep({ step }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange text-2xl font-bold text-white">
        {step.number}
      </div>
      <h3 className="font-heading mt-4 text-xl font-bold text-brown-dark">
        {step.title}
      </h3>
      <p className="mt-2 text-brown-muted">{step.description}</p>
    </div>
  );
}
