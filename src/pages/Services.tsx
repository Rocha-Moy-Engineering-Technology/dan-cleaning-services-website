import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { HOME_SERVICES, COMMERCIAL_SERVICES } from '../logic/content';

export default function Services() {
  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="Professional cleaning solutions tailored to every space. Explore our full range of services below."
      />

      {/* Home & Personal */}
      <section className="px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="Residential & Small Business Services"
            subtitle="Instant quotes available — get your estimate in seconds."
          />
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.08}>
              <ServiceCategoryCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Commercial & Corporate */}
      <section className="bg-sand/40 px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="Commercial & Corporate"
            subtitle="Tailored solutions for your business — contact us for a custom quote."
          />
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {COMMERCIAL_SERVICES.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 0.08}>
              <ServiceCategoryCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="px-6 py-14 md:py-20 text-center">
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
            <Button href="/contact">Get In Touch With Us</Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
