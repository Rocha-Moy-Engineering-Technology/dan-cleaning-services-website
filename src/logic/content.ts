import type {
  ServiceCategory,
  ValueProposition,
  ProcessStepData,
  ContactInfo,
} from '../types/content';

export const COMPANY_NAME = 'Dan Cleaning Services';

export const WEB3FORMS_ACCESS_KEY = 'e5cc09c0-15c5-4c1c-9c13-961382817e04';

export const HERO = {
  title: 'Your Premier Cleaning Solution',
  subtitle:
    'Professional cleaning services for homes, offices, and commercial spaces. We bring spotless results with personalized care.',
  ctaText: 'Get a Free Quote',
  ctaLink: '/contact',
};

export const COMPANY_DESCRIPTION = {
  heading: 'A Cleaner Space, A Better Life',
  text: 'At Dan Cleaning Services, we believe that a clean environment transforms the way you live and work. Our dedicated team of professionals delivers thorough, reliable cleaning tailored to your needs. From residential homes to commercial spaces, we treat every job with the care and attention it deserves.',
};

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    title: 'Trusted Professionals',
    description:
      'Our team is fully vetted, trained, and committed to delivering exceptional results every time.',
    icon: '🛡️',
  },
  {
    title: 'Eco-Friendly Products',
    description:
      'We use safe, non-industrial cleaning products that are effective and gentle on your space.',
    icon: '🌿',
  },
  {
    title: 'Flexible Scheduling',
    description:
      'Book one-time deep cleans or recurring services that fit your schedule perfectly.',
    icon: '📅',
  },
  {
    title: 'Satisfaction Guaranteed',
    description:
      'Not happy with the results? We will come back and make it right at no extra charge.',
    icon: '✨',
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'residential',
    title: 'Residential Cleaning',
    description:
      'Comprehensive home cleaning services that keep your living spaces fresh, healthy, and inviting.',
    accentColor: 'bg-sky',
    features: [
      'Regular housekeeping and maintenance cleaning',
      'Deep cleaning for kitchens, bathrooms, and living areas',
      'Move-in and move-out cleaning',
      'Post-renovation cleanup',
      'Laundry and linen washing service',
    ],
    included: [
      'Dusting all surfaces and fixtures',
      'Vacuuming and mopping all floors',
      'Kitchen appliance exterior cleaning',
      'Bathroom sanitization and scrubbing',
      'Trash removal and liner replacement',
      'Window sill and baseboard wiping',
    ],
  },
  {
    slug: 'commercial',
    title: 'Commercial Cleaning',
    description:
      'Professional office and workspace cleaning that creates a productive, healthy environment for your team.',
    accentColor: 'bg-deep',
    features: [
      'Daily or weekly office cleaning',
      'Breakroom and kitchen area cleaning',
      'Reception and lobby maintenance',
      'Restroom sanitization',
    ],
    included: [
      'Desk and workstation surface cleaning',
      'Floor vacuuming and mopping',
      'Restroom deep cleaning and restocking',
      'Trash and recycling removal',
      'Window and glass surface cleaning',
      'Common area sanitization',
    ],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality Cleaning',
    description:
      'Specialized cleaning for hotels and hospitality venues that keeps guests coming back.',
    accentColor: 'bg-cyan',
    features: [
      'Hotel room turnover cleaning',
      'Conference room and meeting space cleaning',
      'Guest floor hallway and elevator area cleaning',
      'Common area and lobby cleaning',
    ],
    included: [
      'Linen changing and bed making',
      'Full bathroom sanitization',
      'Kitchen and appliance cleaning',
      'Floor cleaning throughout',
      'Surface dusting and polishing',
      'Guest amenity restocking assistance',
    ],
  },
  {
    slug: 'rentals',
    title: 'Rental & Airbnb Cleaning',
    description:
      'Turnover and deep cleaning for Airbnb listings, vacation homes, and rental properties — ready for every guest.',
    accentColor: 'bg-cyan',
    features: [
      'Airbnb listing turnover cleaning',
      'Vacation home changeover service',
      'Rental property preparation and refresh',
      'Guest-ready deep cleaning',
    ],
    included: [
      'Linen changing and bed making',
      'Full bathroom sanitization',
      'Kitchen and appliance cleaning',
      'Floor cleaning throughout',
      'Surface dusting and polishing',
      'Guest amenity restocking assistance',
    ],
  },
  {
    slug: 'specialty',
    title: 'Specialty Cleaning',
    description:
      'Targeted deep cleaning services for carpets, couches, sofas, and windows that restore and refresh.',
    accentColor: 'bg-sky',
    features: [
      'Carpet deep cleaning and stain removal',
      'Couch and sofa upholstery cleaning',
      'Interior and exterior window cleaning',
      'Mattress cleaning and sanitization',
    ],
    included: [
      'Pre-treatment of stains and high-traffic areas',
      'Hot water extraction or steam cleaning',
      'Fabric-safe cleaning solutions',
      'Deodorizing and freshening treatment',
      'Streak-free window cleaning',
      'Screen and track cleaning',
    ],
  },
  {
    slug: 'events',
    title: 'Event & Venue Cleaning',
    description:
      'Pre-event and post-event cleaning for restaurants, event spaces, and venues of all sizes.',
    accentColor: 'bg-deep',
    features: [
      'Pre-event space preparation',
      'Post-event deep cleaning',
      'Restaurant dining area cleaning',
      'Kitchen and prep area cleaning',
    ],
    included: [
      'Floor sweeping, mopping, and polishing',
      'Table and chair surface cleaning',
      'Restroom deep cleaning',
      'Trash and debris removal',
      'Bar and counter sanitization',
      'Window and glass surface cleaning',
    ],
  },
  {
    slug: 'special-services',
    title: 'Special Services',
    description:
      'Decluttering, organizing, and clean-out services that transform overlooked spaces into functional areas.',
    accentColor: 'bg-sky',
    features: [
      'Garage clean-outs and organizing',
      'Closet organization and decluttering',
      'Attic and basement clean-outs',
      'Storage space organizing',
    ],
    included: [
      'Sorting and categorizing items',
      'Sweeping and mopping cleared areas',
      'Surface wiping and dusting',
      'Trash and debris hauling assistance',
      'Donation pile organization',
      'Final deep clean of the space',
    ],
  },
];

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: 1,
    title: 'Request a Quote',
    description:
      'Tell us about your space and cleaning needs through our contact form or by phone.',
  },
  {
    number: 2,
    title: 'Get Your Plan',
    description:
      'We create a customized cleaning plan and transparent pricing tailored to your requirements.',
  },
  {
    number: 3,
    title: 'We Clean',
    description:
      'Our professional team arrives on schedule and delivers a thorough, detailed clean.',
  },
  {
    number: 4,
    title: 'Enjoy Your Space',
    description:
      'Relax in your spotless environment. We follow up to ensure your complete satisfaction.',
  },
];

export const CONTACT_INFO: ContactInfo = {
  phone: '(555) 123-4567',
  email: 'info@dancleaningservices.com',
  hours: 'Mon - Sat: 7:00 AM - 7:00 PM',
  address: 'Serving the Greater Metro Area',
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];
