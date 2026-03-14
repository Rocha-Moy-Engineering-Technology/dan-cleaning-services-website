import { cn } from '../../lib/utils';
import Button from './Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  bgClassName?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  bgClassName = 'bg-tan',
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center px-6 py-24 text-center md:py-32',
        bgClassName
      )}
    >
      <h1 className="font-heading mx-auto max-w-4xl text-4xl font-bold text-brown-dark md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-brown-muted md:text-xl">
        {subtitle}
      </p>
      {ctaText && ctaLink && (
        <div className="mt-8">
          <Button href={ctaLink}>{ctaText}</Button>
        </div>
      )}
    </section>
  );
}
