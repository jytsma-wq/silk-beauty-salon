// Video and media content configuration for Silk Beauty Salon
// All videos sourced from free stock video sites (Coverr, Pexels, Pixabay)

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  category: 'treatment' | 'testimonial' | 'behind-scenes' | 'facility' | 'promo';
  duration?: string;
}

export interface ImageGallery {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: 'treatments' | 'facility' | 'team' | 'results';
}

// Hero videos - rotating background videos
export const heroVideos = [
  {
    id: 'facial-treatment',
    title: 'Luxury Facial Treatment',
    src: 'https://cdn.coverr.co/videos/coverr-a-woman-getting-a-facial-treatment-6960/1080p.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80',
  },
  {
    id: 'spa-relaxation',
    title: 'Spa Relaxation Experience',
    src: 'https://videos.pexels.com/video-files/4125028/4125028-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
  },
  {
    id: 'beauty-closeup',
    title: 'Beauty Treatment Close-up',
    src: 'https://videos.pexels.com/video-files/4662664/4662664-uhd_2560_1440_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1920&q=80',
  },
  {
    id: 'massage-therapy',
    title: 'Therapeutic Massage',
    src: 'https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80',
  },
] as const;

// Treatment videos - demonstrating procedures
export const treatmentVideos: VideoItem[] = [
  {
    id: 'botox-procedure',
    title: 'Botox Treatment Process',
    description: 'See how our expert practitioners administer anti-wrinkle injections with precision and care.',
    src: 'https://videos.pexels.com/video-files/4124440/4124440-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    category: 'treatment',
    duration: '0:45',
  },
  {
    id: 'facial-treatment-video',
    title: 'Advanced Facial Treatment',
    description: 'Experience our signature facial treatments designed to rejuvenate and restore your skin.',
    src: 'https://videos.pexels.com/video-files/5068258/5068258-uhd_2560_1440_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    category: 'treatment',
    duration: '1:12',
  },
  {
    id: 'skincare-application',
    title: 'Professional Skincare Application',
    description: 'Watch our specialists apply premium skincare products with expert technique.',
    src: 'https://videos.pexels.com/video-files/4124441/4124441-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
    category: 'treatment',
    duration: '0:38',
  },
  {
    id: 'laser-treatment',
    title: 'Laser Skin Treatment',
    description: 'Advanced laser technology for skin rejuvenation and hair removal.',
    src: 'https://videos.pexels.com/video-files/4662665/4662665-uhd_2560_1440_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    category: 'treatment',
    duration: '0:52',
  },
];

// Testimonial videos - client stories
export const testimonialVideos: VideoItem[] = [
  {
    id: 'testimonial-sarah',
    title: 'Sarah\'s Transformation Story',
    description: 'Hear how our treatments helped Sarah regain her confidence and look her best.',
    src: 'https://videos.pexels.com/video-files/3252118/3252118-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    category: 'testimonial',
    duration: '1:30',
  },
  {
    id: 'testimonial-maria',
    title: 'Maria\'s Experience',
    description: 'Maria shares her journey and the amazing results she achieved with us.',
    src: 'https://videos.pexels.com/video-files/3252120/3252120-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80',
    category: 'testimonial',
    duration: '1:15',
  },
  {
    id: 'testimonial-elena',
    title: 'Elena\'s Review',
    description: 'Why Elena chose Silk Beauty and continues to trust us with her aesthetic needs.',
    src: 'https://videos.pexels.com/video-files/3252119/3252119-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    category: 'testimonial',
    duration: '1:05',
  },
];

// Behind the scenes videos
export const behindTheScenesVideos: VideoItem[] = [
  {
    id: 'salon-tour',
    title: 'Virtual Salon Tour',
    description: 'Take a tour of our luxurious facilities in Batumi, Georgia.',
    src: 'https://videos.pexels.com/video-files/4125019/4125019-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80',
    category: 'facility',
    duration: '2:00',
  },
  {
    id: 'team-at-work',
    title: 'Our Team at Work',
    description: 'Meet the skilled practitioners who make Silk Beauty exceptional.',
    src: 'https://videos.pexels.com/video-files/4125026/4125026-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    category: 'behind-scenes',
    duration: '1:45',
  },
  {
    id: 'preparation-process',
    title: 'Treatment Preparation',
    description: 'See the care and attention that goes into preparing for each treatment.',
    src: 'https://videos.pexels.com/video-files/4124442/4124442-uhd_2560_1440_25fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80',
    category: 'behind-scenes',
    duration: '0:55',
  },
];

// All videos combined
export const allVideos = [
  ...treatmentVideos,
  ...testimonialVideos,
  ...behindTheScenesVideos,
];

// Treatment-specific video backgrounds for sections
export const treatmentSectionVideos = {
  botox: 'https://videos.pexels.com/video-files/4124440/4124440-uhd_2560_1440_25fps.mp4',
  fillers: 'https://videos.pexels.com/video-files/4662664/4662664-uhd_2560_1440_30fps.mp4',
  facial: 'https://videos.pexels.com/video-files/5068258/5068258-uhd_2560_1440_30fps.mp4',
  laser: 'https://videos.pexels.com/video-files/4662665/4662665-uhd_2560_1440_30fps.mp4',
  skincare: 'https://videos.pexels.com/video-files/4124441/4124441-uhd_2560_1440_25fps.mp4',
  massage: 'https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4',
} as const;

// High-quality image collections for galleries
export const imageGalleries: ImageGallery[] = [
  {
    id: 'treatment-rooms',
    title: 'Our Treatment Rooms',
    description: 'Luxurious, private spaces designed for your comfort',
    category: 'facility',
    images: [
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80',
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200&q=80',
    ],
  },
  {
    id: 'treatments-gallery',
    title: 'Treatment Gallery',
    description: 'See our range of aesthetic treatments in action',
    category: 'treatments',
    images: [
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80',
      'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80',
    ],
  },
  {
    id: 'team-gallery',
    title: 'Meet Our Team',
    description: 'Expert practitioners dedicated to your beauty journey',
    category: 'team',
    images: [
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=1200&q=80',
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80',
      'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=1200&q=80',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80',
    ],
  },
  {
    id: 'results-gallery',
    title: 'Before & After Results',
    description: 'Real results from real clients',
    category: 'results',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200&q=80',
      'https://images.unsplash.com/photo-1553514029-1318c9127859?w=1200&q=80',
    ],
  },
];

// Additional Unsplash images for various sections
export const additionalImages = {
  // Hero and large banners
  heroBanner: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1920&q=80',
  spaAmbiance: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
  luxuryInterior: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80',
  
  // Treatment specific
  botoxCloseup: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
  facialMask: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  massageOil: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
  laserDevice: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
  
  // Atmosphere
  candles: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80',
  towels: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
  flowers: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80',
  products: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
  
  // Results
  glowingSkin: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
  smilePortrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  confidence: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
} as const;

// Video poster images (first frame alternatives)
export const videoPosters = {
  facial: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1920&q=80',
  spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
  beauty: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1920&q=80',
  massage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80',
  treatment: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80',
} as const;
