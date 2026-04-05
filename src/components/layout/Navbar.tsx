import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import {
  COMPANY_NAME,
  NAV_LINKS,
  SERVICE_CATEGORIES,
  CALCULATOR_SERVICES,
} from '../../logic/content';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith('/services');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-dark-green transition-shadow duration-300',
        scrolled && 'shadow-lg',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-heading text-2xl font-semibold text-white transition-colors duration-300 hover:text-gold"
        >
          {COMPANY_NAME}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            if (link.label === 'Services') {
              return (
                <li
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'font-medium transition-colors hover:text-gold',
                      isServicesActive ? 'text-gold' : 'text-white/80',
                    )}
                  >
                    Services
                  </Link>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-sand/50 bg-white py-2 shadow-lg"
                      >
                        {SERVICE_CATEGORIES.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            className="block px-4 py-2 text-sm text-warm-gray transition-colors hover:bg-cream hover:text-forest"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            if (link.label === 'Contact') {
              return (
                <>
                  {/* Calculator dropdown */}
                  <li
                    key="calculator"
                    className="relative"
                    onMouseEnter={() => setCalculatorOpen(true)}
                    onMouseLeave={() => setCalculatorOpen(false)}
                  >
                    <span
                      className={cn(
                        'cursor-pointer font-medium transition-colors hover:text-gold',
                        'text-white/80',
                      )}
                    >
                      Calculator
                    </span>
                    <AnimatePresence>
                      {calculatorOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-sand/50 bg-white py-2 shadow-lg"
                        >
                          {CALCULATOR_SERVICES.map((service) => (
                            <Link
                              key={service.slug}
                              to={`/services/${service.slug}#calculator`}
                              className="block px-4 py-2 text-sm text-warm-gray transition-colors hover:bg-cream hover:text-forest"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  {/* Contact link */}
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        'font-medium transition-colors hover:text-gold',
                        isActive(link.path) ? 'text-gold' : 'text-white/80',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                </>
              );
            }

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    'font-medium transition-colors hover:text-gold',
                    isActive(link.path) ? 'text-gold' : 'text-white/80',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              'h-0.5 w-6 bg-white transition-transform',
              mobileOpen && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-white transition-opacity',
              mobileOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-white transition-transform',
              mobileOpen && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-dark-green px-6 md:hidden"
          >
            <ul className="space-y-3 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block font-medium transition-colors hover:text-gold',
                      isActive(link.path) ||
                        (link.label === 'Services' && isServicesActive)
                        ? 'text-gold'
                        : 'text-white/80',
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.label === 'Services' && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {SERVICE_CATEGORIES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            to={`/services/${service.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-white/60 transition-colors hover:text-gold"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {/* Calculator in mobile */}
              <li>
                <span className="block font-medium text-white/80">
                  Calculator
                </span>
                <ul className="ml-4 mt-2 space-y-2">
                  {CALCULATOR_SERVICES.map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={`/services/${service.slug}#calculator`}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm text-white/60 transition-colors hover:text-gold"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
