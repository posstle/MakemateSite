export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  agreement: boolean;
}

export interface NewsletterSubscription {
  email: string;
}

export type Language = 'en' | 'ko';
