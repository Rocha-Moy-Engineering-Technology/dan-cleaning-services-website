import { cn } from '../../lib/utils';
import Button from './Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  bgClassName?: string;
  backgroundImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  bgClassName = 'bg-tan',
  backgroundImage,
}: HeroSectionProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center px-6 py-16 text-center md:py-24',
        hasImage
          ? 'min-h-[50vh] md:min-h-[70vh] bg-cover bg-center'
          : bgClassName
      )}
      style={
        hasImage ? { backgroundImage: `url(${backgroundImage})` } : undefined
      }
    >
      {hasImage && (
        <div className="absolute inset-0 bg-brown-dark/60" aria-hidden />
      )}
      <div className="relative z-10">
        <h1
          className={cn(
            'font-heading mx-auto max-w-4xl text-3xl font-bold md:text-5xl lg:text-6xl',
            hasImage ? 'text-white drop-shadow-lg' : 'text-brown-dark'
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            'mx-auto mt-6 max-w-2xl text-lg md:text-xl',
            hasImage ? 'text-white/90 drop-shadow' : 'text-brown-muted'
          )}
        >
          {subtitle}
        </p>
        {ctaText && ctaLink && (
          <div className="mt-8">
            <Button href={ctaLink}>{ctaText}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
