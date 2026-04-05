import { useParams, Navigate } from 'react-router';
import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import QuoteEstimator from '../components/ui/QuoteEstimator';
import AnimatedSection from '../components/ui/AnimatedSection';
import { SERVICE_CATEGORIES } from '../logic/content';
import { ESTIMATOR_CONFIGS } from '../logic/estimator';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICE_CATEGORIES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const estimatorConfig = slug ? ESTIMATOR_CONFIGS[slug] : undefined;

  return (
    <>
      <HeroSection title={service.title} subtitle={service.description} />

      <section className="px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="What We Provide"
            subtitle="Our comprehensive approach ensures every detail is covered."
          />
        </AnimatedSection>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {service.features.map((feature, i) => (
            <AnimatedSection key={feature} delay={i * 0.08}>
              <Card>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg text-forest">&#10003;</span>
                  <p className="text-warm-gray">{feature}</p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-sand/40 px-6 py-16 md:py-24">
        <AnimatedSection>
          <SectionHeading
            title="What Is Included"
            subtitle="Every cleaning session covers these essential tasks."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="mx-auto max-w-2xl">
            <ul className="space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 font-bold text-forest">&#10003;</span>
                  <span className="text-warm-gray">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </section>

      {estimatorConfig && (
        <div id="calculator">
          <QuoteEstimator
            steps={estimatorConfig.steps}
            calculateFn={estimatorConfig.calculate}
          />
        </div>
      )}

      <section className="bg-forest px-6 py-14 md:py-20 text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-semibold text-white">
            Ready to Book Your {service.title}?
          </h2>
          <span className="block mx-auto mt-3 h-0.5 w-10 rounded-full bg-gold/70" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Get in touch for a free quote. We will work with you to create the
            perfect cleaning plan.
          </p>
          <div className="mt-8">
            <Button variant="gold" href="/contact">
              Get In Touch With Us
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
