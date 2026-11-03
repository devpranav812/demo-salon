export type ServiceCategory = 'hair' | 'skin' | 'grooming' | 'bridal';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  duration: string;
  isFeatured?: boolean;
  image: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'hair' | 'colour' | 'bridal' | 'skin' | 'interiors';
  categoryLabel: string;
  image: string;
  aspect: 'square' | 'portrait' | 'landscape';
  description: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  service: string;
  rating: number;
  quote: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  experience: string;
}

export interface CartItem {
  service: ServiceItem;
  addedAt: number;
}

export interface BookingState {
  serviceIds: string[];
  date: string;
  timeSlot: string;
  fullName: string;
  phoneNumber: string;
  notes: string;
}

export type PageRoute = 'home' | 'services' | 'about' | 'gallery' | 'contact';
