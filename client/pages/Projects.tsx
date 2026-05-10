import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Menu, X, ExternalLink, Linkedin, Mail, Github, ChevronLeft, ChevronRight, Play, Pause, Eye, Sparkles, Star, Zap, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import BuyMeACoffee from "@/components/BuyMeACoffee";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Custom Behance Icon Component - Moved to Footer.tsx

// Function to render description with Uvexzon link
const renderDescriptionWithLinks = (description: string) => {
  const parts = description.split(/(Uvexzon)/g);
  return parts.map((part, index) => {
    if (part === 'Uvexzon') {
      return (
        <a
          key={index}
          href="https://uvexzon.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          Uvexzon
        </a>
      );
    }
    return part;
  });
};

// Helper functions for project card styling
const getProjectGradient = (id: number) => {
  const gradients = [
    "bg-gradient-to-br from-purple-400 to-orange-400",
    "bg-gradient-to-br from-blue-400 to-green-400", 
    "bg-gradient-to-br from-indigo-400 to-pink-400",
    "bg-gradient-to-br from-red-400 to-yellow-400",
    "bg-gradient-to-br from-green-400 to-blue-400",
    "bg-gradient-to-br from-pink-400 to-purple-400",
    "bg-gradient-to-br from-yellow-400 to-red-400",
    "bg-gradient-to-br from-cyan-400 to-blue-400",
    "bg-gradient-to-br from-emerald-400 to-teal-400",
    "bg-gradient-to-br from-violet-400 to-purple-400"
  ];
  return gradients[(id - 1) % gradients.length];
};

const getProjectDotColor = (id: number) => {
  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-indigo-500", 
    "bg-red-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-violet-500"
  ];
  return colors[(id - 1) % colors.length];
};

const getProjectInitials = (name: string) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

// Project gallery images
const projectGalleries: { [key: string]: string[] } = {
  'event-booking-management-dashboard': [
    getAssetPath('images/projects/fest_1.png'),
    getAssetPath('images/projects/fest_2.png'),
    getAssetPath('images/projects/fest_6.png'),
    getAssetPath('images/projects/fest_4.png'),
    getAssetPath('images/projects/fest_3.png'),
  ],
  'swish-strokes': [
    getAssetPath('images/projects/swishstrokes.png'),
    getAssetPath('images/projects/swish_1.jpeg'),
    getAssetPath('images/projects/swish_2.jpeg'),
    getAssetPath('images/projects/swish_3.jpeg'),
    getAssetPath('images/projects/swish_4.png'),
  ],
  'culturajoin': [
    getAssetPath('images/projects/culturajoin.png'),
    getAssetPath('images/projects/cult_1.png'),
    getAssetPath('images/projects/cult_3.png'),
    getAssetPath('images/projects/cult_4.png'),
    getAssetPath('images/projects/cult_5.png'),
  ],
  'uvexzon-website-redesign': [
     getAssetPath('images/projects/uvex_2.png'),
     getAssetPath('images/projects/uvex_1.png'),
     getAssetPath('images/projects/uvex_3.png'),
     getAssetPath('images/projects/uvex_4.png'),
     getAssetPath('images/projects/uvex_5.png'),
  ],
  'virtual-try-on-ecommerce': [
    getAssetPath('images/projects/virtual_1.png'),
    getAssetPath('images/projects/virtual_2.png'),
    getAssetPath('images/projects/virtual_3.png'),
    getAssetPath('images/projects/virtual_4.png'),
    getAssetPath('images/projects/virtual_10.png'),
  ],
  'combank-app-redesign': [
    getAssetPath('images/projects/com_1.png'),
    getAssetPath('images/projects/com_2.png'),
    getAssetPath('images/projects/com_3.png'),
    getAssetPath('images/projects/com_4.png'),
    getAssetPath('images/projects/com_5.png'),
  ],
  'coffee-shop-mobile-app': [
    getAssetPath('images/projects/coffeeapp_1.png'),
    getAssetPath('images/projects/coffeeapp_2.png'),
    getAssetPath('images/projects/coffeeapp_3.png'),
    getAssetPath('images/projects/coffeeapp_4.png'),
    getAssetPath('images/projects/coffeeapp_5.png'),
  ],
  'real-estate-germany-website': [
    getAssetPath('images/projects/real_s1.png'),
    getAssetPath('images/projects/real_s2.png'),
    getAssetPath('images/projects/real_s3.png'),
    getAssetPath('images/projects/real_s4.png'),
    getAssetPath('images/projects/real_s5.png'),
  ],
  'restaurant-website-gallery-cafe': [
    getAssetPath('images/projects/gallery_2.jpg'),
    getAssetPath('images/projects/gallery_3.jpg'),
    getAssetPath('images/projects/gallery_4.png'),
    getAssetPath('images/projects/gallery_5.jpg'),
  ],
  'messiah-foundation-website': [
    getAssetPath('images/projects/messa_1.png'),
    getAssetPath('images/projects/messa_2.png'),
    getAssetPath('images/projects/messa_3.png'),
    getAssetPath('images/projects/messa_4.png'),
    getAssetPath('images/projects/messa_5.png'),
  ],
  'aquarium-homepage-redesign': [
    getAssetPath('images/projects/aqua_1.png'),
    getAssetPath('images/projects/aqua_4.png'),
    getAssetPath('images/projects/aqua_2.png'),
    getAssetPath('images/projects/aqua_3.png'),
  ],
  'carhub': [
    getAssetPath('images/projects/car_1.png'),
    getAssetPath('images/projects/car_3.png'),
    getAssetPath('images/projects/car_2.png'),
    getAssetPath('images/projects/car_8.png'),
    getAssetPath('images/projects/car_6.png'),
  ],
  'cima-landingpage-redesign': [
    getAssetPath('images/projects/cima_2.png'),
    getAssetPath('images/projects/cima_1.png'),
    // Add more CIMA project images here when available
  ],
  'jhon-holdings-branding': [
    getAssetPath('images/projects/jhon_1.png'),
    getAssetPath('images/projects/jhon_2.png'),
    getAssetPath('images/projects/jhon_3.png'),
    getAssetPath('images/projects/jhon_4.png'),
    // Add more Jhon Holdings images here when available
  ],
  'gym-fitness-app': [
    getAssetPath('images/projects/gym_1.png'),
    getAssetPath('images/projects/gym_2.png'),
    getAssetPath('images/projects/gym_3.png'),
    getAssetPath('images/projects/gym_4.png'),
    // Add more Gym App images here when available
  ],
  'motion-ink-branding': [
    getAssetPath('images/projects/motion_1.png'),
    getAssetPath('images/projects/motion_2.png'),
    getAssetPath('images/projects/motion_3.png'),
    // Add more Motion Ink images here when available
  ],
  'aerosync-b2b-gateway': [
    getAssetPath('images/projects/aero_1.png'),
    // Add more AeroSync images here when available
  ],
  'novamind-ai-landingpage': [
    getAssetPath('images/projects/nova_1.jpg'),
    getAssetPath('images/projects/nova_2.jpg'),
    getAssetPath('images/projects/nova_3.jpg'),
    // Add more NovaMind AI images here when available
  ],
};

// Sample project data with Prabhath's real projects
const projectsData = [
  {
    id: 18,
    slug: 'novamind-ai-landingpage',
    name: "NovaMind AI (LandingPage)",
    description: "A futuristic, high-precision landing page for a specialized Large Language Model (LLM) tailored for astrophysicists and aerospace engineers. The platform provides an integrated suite for solving complex orbital mechanics, celestial image analysis, and mission-critical research synthesis. The UI utilizes a 'NASA control-room' aesthetic combined with glassmorphism and cyberpunk neon accents to deliver an authoritative yet immersive scientific experience.",
    image: getAssetPath("images/projects/nova_1.jpg"),
    logo: "",
    type: "Web",
    industry: "Aerospace & Deep-Tech",
    links: {
      innerPage: "/projects/novamind-ai-landingpage"
    }
  },
  {
    id: 5,
    slug: 'combank-app-redesign',
    name: "ComBank App Redesign",
    description: "Redesigned the ComBank Digital App as a practice project to enhance UI/UX skills. Focused on simplifying navigation and modern layout.",
    image: getAssetPath("images/projects/com_1.png"),
    logo: "",
    type: "App",
    industry: "Banking",
    links: {
      design: "https://www.figma.com/design/k7tsMbAE76tJXP7NVf9742/ComBank---Redesign?node-id=0-1&t=qmQqRyWLjLRM95gi-1",
      caseStudy: "https://www.figma.com/design/k7tsMbAE76tJXP7NVf9742/ComBank---Redesign?node-id=1-20060&t=qmQqRyWLjLRM95gi-1"
    }
  },
  {
    id: 13,
    slug: 'jhon-holdings-branding',
    name: "Jhon Holdings Furniture's Branding",
    description: "Designed a premium branding suite for Jhon Holdings Furniture, blending modern minimalism with traditional craftsmanship. By combining structured typography with a versatile grid-based monogram, the identity ensures a consistent and high-end brand presence across digital platforms and physical merchandise.",
    image: getAssetPath("images/projects/jhon_1.png"),
    logo: "",
    type: "Logo",
    industry: "logo design",
    links: {
      design: "https://www.figma.com/design/3XulmnigleNOVz2MEeWmhI/Jhon-Holdings-Furniture-s-Branding?node-id=0-1&t=G0lVf4EbgTWjnVFs-1"
    }
  },
  {
    id: 8,
    slug: 'restaurant-website-gallery-cafe',
    name: "Restaurant Website (Gallery Café)",
    description: "Dynamic restaurant platform with table reservations, food ordering, and user registration using ASP.NET MVC.",
    image: getAssetPath("images/projects/gallery_2.jpg"),
    logo: "",
    type: "Web",
    industry: "Food & Beverage",
    links: {
      github: "https://github.com/subhashana00/.Net-Web.git"
    }
  },
  {
    id: 17,
    slug: 'aerosync-b2b-gateway',
    name: "AeroSync: The Frictionless B2B Gateway",
    description: "Architecting a high-performance interface that bridges the gap between heavy-duty industrial data and a premium brand identity. AeroSync utilizes a 'Calm Tech' aesthetic to reduce cognitive load for cargo agents and procurement managers. By implementing an AI-integrated command bar and predictive alerting system, the platform eliminates 'Form Fatigue' and streamlines the complex workflows of the Emirates and Qatar Airways ecosystems.",
    image: getAssetPath("images/projects/aero_1.png"),
    logo: "",
    type: "Web",
    industry: "Enterprise SaaS",
    links: {
      innerPage: "/projects/aerosync-b2b-gateway"
    }
  },
  {
    id: 3,
    slug: 'uvexzon-website-redesign',
    name: "Uvexzon Website Redesign",
    description: "Contributed to Uvexzon's complete website redesign from research through prototyping, creating a modern, user-friendly interface that significantly enhanced the user experience. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/uvex_2.png"),
    logo: "",
    type: "Web",
    industry: "Technology",
    links: {
      // design: "https://www.figma.com/design/ytcDmDViltMj2WVPErE7zx/Uvexzon-Company-Website-Redesign?node-id=0-1&t=CY7PX8wpbpPlYgR9-1"
    }
  },
  {
    id: 11,
    slug: 'carhub',
    name: "CarHub",
    description: "Car marketplace website UI design for buying, selling, and reserving cars. Features include advanced search filters, car valuation, featured deals, brand highlights, popular stories, and subscription to the latest car news.",
    image: getAssetPath("images/projects/car_1.png"),
    logo: "",
    type: "Web",
    industry: "Automotive",
    links: {
      design: "https://www.figma.com/design/mYcxMjWHMx7tcLx11CYkjo/Carhub-Website?node-id=16-486&t=dlBRavFOBxx5ABGk-1"
    }
  },
  {
    id: 16,
    slug: 'event-booking-management-dashboard',
    name: "Event Booking & Management Dashboard",
    description: "Festora is an event management dashboard that delivers high-level metrics, advanced event filtering, and demographic insights through a cohesive, component-driven design system. It simplifies the organizer's journey by transforming complex data into a clear visual hierarchy, ensuring efficient event tracking and attendee management.",
    image: getAssetPath("images/projects/fest_1.png"),
    logo: "",
    type: "Web",
    industry: "Entertainment",
    links: {
      design: "https://www.figma.com/design/hI88bJCFETml9iQ00PBKZz/Event-Booking---Management-Dashboard?node-id=1-4984&t=CKxyjZfVFWRbqlx6-1",
      innerPage: "/projects/event-booking-management-dashboard"
    }
  },
  {
    id: 6,
    slug: 'coffee-shop-mobile-app',
    name: "Coffee Shop Mobile App",
    description: "Mobile app UI including login, home, product categories, item details, cart, and delivery options with seamless navigation.",
    image: getAssetPath("images/projects/coffeeapp_1.png"),
    logo: "",
    type: "App",
    industry: "Food & Beverage",
    links: {
      design: "https://www.figma.com/design/npHOZYLrjNKd1WizZYLfZQ/Coffee-Shop-Mobile-App?node-id=106-411&t=uDSS3DltK6rL8yOF-1"
    }
  },
  {
    id: 14,
    slug: 'gym-fitness-app',
    name: "Gym & Fitness Mobile App",
    description: "Designed a sleek, dark-mode fitness app interface designed for peak performance. I utilized a vibrant 'Electric Green' accent color to highlight key progress metrics and used a bold, sans-serif font to maintain a high-energy, professional feel. The card-based layout ensures that tracking workouts is both intuitive and visually engaging.",
    image: getAssetPath("images/projects/gym_1.png"),
    logo: "",
    type: "App",
    industry: "Health & Wellness",
    links: {
      design: "https://www.figma.com/design/nOCky1ssTz90ClomYvwDgC/Gym---Fitness-Mobile-App?node-id=0-1&t=E4kjKBqEACiGHMMe-1",
      innerPage: "/projects/gym-fitness-app"
    }
  },
  {
    id: 1,
    slug: 'swish-strokes',
    name: "Swish Strokes",
    description: "Collaborated with Uvexzon as a UX Designer on the Mandala Art Colouring & Music Relaxation Mobile App, focused on mindfulness and creativity. The app includes mandala colouring, relaxing music, tournaments, mood tracking, and motivational prompts. Also contributed to designing the landing page to enhance user engagement and brand presence. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/swishstrokes.png"),
    logo: "",
    type: "App",
    industry: "Health & Wellness",
    links: {
      // design: "https://www.figma.com/design/b0qNg998YbKboek2S68FE8/Swish-Strokes?node-id=1-2&t=7lj4xH6SiD4o9CWm-1",
      caseStudy: "https://www.figma.com/design/LgofmkbLsKLSai0tFhzCgr/Swish-Stroke-Case-Study?node-id=0-1&t=rVm4Zl935YHhYFZf-1"
    }
  },
  {
    id: 10,
    slug: 'aquarium-homepage-redesign',
    name: "Aquarium Homepage Redesign",
    description: "Developed a refreshed homepage design at Uvexzon, emphasizing a clean layout and intuitive navigation to deliver a smoother, more engaging user experience. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/aqua_1.png"),
    logo: "",
    type: "Web",
    industry: "E-commerce",
    links: {
      // design: "https://www.figma.com/design/0EzOu4Bzf5JZUep25ZCB4F/Aquarium-Homepage-Redesign?node-id=0-1&t=dUfUFOAPZEGmmhrD-1"
    }
  },
  {
    id: 15,
    slug: 'motion-ink-branding',
    name: "Motion Ink Branding",
    description: "Designed a comprehensive branding suite for Motion Ink, centering on a modern, abstract 'M' monogram that symbolizes upward movement and software connectivity. I utilized the Afacad typeface for its clean, professional legibility and a vibrant purple and cyan palette to evoke a sense of creative technology and reliability.",
    image: getAssetPath("images/projects/motion_1.png"),
    logo: "",
    type: "Logo",
    industry: "logo design",
    links: {
      design: "https://www.figma.com/design/K0BJ9j2gxsm0Dlq7rQvZOV/Motion-Ink-Branding?node-id=0-1&t=TTD6tATCEdU50wFM-1"
    }
  },
  {
    id: 4,
    slug: 'virtual-try-on-ecommerce',
    name: "Virtual Try-on E-commerce",
    description: "MERN stack e-commerce platform with virtual try-on technology, account management, shopping cart, and admin panel.",
    image: getAssetPath("images/projects/virtual_10.png"),
    logo: "",
    type: "Web",
    industry: "E-commerce",
    links: {
      github: "https://github.com/subhashana00/E-Commerce_Clothing-_WEB-VTON_Reasearch.git"
    }
  },
  {
    id: 9,
    slug: 'messiah-foundation-website',
    name: "Messiah Foundation Website Redesign",
    description: "Produced design enhancements for Uvexzon's web and mobile platforms, ensuring better usability, stronger branding alignment, and a modern interface that resonates with users. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/messa_1.png"),
    logo: "",
    type: "Web",
    industry: "Charity Organizations",
    links: {
      // design: "https://www.figma.com/design/Bp8QrjS7zCic9BKuzLAhXc/Messiah-Foundation-Website?node-id=0-1&t=WLQCeHNttgg9hwiH-1"
    }
  },
  {
    id: 7,
    slug: 'real-estate-germany-website',
    name: "Real Estate Germany Website",
    description: "Redesigned German-language desktop and mobile prototypes at Uvexzon, focusing on usability improvements and tailoring the experience to meet client-specific requirements. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/real_s2.png"),
    logo: "",
    type: "Web",
    industry: "Real Estate",
    links: {
      design: "https://www.figma.com/design/5JksimZNVkXaxURfMRj0cO/Real-Estate-Germany-Web?node-id=0-1&t=dxlBtq7PLrdgvhAa-1",
      hosted: "http://endrit-immobilien.de/"
    }
  },
  {
    id: 12,
    slug: 'cima-landingpage-redesign',
    name: "CIMA Landingpage Redesign",
    description: "Redesigned the AICPA & CIMA website as a conceptual project to sharpen UI/UX skills. Focused on modernizing the visual identity and streamlining access to professional accounting resources.",
    image: getAssetPath("images/projects/cima_1.png"),
    logo: "",
    type: "Web",
    industry: "Financial",
    links: {
      design: "https://www.figma.com/design/PW78dj2rSeXnCkjVlJ92t3/CIMA-Landingpage-Redesign?node-id=0-1&t=Ru5h6e9laI9F5XZp-1"
    }
  },
  {
    id: 2,
    slug: 'culturajoin',
    name: "CulturaJoin",
    description: "At Uvexzon, I worked on a cultural and event management platform designed for locals, tourists, and planners. The platform supported invitation purchases and event hosting, improving accessibility for diverse users. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/culturajoin.png"),
    logo: "",
    type: "Web",
    industry: "Events & Tourism",
    links: {
      // design: "https://www.figma.com/design/Gru9BD0mtJJNtX4rjX0Qrc/CulturaJoin?node-id=2-2&t=zHZ3XVs7k6CwharC-1"
    }
  }
];

export default function Projects() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // Number of projects per page
  
  // Gallery states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Scroll detection states
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  
  // Expandable card states
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLElement>(null);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      const windowWidth = window.innerWidth;
      
      // Update mobile state
      setIsMobile(windowWidth < 768);
      
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      
      setScrollDirection(direction);
      setScrollProgress(Math.min(progress, 100));
      setLastScrollY(currentScrollY);
      
      // Show vertical nav when scrolling down and past 100px - ONLY on desktop
      if (currentScrollY > 100 && direction === 'down' && windowWidth >= 768) {
        setShowVerticalNav(true);
      } else if (direction === 'up' || windowWidth < 768) {
        setShowVerticalNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Auto-carousel for gallery
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGalleryOpen && isAutoPlaying && currentProject) {
      interval = setInterval(() => {
        const projectImages = projectGalleries[currentProject];
        if (projectImages) {
          setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
        }
      }, 3000); // Change image every 3 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGalleryOpen, isAutoPlaying, currentProject, currentImageIndex]);

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      
      switch (event.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case ' ': // Space bar
          event.preventDefault();
          toggleAutoPlay();
          break;
      }
    };

    if (isGalleryOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  // Gallery helper functions
  const openGallery = (projectSlug: string) => {
    setCurrentProject(projectSlug);
    setCurrentImageIndex(0);
    setIsAutoPlaying(true);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setCurrentProject('');
    setCurrentImageIndex(0);
    setIsAutoPlaying(false);
  };

  const nextImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      }
    }
  };

  const prevImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  // Filter projects based on selected filters
  const filteredProjects = projectsData.filter(project => {
    const typeMatch = typeFilter === "all" || project.type === typeFilter;
    const industryMatch = industryFilter === "all" || project.industry === industryFilter;
    return typeMatch && industryMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const resetFilters = () => {
    setTypeFilter("all");
    setIndustryFilter("all");
    setCurrentPage(1); // Reset to first page when filters are cleared
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, industryFilter]);

  // Pagination helper functions
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section when page changes
    const projectsSection = document.getElementById('projects-content');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((page, index, array) => array.indexOf(page) === index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Paint Brush Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-transparent z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ 
            width: `${scrollProgress}%`,
            clipPath: scrollProgress > 0 ? 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          }}
        >
          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-b from-orange-500 to-red-600 transform skew-x-12 opacity-80"></div>
          <div 
            className="absolute right-2 top-full w-1 bg-red-500 transition-all duration-300 ease-out origin-top"
            style={{ 
              height: scrollProgress > 10 ? '8px' : '0px',
              transform: `scaleY(${Math.min(scrollProgress / 10, 1)})` 
            }}
          ></div>
        </div>
      </div>

      {/* Header */}
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-12 py-4 sm:py-6 relative z-50 max-w-[1600px] mx-auto w-full ${
        isMobile ? 'sticky top-0' : 'relative'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-[80px] h-[45px] sm:w-[100px] sm:h-[55px] lg:w-[131px] lg:h-[70px] bg-black text-white text-sm sm:text-lg lg:text-xl font-medium hover:bg-[#007BFF] transition-colors">
              PS.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              to="/about"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className="text-white text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-black bg-purple-600 shadow-[3px_3px_0_0_#000000] -translate-x-0.5 -translate-y-0.5 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/freelance"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Freelance
            </Link>
          </nav>

          {/* Desktop Contact Button */}
          <Link to="/contact">
            <Button
              variant="outline"
              className="hidden md:flex text-white font-bold text-[14px] lg:text-[16px] tracking-[1.23px] px-[30px] lg:px-[50px] py-[15px] lg:py-[25px] rounded-none border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200"
            >
              Contact Me
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[#FCF9F8] border-t-2 border-black p-4 z-50 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col space-y-4">
              <Link
                to="/about"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Me
              </Link>
              <Link
                to="/projects"
                className="text-[#007BFF] text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/freelance"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Freelance
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="text-white font-bold text-[16px] tracking-[1.23px] px-[30px] py-[15px] rounded-none w-full justify-center mt-2 border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Vertical Navigation - Right Side - Hidden on mobile */}
      <nav className={`fixed right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out hidden md:block ${
        showVerticalNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
      }`}>
        <div className="bg-white border-2 border-black rounded-[15px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] lg:shadow-[4px_4px_0_0_#000] p-2 sm:p-3 lg:p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center mb-4 lg:mb-6">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black text-white text-xs sm:text-sm font-medium hover:bg-[#007BFF] transition-colors rounded-lg">
              PS.
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
            <Link
              to="/about"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="About Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">About</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Projects"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">Projects</span>
            </Link>
            <Link
              to="/freelance"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Freelance"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Freelance</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Contact Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Contact</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Projects Content Section - Neo-Brutalist Redesign */}
      <section ref={heroRef} id="projects-content" className="bg-[#FCF9F8] py-16 sm:py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-32 h-32 bg-[#FFDE59] rounded-l-full border-l-4 border-y-4 border-black hidden lg:block shadow-[-8px_8px_0_0_rgba(0,0,0,0.1)]"></div>
        <div className="absolute top-40 left-10 w-16 h-16 bg-[#FF9F9F] rotate-45 border-4 border-black hidden lg:block animate-pulse"></div>
        <div className="absolute bottom-1/4 right-12 w-24 h-24 border-4 border-black rounded-full border-dashed hidden lg:block animate-spin-slow"></div>

        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="mb-16 sm:mb-20 text-center relative">
            <div className="inline-block relative">
               <div className="absolute -inset-2 bg-[#A0E7E5] transform rotate-2 border-2 border-black shadow-[4px_4px_0_0_#000]"></div>
               <div className="relative bg-white border-2 border-black px-6 py-1 z-10">
                  <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    My Portfolio
                  </span>
               </div>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-[80px] font-black leading-none text-black mt-8 mb-6 uppercase tracking-tighter">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00C6FF] drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Projects</span>
            </h2>
            
            <p className="text-base sm:text-lg font-bold text-gray-800 max-w-2xl mx-auto border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_#000] rotate-1">
              Deep dive into my case studies, explore final designs, and test drive the prototypes I've built. Crafted with passion and pixel-perfection.
            </p>

          </div>

          {/* Filters Control Panel */}
          <div className="bg-white border-4 border-black p-4 sm:p-6 rounded-[20px] shadow-[8px_8px_0_0_#000] mb-12 relative">
             <div className="absolute -top-3 left-6 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest border-2 border-black">Filter Controls</div>
             
            <div className="flex flex-col lg:flex-row flex-wrap gap-6 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto">
                
                {/* Type Filter */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Project Type
                  </span>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-white border-3 border-black rounded-xl focus:ring-0 focus:border-black h-12 shadow-[4px_4px_0_0_#ccc] text-black font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-black rounded-xl shadow-[4px_4px_0_0_#000] font-bold">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="App">App</SelectItem>
                      <SelectItem value="Web">Web</SelectItem>
                      <SelectItem value="Logo">Logo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Filter */}
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Star className="w-3 h-3" /> Industry
                  </span>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-full sm:w-[220px] bg-white border-3 border-black rounded-xl focus:ring-0 focus:border-black h-12 shadow-[4px_4px_0_0_#ccc] text-black font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-black rounded-xl shadow-[4px_4px_0_0_#000] font-bold">
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Automotive">Automotive</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                      <SelectItem value="Banking">Banking</SelectItem>
                      <SelectItem value="Events & Tourism">Events & Tourism</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Charity Organizations">Charity Organizations</SelectItem>
                      <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Enterprise SaaS">Enterprise SaaS</SelectItem>
                      <SelectItem value="Aerospace & Deep-Tech">Aerospace & Deep-Tech</SelectItem>
                      <SelectItem value="logo design">Logo Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(typeFilter !== "all" || industryFilter !== "all") && (
                <Button
                  onClick={resetFilters}
                  className="w-full lg:w-auto bg-[#FF6B6B] hover:bg-[#ff5252] text-white border-3 border-black font-black uppercase tracking-wider h-12 px-6 rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-0.5 transition-all"
                >
                  Clear Filters <X className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
            
            {/* Results Count Badge */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
               <span>Displaying {Math.min(endIndex, filteredProjects.length)} / {filteredProjects.length} Projects</span>
               <span>Page {currentPage}</span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {currentProjects.map((project) => (
              <div key={project.id} className="group h-[500px]">
                <div 
                  className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-full relative ${
                    expandedCard === project.slug ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                  }`}
                  onMouseEnter={() => setIsHovering(project.slug)}
                  onMouseLeave={() => setIsHovering(null)}
                  onClick={() => setExpandedCard(expandedCard === project.slug ? null : project.slug)}
                >
                  {/* Floating Type Badge */}
                  <div className="absolute right-6 z-20 transition-all duration-500 ease-in-out" style={{ top: isHovering === project.slug ? '140px' : '265px' }}>
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full border-3 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0_0_#000] ${
                            project.type === 'App' ? 'bg-[#FF9F9F]' : 
                            project.type === 'Web' ? 'bg-[#A0E7E5]' : 'bg-[#FFDE59]'
                        }`}>
                            {project.type}
                        </span>
                  </div>

                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">{project.slug.substring(0, 12)}...exe</div>
                  </div>

                  {/* Project Image */}
                  <div 
                    className={`relative bg-gray-100 overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#FFDE59] transition-all duration-500 ease-in-out shrink-0 ${
                      isHovering === project.slug ? 'h-[120px]' : 'h-[250px]'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openGallery(project.slug);
                    }}
                  >
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                      />
                    ) : (
                      <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                          <span className="text-4xl font-black text-gray-300">?</span>
                        </div>
                      </div>
                    )}
                    
                    {/* View Gallery Overlay Button */}
                    <div className={`absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 ${
                       isHovering === project.slug ? 'hidden' : 'flex'
                    }`}>
                        <div className="bg-white border-3 border-black px-6 py-3 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                           <Eye className="w-5 h-5 text-black" />
                           <span className="font-black uppercase tracking-wider text-sm">View</span>
                        </div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden relative">
                    
                    <h3 className="text-2xl font-black leading-tight text-black mb-3 pr-2 shrink-0">
                       {project.name}
                    </h3>
                    
                    <div className={`overflow-y-auto pr-2 custom-scrollbar transition-all duration-500 ${
                       isHovering === project.slug ? 'flex-1' : 'line-clamp-3'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed text-gray-600">
                        {renderDescriptionWithLinks(project.description)}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t-3 border-black border-dashed shrink-0">
                        {(project.links as any).innerPage && (
                          <Link
                            to={(project.links as any).innerPage}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-black bg-black text-white hover:bg-[#007BFF] hover:border-[#007BFF] text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0_0_rgba(0,0,0,0.2)]"
                          >
                            View Project
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                        {project.links.design && (
                          <a
                            href={project.links.design}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black hover:bg-gray-100 text-xs font-bold uppercase tracking-wider text-black transition-all"
                          >
                            Design
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.caseStudy && (
                          <a
                            href={project.links.caseStudy}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black hover:bg-gray-100 text-xs font-bold uppercase tracking-wider text-black transition-all"
                          >
                            Case Study
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black hover:bg-gray-100 text-xs font-bold uppercase tracking-wider text-black transition-all"
                          >
                            GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.hosted && (
                          <a
                            href={project.links.hosted}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-transparent hover:border-black hover:bg-gray-100 text-xs font-bold uppercase tracking-wider text-black transition-all"
                          >
                            Live Site
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentProjects.length === 0 && (
            <div className="text-center py-16 sm:py-24 col-span-full border-4 border-black border-dashed rounded-[30px] bg-gray-50">
               <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-6">
                 <Search className="w-8 h-8 text-black opacity-50" />
               </div>
              <p className="text-xl font-bold text-black mb-8">
                No projects found matching the selected filters.
              </p>
              <Button
                onClick={resetFilters}
                className="bg-black text-white hover:bg-[#007BFF] border-3 border-black text-base font-bold uppercase tracking-wider px-8 py-6 rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all"
              >
                Clear Settings
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && currentProjects.length > 0 && (
            <div className="col-span-full mt-16 sm:mt-20">
              <div className="bg-white border-4 border-black rounded-[20px] p-6 shadow-[8px_8px_0_0_#000] flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Page Info */}
                <div className="text-sm font-bold uppercase tracking-widest text-black order-2 sm:order-1 flex items-center gap-2">
                   <div className="w-3 h-3 bg-[#007BFF] rounded-full animate-pulse"></div>
                   Page {currentPage} of {totalPages}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-3 order-1 sm:order-2">
                  
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`h-12 px-6 border-3 border-black rounded-xl font-black uppercase text-sm tracking-wider transition-all duration-200 flex items-center gap-2 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2 px-2">
                    {getVisiblePages().map((page, index) => (
                      <div key={index}>
                        {page === '...' ? (
                          <span className="w-10 h-10 flex items-center justify-center font-black">...</span>
                        ) : (
                          <button
                            onClick={() => goToPage(page as number)}
                            className={`w-10 h-10 border-3 border-black rounded-lg font-black text-sm flex items-center justify-center transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-[#FFDE59] text-black shadow-[3px_3px_0_0_#000] transform -translate-y-1'
                                : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`h-12 px-6 border-3 border-black rounded-xl font-black uppercase text-sm tracking-wider transition-all duration-200 flex items-center gap-2 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]'
                    }`}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
      {/* Gallery Modal */}
      {isGalleryOpen && currentProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2">
          <div className="relative w-full h-full max-w-7xl max-h-[98vh] bg-black rounded-[20px] overflow-hidden shadow-[12px_12px_0_0_rgba(255,255,255,0.2)] animate-in fade-in-0 zoom-in-95 duration-300">
            
            {/* Header - Compact and floating */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000]">
                <h3 className="text-sm sm:text-base font-medium text-black tracking-[1.23px]">
                  {projectsData.find(p => p.slug === currentProject)?.name || currentProject}
                </h3>
                <span className="text-xs sm:text-sm text-black font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {currentImageIndex + 1}/{projectGalleries[currentProject]?.length || 0}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoPlay}
                  className="w-10 h-10 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 shadow-[3px_3px_0_0_#000]"
                  title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={closeGallery}
                  className="w-10 h-10 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200 shadow-[3px_3px_0_0_#000]"
                  title="Close gallery"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image - Full Space */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {projectGalleries[currentProject] && (
                <img
                  src={projectGalleries[currentProject][currentImageIndex]}
                  alt={`${currentProject} image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              )}
              
              {/* Navigation Arrows - Larger and more prominent */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-all duration-200"
                title="Previous image"
              >
                <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-all duration-200"
                title="Next image"
              >
                <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>

              {/* Auto-play indicator - Bottom center */}
              {isAutoPlaying && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium tracking-[1.23px] border-2 border-black shadow-[4px_4px_0_0_#000]">
                  Auto-play ON
                </div>
              )}
            </div>

            {/* Thumbnail Strip - Bottom overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border-2 border-black rounded-[16px] p-3 shadow-[6px_6px_0_0_#000] max-w-[90%]">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {projectGalleries[currentProject]?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                      index === currentImageIndex 
                        ? 'border-black bg-black p-0.5' 
                        : 'border-gray-400 hover:border-black'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProject} thumbnail ${index + 1}`}
                      className={`w-full h-full object-cover rounded ${
                        index === currentImageIndex ? 'rounded-sm' : 'rounded-md'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Buy Me A Coffee Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] my-20">
        <BuyMeACoffee />
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I'm interested in your design projects. Let's discuss a collaboration."
      />
    </div>
  );
}
