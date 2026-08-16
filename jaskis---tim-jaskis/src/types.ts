export type OrderStatus =
  | 'Pesanan Diterima'
  | 'Brief Dikonfirmasi'
  | 'Pembayaran Dikonfirmasi'
  | 'Sedang Dikerjakan'
  | 'Review'
  | 'Selesai';

export type AdminTab =
  | 'overview'
  | 'stats'
  | 'website-content'
  | 'orders'
  | 'services'
  | 'portfolio'
  | 'testimonials'
  | 'faqs'
  | 'inbox'
  | 'settings';

export type ServiceCategory =
  | 'Skripsi'
  | 'Proposal'
  | 'Jurnal / SINTA'
  | 'Makalah'
  | 'Laporan'
  | 'Essay'
  | 'PPT'
  | 'Poster'
  | 'Lainnya';

export type Gender = 'Pria' | 'Wanita';

export interface TimelineStep {
  title: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
}

export interface Order {
  id: string; // e.g. "JKS-2026-000125"
  clientName: string;
  maskedName: string;
  university?: string;
  gender: Gender;
  phone: string;
  serviceCategory: ServiceCategory;
  orderDate: string;
  deadline: string;
  status: OrderStatus;
  progress: number; // 0 to 100
  totalPrice: number; // In IDR
  paidAmount: number;
  brief: string;
  timeline: TimelineStep[];
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  maskedName: string;
  gender: Gender;
  university: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  registeredDate: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  priceRange: string;
  iconName: string;
  featured: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  coverImage: string;
  date: string;
  clientUni: string;
  tags?: string[];
  rating?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  maskedName: string;
  university: string;
  serviceName: string;
  rating: number; // 1-5
  content: string;
  avatarColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'new_order' | 'status_update' | 'message';
  orderId?: string;
}

export interface WebsiteSettings {
  brandName: string;
  brandTagline: string;
  whatsappNumber: string;
  telegramNumber: string;
  instagramHandle: string;
  email: string;
  address: string;
  heroBadgeText?: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaHeadline?: string;
  ctaSubheadline?: string;
  statsCompletedCount?: string;
  statsSatisfactionRate?: string;
  statsResponseTime?: string;
  statsActiveClients?: string;
  promoBannerText?: string;
  promoBannerActive?: boolean;
  adminUsername: string;
  adminPasswordHash: string; // hashed or string for state demo
}
