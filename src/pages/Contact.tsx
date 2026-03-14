import HeroSection from '../components/ui/HeroSection';
import ContactForm from '../components/ui/ContactForm';
import Card from '../components/ui/Card';
import { CONTACT_INFO, COMPANY_NAME } from '../logic/content';

export default function Contact() {
  return (
    <>
      <HeroSection
        title="Get In Touch"
        subtitle="Ready for a spotless space? Reach out for a free quote or to learn more about our services."
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-brown-dark">
              Send Us a Message
            </h2>
            <p className="mb-6 mt-2 text-brown-muted">
              Fill out the form below and we will get back to you within 24
              hours.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-heading text-xl font-bold text-brown-dark">
                Contact Information
              </h3>
              <ul className="mt-4 space-y-3 text-brown-muted">
                <li>
                  <span className="font-semibold text-brown-dark">Phone:</span>{' '}
                  {CONTACT_INFO.phone}
                </li>
                <li>
                  <span className="font-semibold text-brown-dark">Email:</span>{' '}
                  {CONTACT_INFO.email}
                </li>
                <li>
                  <span className="font-semibold text-brown-dark">Hours:</span>{' '}
                  {CONTACT_INFO.hours}
                </li>
                <li>
                  <span className="font-semibold text-brown-dark">Area:</span>{' '}
                  {CONTACT_INFO.address}
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-heading text-xl font-bold text-brown-dark">
                Join Our Team
              </h3>
              <p className="mt-3 text-brown-muted">
                Interested in joining {COMPANY_NAME}? We are always looking for
                dedicated, detail-oriented cleaning professionals. Send us a
                message with &ldquo;Career Inquiry&rdquo; in the subject and we
                will be in touch.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
