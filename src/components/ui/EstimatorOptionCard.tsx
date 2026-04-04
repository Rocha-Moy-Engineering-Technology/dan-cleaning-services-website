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
        'w-full rounded-xl p-4 text-left font-semibold transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-sky/50 focus:ring-offset-2',
        selected
          ? 'bg-sky text-white shadow-md'
          : 'bg-white text-navy shadow-md hover:border-sky hover:bg-sky/10'
      )}
    >
      {label}
    </button>
  );
}
