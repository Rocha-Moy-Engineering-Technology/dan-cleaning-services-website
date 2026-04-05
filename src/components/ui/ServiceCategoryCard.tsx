import { Link } from 'react-router';
import { cn } from '../../lib/utils';
import type { ServiceCategory } from '../../types/content';

interface ServiceCategoryCardProps {
  service: ServiceCategory;
}

export default function ServiceCategoryCard({
  service,
}: ServiceCategoryCardProps) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block rounded-2xl border border-sand/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={cn('h-1.5 rounded-t-2xl', service.accentColor)} />
      <div className="p-6">
        <div className="mb-3">
          <span
            className={cn(
              'inline-block rounded-full px-3 py-0.5 text-xs font-semibold',
              service.hasCalculator
                ? 'bg-sage/15 text-forest'
                : 'bg-gold/15 text-gold',
            )}
          >
            {service.hasCalculator ? 'Instant Quote' : 'Contact for Quote'}
          </span>
        </div>
        <h3 className="font-heading text-xl font-semibold text-charcoal group-hover:text-forest">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-warm-gray">{service.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 font-semibold text-forest transition-transform duration-200 group-hover:translate-x-1">
          Learn More <span aria-hidden>&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
