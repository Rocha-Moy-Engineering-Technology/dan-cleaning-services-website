import type {
  ServiceCategory,
  ValueProposition,
  ProcessStepData,
  ContactInfo,
} from '../types/content';

export const COMPANY_NAME = 'Harbor Point Cleaning';

export const WEB3FORMS_ACCESS_KEY = 'e5cc09c0-15c5-4c1c-9c13-961382817e04';

export const HERO = {
  title: 'Premier Cleaning Solutions',
  subtitle:
    'Professional cleaning services for homes, offices, and commercial spaces. We bring spotless results with personalized care.',
  ctaText: 'Get a Free Instant Quote',
  ctaLink: '/contact',
};

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    title: 'Trusted Professionals',
    description:
      'Our team is fully vetted, trained, and committed to delivering exceptional results every time.',
    icon: '🛡️',
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

// Row 1: Home & Personal (with calculators)
// Row 2: Commercial & Corporate (contact for quote)
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'residential',
    title: 'Residential Cleaning',
    description:
      'Comprehensive home cleaning services that keep your living spaces fresh, healthy, and inviting.',
    accentColor: 'bg-sage',
    category: 'home',
    hasCalculator: true,
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
    slug: 'rentals',
    title: 'Rental & Airbnb Cleaning',
    description:
      'Turnover and deep cleaning for Airbnb listings, vacation homes, and rental properties — ready for every guest.',
    accentColor: 'bg-sage',
    category: 'home',
    hasCalculator: true,
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
    accentColor: 'bg-sage',
    category: 'home',
    hasCalculator: true,
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
    slug: 'special-services',
    title: 'Special Services',
    description:
      'Decluttering, organizing, and clean-out services that transform overlooked spaces into functional areas.',
    accentColor: 'bg-sage',
    category: 'home',
    hasCalculator: true,
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
  {
    slug: 'commercial',
    title: 'Commercial Cleaning',
    description:
      'Professional office and workspace cleaning that creates a productive, healthy environment for your team.',
    accentColor: 'bg-gold',
    category: 'commercial',
    hasCalculator: false,
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
    accentColor: 'bg-gold',
    category: 'commercial',
    hasCalculator: false,
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
    slug: 'events',
    title: 'Event & Venue Cleaning',
    description:
      'Pre-event and post-event cleaning for restaurants, event spaces, and venues of all sizes.',
    accentColor: 'bg-gold',
    category: 'commercial',
    hasCalculator: false,
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
];

export const HOME_SERVICES = SERVICE_CATEGORIES.filter(
  (s) => s.category === 'home',
);
export const COMMERCIAL_SERVICES = SERVICE_CATEGORIES.filter(
  (s) => s.category === 'commercial',
);
export const CALCULATOR_SERVICES = SERVICE_CATEGORIES.filter(
  (s) => s.hasCalculator,
);

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: 1,
    title: 'Get Your Estimate',
    description:
      'Use our online calculators to estimate the cost for home and personal services, or get in touch with us to request a quote for commercial and corporate services.',
  },
  {
    number: 2,
    title: 'Schedule Your Cleaning',
    description:
      'Contact us to book your cleaning at a time that works for you. Our professional team will arrive on schedule and deliver a thorough, detailed clean.',
  },
];

export const CONTACT_INFO: ContactInfo = {
  phone: '(210) 325-8900',
  email: 'harborpointchs@gmail.com',
  hours: 'Mon - Sat: 7:00 AM - 7:00 PM',
  address: 'Serving the Greater Metro Area',
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];
