import { useParams, Navigate } from 'react-router';
import HeroSection from '../components/ui/HeroSection';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import QuoteEstimator from '../components/ui/QuoteEstimator';
import { SERVICE_CATEGORIES } from '../logic/content';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICE_CATEGORIES.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      <HeroSection title={service.title} subtitle={service.description} />

      <section className="px-6 py-12 md:py-20">
        <SectionHeading
          title="What We Provide"
          subtitle="Our comprehensive approach ensures every detail is covered."
        />
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {service.features.map((feature) => (
            <Card key={feature}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-orange">&#10003;</span>
                <p className="text-brown-muted">{feature}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:py-20">
        <SectionHeading
          title="What Is Included"
          subtitle="Every cleaning session covers these essential tasks."
        />
        <div className="mx-auto max-w-2xl">
          <ul className="space-y-3">
            {service.included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 font-bold text-teal">&#10003;</span>
                <span className="text-brown-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {service.slug === 'residential' && <QuoteEstimator />}

      <section className="px-6 py-10 md:py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-brown-dark">
          Ready to Book Your {service.title}?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brown-muted">
          Get in touch for a free quote. We will work with you to create the
          perfect cleaning plan.
        </p>
        <div className="mt-8">
          <Button href="/contact">Get a Free Quote</Button>
        </div>
      </section>
    </>
  );
}
