export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  startingPrice: string;
  unit?: string;
  ctaText: string;
  category: string;
  image: string;
  features: string[];
}

export interface CourseItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  level: string;
  description: string;
  curriculum: string[];
  included: string[];
  badge?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Wedding' | 'Arabic' | 'Indian' | 'Events' | 'Academy';
  image: string;
  description: string;
  tag: string;
}

export interface StainTransformation {
  id: string;
  title: string;
  description: string;
  freshImage: string;
  stainImage: string;
  hoursAfter: string;
}

export const BRAND_INFO = {
  name: 'Hasti Henna',
  tagline: 'Where Tradition Meets Artistry',
  subheading: 'Premium Mehndi Artistry for Brides, Weddings, Events & Celebrations — Across India.',
  location: 'Surat, Gujarat, India',
  serviceArea: 'All India',
  whatsappDisplay: '+91 7573927521',
  whatsappRaw: '917573927521',
  instagramHandle: '@hastis_henna',
  instagramUrl: 'https://instagram.com/hastis_henna',
  trustBadge: 'Bridal • Weddings • Events • Academy • Products',
  maxEventCapacity: 'Approximately 500 guests (subject to schedule & scope)',
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'bridal-mehndi',
    title: 'Bridal Mehndi',
    shortDesc: 'Premium detailed bridal designs customized for every bride.',
    description: 'Bespoke bridal henna tailored to your love story, incorporating personalized motifs, couple portraits, traditional Indian elements, or elegant Arabic flourishes.',
    startingPrice: '₹10,000',
    ctaText: 'Book Bridal Mehndi',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Custom couple motifs & names/initials',
      'Rich, dark natural stain guarantee',
      'Full hand, arm, and foot coverage packages',
      'Pre-wedding consultation & design preview',
    ],
  },
  {
    id: 'wedding-event',
    title: 'Wedding & Event Mehndi',
    shortDesc: 'Professional mehndi services for weddings, parties and celebrations.',
    description: 'Expert team handling large guest counts with precision, speed, and beautiful artistic flair for Sangeet, Mehendi parties, and corporate events.',
    startingPrice: '₹600',
    unit: 'per person',
    ctaText: 'Book Event Service',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Team of professional fast-hands artists',
      'Capacity for up to 500 guests',
      'Custom design sheets for guests',
      'On-location venue management',
    ],
  },
  {
    id: 'customized-mehndi',
    title: 'Customized Mehndi',
    shortDesc: 'Personalized Arabic, Indian and contemporary designs.',
    description: 'Intricate custom artwork blending modern minimalism, traditional royal patterns, or geometric Arabic artwork.',
    startingPrice: '₹1,500',
    ctaText: 'Request Custom Design',
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Bespoke pattern development',
      'Fusion Arabic & Indian styles',
      'Flexible application duration',
    ],
  },
  {
    id: 'home-service',
    title: 'Home Service Mehndi',
    shortDesc: 'Professional mehndi service at your doorstep.',
    description: 'Comfortable in-home experience with all organic supplies, stain care essentials, and professional artist equipment brought to you.',
    startingPrice: 'Varies',
    unit: 'by package',
    ctaText: 'Book Home Service',
    category: 'Home Service',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Sanitized, premium organic supplies',
      'Convenient doorstep delivery of service',
      'Available across Surat & nationwide for bookings',
    ],
  },
  {
    id: 'mehndi-academy',
    title: 'Mehndi Academy',
    shortDesc: 'Learn professional mehndi artistry with structured courses.',
    description: 'Master the timeless craft of henna design through step-by-step practical instruction, cone pressure techniques, and business guidance.',
    startingPrice: '₹6,000',
    unit: 'per person',
    ctaText: 'Explore Courses',
    category: 'Academy',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200',
    features: [
      'Hands-on practical training',
      'Course completion certificate',
      'Organic cone preparation guidance',
    ],
  },
  {
    id: 'natural-products',
    title: 'Natural Mehndi Cones & Products',
    shortDesc: 'High-quality 100% natural organic mehndi cones & stain oils.',
    description: 'Freshly mixed, chemical-free henna cones crafted from super-fine triple-sifted Sojat henna powder and pure essential oils.',
    startingPrice: '₹150',
    unit: 'per cone pack',
    ctaText: 'Enquire About Products',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=1200',
    features: [
      '100% Organic & Chemical-free',
      'Triple-sifted Sojat Henna',
      'Deep dark stain formula',
      'Pan-India delivery available',
    ],
  },
];

export const ACADEMY_COURSES: CourseItem[] = [
  {
    id: 'basic-course',
    title: 'Basic Mehndi Course',
    price: '₹6,000',
    duration: '2 Weeks (15 Hours total)',
    level: 'Beginner',
    description: 'Perfect for beginners who want to learn fundamental line work, cone handling, basic strokes, and classic patterns.',
    badge: 'Popular for Beginners',
    curriculum: [
      'Basic cone control & line thickness stability',
      'Geometric strokes, dots, and grid frameworks',
      'Arabic leaf & flower motifs',
      'Traditional Indian filler elements & paisleys',
      'Basic bridal hand composition basics',
      'Practice techniques & speed exercises',
    ],
    included: [
      'Starter practice kit & organic cones included',
      'Practice worksheets & design templates',
      'Certificate of Completion',
    ],
  },
  {
    id: 'advanced-course',
    title: 'Advanced / Professional Course',
    price: '₹14,000',
    duration: '4 Weeks (35 Hours total)',
    level: 'Intermediate to Professional',
    description: 'Comprehensive professional training covering figure work, intricate bridal compositions, high-speed techniques, and client consultation skills.',
    badge: 'Masterclass',
    curriculum: [
      'Advanced bridal layouts & full-arm symmetrical balance',
      'Detailed figure motifs (Dulhan, Shehnai, Barat, Radha Krishna)',
      'Intricate micro-shading & negative spacing art',
      'Speed techniques for large guest weddings',
      'Client handling, quote estimation, & professional workflow',
      'Live bridal practical practice session',
    ],
    included: [
      'Complete professional master kit',
      'Natural cone preparation & recipe secret',
      'Portfolio photoshoots & social media branding guide',
      'Professional Artist Certificate',
    ],
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Royal Bridal Full-Arm Artwork',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000',
    description: 'Detailed custom bridal henna featuring couple figures, sacred mantras, and intricate mandala palm compositions.',
    tag: 'Bridal Royalty',
  },
  {
    id: 'p2',
    title: 'Flowing Arabic Floral Cuffs',
    category: 'Arabic',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000',
    description: 'Elegant diagonal floral trails with delicate leaf shading and open space framing.',
    tag: 'Arabic Elegance',
  },
  {
    id: 'p3',
    title: 'Traditional Indian Jaali & Peacock Henna',
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    description: 'Symmetrical peacock motifs, intricate gridwork, and royal wrist bands.',
    tag: 'Heritage Indian',
  },
  {
    id: 'p4',
    title: 'Grand Wedding Sangeet Guest Service',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
    description: 'Speedy yet highly graceful guest mehndi designs for family members and wedding guests.',
    tag: 'Sangeet Party',
  },
  {
    id: 'p5',
    title: 'Festive Group Event Henna Application',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=1000',
    description: 'Fast-hands application by our professional team at a large celebration event.',
    tag: 'Event Artistry',
  },
  {
    id: 'p6',
    title: 'Academy Training & Pattern Worksheets',
    category: 'Academy',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000',
    description: 'Hands-on practice sessions for students learning cone control, line consistency, and motifs.',
    tag: 'Academy Practical',
  },
];

export const STAIN_TRANSFORMATIONS: StainTransformation[] = [
  {
    id: 'stain-1',
    title: 'Bridal Henna Color Evolution',
    description: 'Notice the transition from fresh green natural paste to a rich, deep mahogany stain developed with 100% organic natural essential oils.',
    freshImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800',
    stainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    hoursAfter: '48 Hours Peak Stain',
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: 'Sparkles',
    title: 'Premium Artistry',
    description: 'Detailed, crisp, and carefully designed custom henna artwork.',
  },
  {
    icon: 'Droplet',
    title: 'Dark & Long-Lasting Stain',
    description: 'Chemical-free 100% natural henna yielding rich, deep mahogany color.',
  },
  {
    icon: 'Users',
    title: 'Professional Team',
    description: 'Experienced team capable of serving events up to 500 guests gracefully.',
  },
  {
    icon: 'Palette',
    title: 'Customized Designs',
    description: 'Designs tailored specifically to your love story, theme, and taste.',
  },
  {
    icon: 'Crown',
    title: 'Luxury Experience',
    description: 'Punctual, hygienic, and premium care from first call to final stain.',
  },
  {
    icon: 'MapPin',
    title: 'Nationwide Service',
    description: 'Based in Surat, Gujarat, available for destination weddings across India.',
  },
  {
    icon: 'GraduationCap',
    title: 'Academy & Certifications',
    description: 'Structured courses for aspiring henna artists with hands-on practice.',
  },
  {
    icon: 'PackageCheck',
    title: 'Natural Products',
    description: 'Hand-crafted organic henna cones made with triple-sifted Sojat powder.',
  },
];
