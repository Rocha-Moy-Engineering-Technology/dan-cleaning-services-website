import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { SERVICE_CATEGORIES } from '../logic/content';

export default function Services() {
  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="Professional cleaning solutions tailored to every space. Explore our full range of services below."
      />

      <section className="px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="What We Offer"
            subtitle="Choose the cleaning service that fits your needs."
          />
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.08}>
              <ServiceCategoryCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-sand/40 px-6 py-14 md:py-20 text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-semibold text-charcoal">
            Not Sure Which Service You Need?
          </h2>
          <span className="block mx-auto mt-3 h-0.5 w-10 rounded-full bg-gold" />
          <p className="mx-auto mt-4 max-w-xl text-warm-gray">
            Contact us and we will help you find the perfect cleaning solution
            for your space.
          </p>
          <div className="mt-8">
            <Button href="/contact">Contact Us</Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
