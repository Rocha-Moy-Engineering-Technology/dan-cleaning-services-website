import { Link } from 'react-router';
import {
  COMPANY_NAME,
  NAV_LINKS,
  CONTACT_INFO,
  SERVICE_CATEGORIES,
} from '../../logic/content';

export default function Footer() {
  return (
    <footer className="bg-teal text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-xl font-bold">{COMPANY_NAME}</h3>
            <p className="mt-3 text-sm text-white/70">
              Professional cleaning services for homes, offices, and commercial
              spaces. Quality you can trust.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {SERVICE_CATEGORIES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold">Contact Us</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>{CONTACT_INFO.phone}</li>
              <li>{CONTACT_INFO.email}</li>
              <li>{CONTACT_INFO.hours}</li>
              <li>{CONTACT_INFO.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
