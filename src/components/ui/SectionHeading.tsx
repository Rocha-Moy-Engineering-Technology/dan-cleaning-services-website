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
    <div className={cn('mx-auto mb-12 max-w-2xl text-center', className)}>
      <h2
        className={cn(
          'font-heading text-3xl font-bold md:text-4xl',
          light ? 'text-white' : 'text-brown-dark'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg',
            light ? 'text-white/80' : 'text-brown-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
