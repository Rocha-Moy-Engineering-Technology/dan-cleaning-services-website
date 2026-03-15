import { Link } from 'react-router';
import { cn } from '../../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const VARIANT_STYLES = {
  primary: 'bg-orange text-white hover:bg-orange/90 focus:ring-orange/50',
  secondary: 'bg-teal text-white hover:bg-teal/90 focus:ring-teal/50',
  outline:
    'border-2 border-brown-dark text-brown-dark hover:bg-brown-dark hover:text-white focus:ring-brown-dark/50',
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
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 sm:px-6 sm:py-3 min-h-11 text-sm sm:text-base font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
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
      className={cn(styles, disabled && 'cursor-not-allowed opacity-50')}
    >
      {children}
    </button>
  );
}
