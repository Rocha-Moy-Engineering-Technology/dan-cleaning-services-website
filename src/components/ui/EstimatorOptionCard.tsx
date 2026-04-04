import { cn } from '../../lib/utils';

interface EstimatorOptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function EstimatorOptionCard({
  label,
  selected,
  onClick,
}: EstimatorOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-xl p-4 text-left font-semibold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-forest/50 focus:ring-offset-2',
        selected
          ? 'bg-forest text-white shadow-md'
          : 'border border-sand bg-white text-charcoal hover:border-sage hover:bg-sage/10',
      )}
    >
      {label}
    </button>
  );
}
