import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn('mx-auto mb-8 md:mb-12 max-w-2xl text-center', className)}
    >
      <h2
        className={cn(
          'font-heading text-3xl font-semibold md:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-charcoal',
        )}
      >
        {title}
      </h2>
      <span className={cn(
        'block mx-auto mt-4 h-0.5 w-12 rounded-full',
        light ? 'bg-gold/70' : 'bg-gold',
      )} />
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg',
            light ? 'text-white/80' : 'text-warm-gray',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
