import { Link } from 'react-router';
import {
  COMPANY_NAME,
  NAV_LINKS,
  CONTACT_INFO,
  SERVICE_CATEGORIES,
} from '../../logic/content';
import AnimatedSection from '../ui/AnimatedSection';

export default function Footer() {
  return (
    <footer className="relative bg-dark-green text-white">
      {/* Wave divider */}
      <div className="absolute -top-px left-0 right-0 rotate-180 overflow-hidden leading-none">
        <svg
          className="block h-10 w-full fill-cream md:h-16"
          viewBox="0 0 960 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,96 Q480,0 960,96 L960,96 L0,96 Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 md:pt-24 md:pb-12">
        <AnimatedSection>
          <div className="grid gap-8 md:gap-12 md:grid-cols-3">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-gold">
                {COMPANY_NAME}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Professional cleaning services for homes, offices, and
                commercial spaces. Quality you can trust.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold text-gold">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-sm text-white/60 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {SERVICE_CATEGORIES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-sm text-white/60 transition-colors hover:text-gold"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold text-gold">
                Contact Us
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>{CONTACT_INFO.phone}</li>
                <li>{CONTACT_INFO.email}</li>
                <li>{CONTACT_INFO.hours}</li>
                <li>{CONTACT_INFO.address}</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
