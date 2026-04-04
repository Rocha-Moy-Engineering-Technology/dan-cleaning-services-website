import { useState } from 'react';
import Button from './Button';
import { WEB3FORMS_ACCESS_KEY } from '../../logic/content';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  }
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...form,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus('success');
        setForm(INITIAL_FORM);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-white p-8 text-center border border-sand/50 shadow-sm">
        <p className="text-xl font-semibold text-forest">
          Thank you for reaching out!
        </p>
        <p className="mt-2 text-warm-gray">
          We will get back to you within 24 hours.
        </p>
        <div className="mt-4">
          <Button onClick={() => setStatus('idle')}>
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-xl border border-sand bg-cream/50 px-4 py-3 text-charcoal placeholder:text-warm-gray/50 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors duration-200';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={form.name}
          onChange={handleChange}
          className={inputBase}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          value={form.email}
          onChange={handleChange}
          className={inputBase}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={inputBase}
        >
          <option value="">Select a Service (optional)</option>
          <option value="residential">Residential Cleaning</option>
          <option value="commercial">Commercial Cleaning</option>
          <option value="hospitality">Hospitality Cleaning</option>
          <option value="specialty">Specialty Cleaning</option>
          <option value="events">Event & Venue Cleaning</option>
        </select>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Your Message *"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={inputBase}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
