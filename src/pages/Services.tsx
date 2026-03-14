import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import Button from '../components/ui/Button';
import { SERVICE_CATEGORIES } from '../logic/content';

export default function Services() {
  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="Professional cleaning solutions tailored to every space. Explore our full range of services below."
      />

      <section className="px-6 py-20">
        <SectionHeading
          title="What We Offer"
          subtitle="Choose the cleaning service that fits your needs."
        />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((service) => (
            <ServiceCategoryCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-brown-dark">
          Not Sure Which Service You Need?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brown-muted">
          Contact us and we will help you find the perfect cleaning solution for
          your space.
        </p>
        <div className="mt-8">
          <Button href="/contact">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
