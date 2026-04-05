import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Button from './Button';

interface DropdownItem {
  label: string;
  href: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  ctaDropdownItems?: DropdownItem[];
  bgClassName?: string;
  backgroundImage?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  ctaDropdownItems,
  bgClassName = 'bg-forest',
  backgroundImage,
}: HeroSectionProps) {
  const hasImage = Boolean(backgroundImage);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const hasDropdown = ctaText && ctaDropdownItems && ctaDropdownItems.length > 0;
  const hasSimpleLink = ctaText && ctaLink && !ctaDropdownItems;

  return (
    <section
      className={cn(
        'relative flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center md:pt-36 md:pb-28',
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

        {hasSimpleLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-8"
          >
            <Button href={ctaLink}>{ctaText}</Button>
          </motion.div>
        )}

        {hasDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="relative mt-8 inline-block"
          >
            <Button onClick={() => setDropdownOpen(!dropdownOpen)}>
              {ctaText}
            </Button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl border border-sand/50 bg-white py-2 shadow-lg"
                >
                  {ctaDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-warm-gray transition-colors hover:bg-cream hover:text-forest"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
