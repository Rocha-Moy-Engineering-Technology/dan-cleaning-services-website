import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCategoryCard from '../components/ui/ServiceCategoryCard';
import ProcessStep from '../components/ui/ProcessStep';
import Button from '../components/ui/Button';
import {
  HERO,
  COMPANY_DESCRIPTION,
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

      {/* Company Description */}
      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
            {COMPANY_DESCRIPTION.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            {COMPANY_DESCRIPTION.text}
          </p>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="bg-white px-6 py-12 md:py-20">
        <SectionHeading
          title="Why Choose Us"
          subtitle="We go above and beyond to deliver an exceptional cleaning experience."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPOSITIONS.map((vp) => (
            <div key={vp.title} className="text-center">
              <div className="text-4xl">{vp.icon}</div>
              <h3 className="font-heading mt-3 text-lg font-bold text-navy">
                {vp.title}
              </h3>
              <p className="mt-2 text-sm text-slate">{vp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-12 md:py-20">
        <SectionHeading
          title="Our Services"
          subtitle="From residential homes to commercial venues, we have you covered."
        />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((service) => (
            <ServiceCategoryCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white px-6 py-12 md:py-20">
        <SectionHeading
          title="How It Works"
          subtitle="Getting started is simple. Here is our easy four-step process."
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <ProcessStep key={step.number} step={step} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 md:py-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
          Ready for a Spotless Space?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate">
          Contact us today for a free, no-obligation quote. We would love to
          hear from you.
        </p>
        <div className="mt-8">
          <Button href="/contact">Get Your Free Quote</Button>
        </div>
      </section>
    </>
  );
}
