export interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: 'Morning (9 AM - 12 PM)' | 'Afternoon (12 PM - 4 PM)' | 'Evening (4 PM - 8 PM)';
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  status: 'Pending' | 'Contacted';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  serviceType: string;
  date: string;
  isCustom?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Services' | 'Pricing' | 'Emergency' | 'Maintenance';
}

export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  content: string;
  imageUrl: string;
  date: string;
}
