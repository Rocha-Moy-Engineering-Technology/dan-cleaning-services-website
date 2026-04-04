import { cn } from '../../lib/utils';

type Variant = 'wave' | 'curve' | 'slant';

const paths: Record<Variant, string> = {
  wave: 'M0,64 C320,120 640,0 960,64 L960,0 L0,0 Z',
  curve: 'M0,96 Q480,0 960,96 L960,0 L0,0 Z',
  slant: 'M0,96 L960,0 L960,0 L0,0 Z',
};

interface SectionDividerProps {
  variant?: Variant;
  flip?: boolean;
  className?: string;
  fillClass?: string;
}

export default function SectionDivider({
  variant = 'curve',
  flip = false,
  className,
  fillClass = 'fill-cream',
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        'relative -mt-px w-full overflow-hidden leading-none',
        flip && 'rotate-180',
        className,
      )}
    >
      <svg
        className={cn('block h-12 w-full md:h-20', fillClass)}
        viewBox="0 0 960 96"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
