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
      className="group block rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
    >
      <div className={cn('h-2 rounded-t-xl', service.accentColor)} />
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-navy group-hover:text-sky">
          {service.title}
        </h3>
        <p className="mt-2 text-slate">{service.description}</p>
        <span className="mt-4 inline-block font-semibold text-sky">
          Learn More &rarr;
        </span>
      </div>
    </Link>
  );
}
