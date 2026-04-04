import { Link } from 'react-router';
import { cn } from '../../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const VARIANT_STYLES = {
  primary: 'bg-forest text-white hover:bg-forest/90 focus:ring-forest/50',
  secondary: 'bg-charcoal text-white hover:bg-charcoal/90 focus:ring-charcoal/50',
  outline:
    'border-2 border-forest text-forest hover:bg-forest hover:text-white focus:ring-forest/50',
  gold: 'bg-gold text-white hover:bg-gold/90 focus:ring-gold/50',
} as const;

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full px-6 py-2.5 sm:px-8 sm:py-3 min-h-11 text-sm sm:text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0';
  const styles = cn(baseStyles, VARIANT_STYLES[variant], className);

  if (href) {
    return (
      <Link to={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(styles, disabled && 'cursor-not-allowed opacity-50 hover:translate-y-0')}
    >
      {children}
    </button>
  );
}
