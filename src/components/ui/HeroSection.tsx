import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
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
  bgClassName = 'bg-forest',
  backgroundImage,
}: HeroSectionProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center md:pt-36 md:pb-28',
        hasImage
          ? 'min-h-[50vh] md:min-h-[70vh] bg-cover bg-center'
          : bgClassName,
      )}
      style={
        hasImage ? { backgroundImage: `url(${backgroundImage})` } : undefined
      }
    >
      {hasImage && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-green/70 via-dark-green/50 to-dark-green/30"
          aria-hidden
        />
      )}
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-heading mx-auto max-w-4xl text-4xl font-semibold text-white drop-shadow-lg md:text-5xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/85 drop-shadow md:text-xl"
        >
          {subtitle}
        </motion.p>
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-8"
          >
            <Button href={ctaLink}>{ctaText}</Button>
          </motion.div>
        )}
      </div>

      {/* Organic curve at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="block h-10 w-full fill-cream md:h-16"
          viewBox="0 0 960 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,96 Q480,0 960,96 L960,96 L0,96 Z" />
        </svg>
      </div>
    </section>
  );
}
