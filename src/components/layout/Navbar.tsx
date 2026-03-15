import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { cn } from '../../lib/utils';
import {
  COMPANY_NAME,
  NAV_LINKS,
  SERVICE_CATEGORIES,
} from '../../logic/content';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith('/services');

  return (
    <nav className="sticky top-0 z-50 border-b border-tan/30 bg-cream shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-heading text-xl font-bold text-brown-dark">
          {COMPANY_NAME}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.label === 'Services' ? (
              <li
                key={link.path}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'font-medium transition-colors hover:text-orange',
                    isServicesActive ? 'text-orange' : 'text-brown-muted'
                  )}
                >
                  Services
                </Link>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-lg border border-tan/30 bg-white py-2 shadow-lg">
                    {SERVICE_CATEGORIES.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="block px-4 py-2 text-sm text-brown-muted transition-colors hover:bg-cream hover:text-orange"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    'font-medium transition-colors hover:text-orange',
                    isActive(link.path) ? 'text-orange' : 'text-brown-muted'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              'h-0.5 w-6 bg-brown-dark transition-transform',
              mobileOpen && 'translate-y-2 rotate-45'
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-brown-dark transition-opacity',
              mobileOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 bg-brown-dark transition-transform',
              mobileOpen && '-translate-y-2 -rotate-45'
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-tan/30 bg-cream px-6 py-4 md:hidden">
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block font-medium transition-colors hover:text-orange',
                    isActive(link.path) ||
                      (link.label === 'Services' && isServicesActive)
                      ? 'text-orange'
                      : 'text-brown-muted'
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
                          className="block text-sm text-brown-muted transition-colors hover:text-orange"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
