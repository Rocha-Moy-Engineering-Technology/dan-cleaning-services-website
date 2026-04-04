import HeroSection from '../components/ui/HeroSection';
import ContactForm from '../components/ui/ContactForm';
import Card from '../components/ui/Card';
import AnimatedSection from '../components/ui/AnimatedSection';
import { CONTACT_INFO, COMPANY_NAME } from '../logic/content';

export default function Contact() {
  return (
    <>
      <HeroSection
        title="Get In Touch"
        subtitle="Ready for a spotless space? Reach out for a free quote or to learn more about our services."
      />

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:gap-14 lg:grid-cols-2">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              Send Us a Message
            </h2>
            <span className="block mt-2 mb-6 h-0.5 w-10 rounded-full bg-gold" />
            <p className="mb-6 text-warm-gray">
              Fill out the form below and we will get back to you within 24
              hours.
            </p>
            <ContactForm />
          </AnimatedSection>

          <AnimatedSection delay={0.15} direction="right">
            <div className="space-y-6">
              <Card>
                <h3 className="font-heading text-xl font-semibold text-charcoal">
                  Contact Information
                </h3>
                <ul className="mt-4 space-y-3 text-warm-gray">
                  <li>
                    <span className="font-semibold text-forest">Phone:</span>{' '}
                    {CONTACT_INFO.phone}
                  </li>
                  <li>
                    <span className="font-semibold text-forest">Email:</span>{' '}
                    {CONTACT_INFO.email}
                  </li>
                  <li>
                    <span className="font-semibold text-forest">Hours:</span>{' '}
                    {CONTACT_INFO.hours}
                  </li>
                  <li>
                    <span className="font-semibold text-forest">Area:</span>{' '}
                    {CONTACT_INFO.address}
                  </li>
                </ul>
              </Card>

              <Card>
                <h3 className="font-heading text-xl font-semibold text-charcoal">
                  Join Our Team
                </h3>
                <p className="mt-3 text-warm-gray">
                  Interested in joining {COMPANY_NAME}? We are always looking
                  for dedicated, detail-oriented cleaning professionals. Send us
                  a message with &ldquo;Career Inquiry&rdquo; in the subject and
                  we will be in touch.
                </p>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
