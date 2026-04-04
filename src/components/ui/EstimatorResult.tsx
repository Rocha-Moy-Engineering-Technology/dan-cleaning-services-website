import type { EstimatorResult as EstimatorResultType } from '../../types/estimator';
import Button from './Button';

interface EstimatorResultProps {
  result: EstimatorResultType;
  onStartOver: () => void;
}

export default function EstimatorResult({
  result,
  onStartOver,
}: EstimatorResultProps) {
  return (
    <div className="text-center">
      <h3 className="font-heading text-2xl font-semibold text-charcoal">
        Your Estimated Price
      </h3>
      <p className="mt-6 font-heading text-5xl font-semibold text-forest">
        ${result.low} &ndash; ${result.high}
      </p>
      <p className="mt-3 text-sm text-warm-gray">
        This is a ballpark estimate. Final pricing may vary based on your
        home&rsquo;s specific needs.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href="/contact">Get Exact Quote</Button>
        <Button variant="outline" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  );
}
