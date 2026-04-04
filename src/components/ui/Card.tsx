import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-6 shadow-sm border border-sand/50 transition-shadow duration-300 hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
