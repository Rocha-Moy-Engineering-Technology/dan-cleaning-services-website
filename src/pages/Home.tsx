import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import ProcessStep from '../components/ui/ProcessStep';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import {
  HERO,
  VALUE_PROPOSITIONS,
  SERVICE_CATEGORIES,
  PROCESS_STEPS,
} from '../logic/content';

export default function Home() {
  return (
    <>
      <HeroSection
        title={HERO.title}
        subtitle={HERO.subtitle}
        ctaText={HERO.ctaText}
        ctaLink={HERO.ctaLink}
        backgroundImage={`${import.meta.env.BASE_URL}images/hero-charleston.jpg`}
      />

      {/* Services */}
      <section className="px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="Services"
            subtitle="From residential homes to commercial venues, we have you covered."
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

      {/* Process Steps */}
      <section className="bg-white px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="How It Works"
            subtitle="Getting started is simple. Here is our easy four-step process."
          />
        </AnimatedSection>
        <div className="mx-auto grid max-w-4xl gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.12}>
              <ProcessStep step={step} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Value Propositions */}
      <section className="relative bg-sand/40 px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="Why Choose Us"
            subtitle="We go above and beyond to deliver an exceptional cleaning experience."
          />
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPOSITIONS.map((vp, i) => (
            <AnimatedSection key={vp.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/20 text-3xl">
                  {vp.icon}
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold text-charcoal">
                  {vp.title}
                </h3>
                <p className="mt-2 text-sm text-warm-gray">{vp.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest px-6 py-16 md:py-24 text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
            Ready for a Spotless Space?
          </h2>
          <span className="block mx-auto mt-4 h-0.5 w-12 rounded-full bg-gold/70" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Contact us today for a free, no-obligation quote. We would love to
            hear from you.
          </p>
          <div className="mt-8">
            <Button variant="gold" href="/contact">
              Get Your Free Quote
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
