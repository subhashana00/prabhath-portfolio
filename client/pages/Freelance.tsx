import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { getAssetPath } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import BuyMeACoffee from "@/components/BuyMeACoffee";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { 
  ArrowRight,
  ArrowDown,
  CheckCircle, 
  Star, 
  MessageCircle, 
  Clock, 
  FileText, 
  Users, 
  Zap,
  Search,
  Palette,
  Smartphone,
  Monitor,
  Code,
  BarChart3,
  Shield,
  Mail,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  Quote,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Github,
  Menu,
  X,
  ExternalLink,
  Eye,
  Sparkles,
  Brush,
  PenTool,
  Layout,
  Package,
  CreditCard,
  HelpCircle,
  Send,
  Layers,
  Lightbulb,
  Repeat
} from 'lucide-react';
import WhatsAppFloat from "@/components/WhatsAppFloat";

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

// Sample project data from Projects page (showing first 6 projects)
const featuredProjectsData = [
  {
    id: 1,
    slug: 'swish-strokes',
    name: "Swish Strokes",
    description: "Mandala art colouring and music relaxation mobile app with tournaments, mood tracking, and motivational features. Includes landing page design. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/swishstrokes.png"),
    type: "App",
    industry: "Health & Wellness",
    links: {
      // design: "https://www.figma.com/design/b0qNg998YbKboek2S68FE8/Swish-Strokes?node-id=1-2&t=7lj4xH6SiD4o9CWm-1",
      caseStudy: "https://www.figma.com/design/LgofmkbLsKLSai0tFhzCgr/Swish-Stroke-Case-Study?node-id=0-1&t=rVm4Zl935YHhYFZf-1"
    }
  },
  {
    id: 2,
    slug: 'culturajoin',
    name: "CulturaJoin",
    description: "Cultural and event management platform for locals, tourists, and planners. Features invitation purchases and event hosting capabilities. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/culturajoin.png"),
    type: "Web",
    industry: "Events & Tourism",
    links: {
      // design: "https://www.figma.com/design/Gru9BD0mtJJNtX4rjX0Qrc/CulturaJoin?node-id=2-2&t=zHZ3XVs7k6CwharC-1"
    }
  },
  {
    id: 3,
    slug: 'uvexzon-website-redesign',
    name: "Uvexzon Website Redesign",
    description: "Complete company website redesign from research to prototyping. Modern, user-friendly interface with improved user experience. All project content and rights belong to Uvexzon.",
    image: getAssetPath("images/projects/uvex_2.png"),
    type: "Web",
    industry: "Technology",
    links: {
      // design: "https://www.figma.com/design/ytcDmDViltMj2WVPErE7zx/Uvexzon-Company-Website-Redesign?node-id=0-1&t=CY7PX8wpbpPlYgR9-1"
    }
  },
  {
    id: 4,
    slug: 'virtual-try-on-ecommerce',
    name: "Virtual Try-on E-commerce",
    description: "Redesigned prototypes (desktop and mobile) in German language for improved usability and client requirements.",
    image: getAssetPath("images/projects/virtual_10.png"),
    type: "Web",
    industry: "E-commerce",
    links: {
      github: "https://github.com/subhashana00/E-Commerce_Clothing-_WEB-VTON_Reasearch.git"
    }
  },
  {
    id: 5,
    slug: 'combank-app-redesign',
    name: "ComBank App Redesign",
    description: "Produced web and mobile design improvements for usability and branding alignment with modern interface design.",
    image: getAssetPath("images/projects/com_1.png"),
    type: "App",
    industry: "Banking",
    links: {
      design: "https://www.figma.com/design/k7tsMbAE76tJXP7NVf9742/ComBank---Redesign?node-id=0-1&t=qmQqRyWLjLRM95gi-1",
      caseStudy: "https://www.figma.com/design/k7tsMbAE76tJXP7NVf9742/ComBank---Redesign?node-id=1-20060&t=qmQqRyWLjLRM95gi-1"
    }
  },
  {
    id: 6,
    slug: 'coffee-shop-mobile-app',
    name: "Coffee Shop Mobile App",
    description: "Developed a refreshed homepage design with focus on clean layout and user navigation for enhanced user experience.",
    image: getAssetPath("images/projects/coffeeapp_1.png"),
    type: "App",
    industry: "Food & Beverage",
    links: {
      design: "https://www.figma.com/design/npHOZYLrjNKd1WizZYLfZQ/Coffee-Shop-Mobile-App?node-id=106-411&t=uDSS3DltK6rL8yOF-1"
    }
  }
];

const Freelance = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    workflow: false,
    portfolio: false,
    testimonials: false,
    faq: false,
    cta: false
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // GSAP Animations
  useGSAP(() => {
    // Hero Animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
        }
      }
    );

    // Stagger services cards
    const serviceCards = document.querySelectorAll('.service-card');
    gsap.fromTo(serviceCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 70%",
        }
      }
    );

    // Workflow steps animation
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach((step, index) => {
      const direction = index % 2 === 0 ? -50 : 50;
      gsap.fromTo(step,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );
    });

    // Portfolio items stagger
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    gsap.fromTo(portfolioItems,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: "top 70%",
        }
      }
    );

  }, { scope: useRef(null) });

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      project: "Mobile App Design",
      rating: 5,
      testimonial: "Prabhath delivered an exceptional mobile app design that exceeded our expectations. The user experience is seamless and our users love it!",
      avatar: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      project: "Website Redesign", 
      rating: 5,
      testimonial: "Our website conversion rate increased by 40% after the redesign. Professional work, great communication, and delivered on time.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, StartupCo",
      project: "Landing Page Design",
      rating: 5,
      testimonial: "The landing page design was exactly what we needed. Clean, modern, and perfectly captures our brand identity.",
      avatar: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const windowWidth = window.innerWidth;
      
      // Update mobile state
      setIsMobile(windowWidth < 768);
      
      // Determine scroll direction
      const direction = scrollTop > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      
      // Show vertical nav when scrolling down and past 200px - ONLY on desktop
      setShowVerticalNav(direction === 'down' && scrollTop > 200 && windowWidth >= 768);
      
      // Only apply parallax on larger screens to prevent mobile issues
      if (windowWidth > 768) {
        setScrollY(scrollTop);
      } else {
        setScrollY(0); // Disable parallax on mobile
      }
      setScrollProgress(Math.min(scrollPercent * 100, 100));
      
      lastScrollY = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          if (target === heroRef.current) setIsVisible(prev => ({ ...prev, hero: true }));
          if (target === servicesRef.current) setIsVisible(prev => ({ ...prev, services: true }));
          if (target === workflowRef.current) setIsVisible(prev => ({ ...prev, workflow: true }));
          if (target === portfolioRef.current) setIsVisible(prev => ({ ...prev, portfolio: true }));
          if (target === testimonialsRef.current) setIsVisible(prev => ({ ...prev, testimonials: true }));
          if (target === faqRef.current) setIsVisible(prev => ({ ...prev, faq: true }));
          if (target === ctaRef.current) setIsVisible(prev => ({ ...prev, cta: true }));
        }
      });
    }, observerOptions);

    const refs = [heroRef, servicesRef, workflowRef, portfolioRef, testimonialsRef, faqRef, ctaRef];
    refs.forEach(ref => ref.current && observer.observe(ref.current));

    return () => observer.disconnect();
  }, []);

  // Auto-play carousel functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Carousel navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const services = [
    {
      id: "product-design",
      icon: <Package className="w-6 h-6" />,
      title: "Product Design",
      description: "End-to-end product design from concept to delivery, focusing on solving real user problems and business goals.",
      features: [
        "Product strategy & vision",
        "User research & analysis",
        "Interactive prototyping",
        "Visual design & branding",
        "Design system creation",
        "Developer handoff support"
      ]
    },
    {
      id: "ui-design",
      icon: <Monitor className="w-6 h-6" />,
      title: "UI Design for Websites",
      description: "Modern, responsive website interfaces that convert visitors into customers with professional design and user experience.",
      features: [
        "Mobile-first responsive design",
        "Modern UI components",
        "Cross-browser compatibility",
        "Fast loading optimization",
        "Source files included",
        "SEO-friendly structure"
      ]
    },
    {
      id: "mobile-app",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App UI/UX",
      description: "Intuitive mobile experiences that users love and engage with daily, designed for iOS and Android platforms.",
      features: [
        "Interactive prototypes",
        "User flow diagrams",
        "iOS & Android guidelines",
        "Micro-interactions design",
        "Accessibility considerations",
        "Design handoff documentation"
      ]
    },
    {
      id: "website-redesign",
      icon: <Code className="w-6 h-6" />,
      title: "Website Redesign",
      description: "Transform your existing website into a modern, high-converting experience with improved UX and performance.",
      features: [
        "Complete UX audit",
        "Conversion optimization",
        "Performance improvements",
        "Content strategy guidance",
        "A/B testing setup",
        "Migration support"
      ]
    },
    {
      id: "landing-pages",
      icon: <Zap className="w-6 h-6" />,
      title: "Landing Pages",
      description: "High-converting landing pages designed to maximize your campaign results and drive business growth.",
      features: [
        "Conversion-focused design",
        "A/B test variations",
        "Mobile optimization",
        "Lead capture forms",
        "Analytics integration",
        "Performance optimization"
      ]
    },
    {
      id: "wireframing",
      icon: <FileText className="w-6 h-6" />,
      title: "Wireframing & Prototyping",
      description: "Detailed wireframes and interactive prototypes to validate your ideas before development begins.",
      features: [
        "Low & high-fidelity wireframes",
        "Interactive prototypes",
        "User flow documentation",
        "Clickable demonstrations",
        "User testing scenarios",
        "Developer handoff notes"
      ]
    },
    {
      id: "design-systems",
      icon: <Palette className="w-6 h-6" />,
      title: "Design Systems",
      description: "Comprehensive design systems and style guides for consistent branding across all your digital platforms.",
      features: [
        "Complete component library",
        "Typography guidelines",
        "Color palette system",
        "Icon set creation",
        "Spacing & grid system",
        "Brand guidelines document"
      ]
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "Discovery & Requirements",
      description: "We discuss your goals, target audience, and project requirements in detail.",
      icon: <Search className="w-8 h-8" />
    },
    {
      step: "02", 
      title: "Research & Wireframes",
      description: "I research your industry and create wireframes to map out the user experience.",
      icon: <FileText className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Visual Design & Prototyping", 
      description: "Transform wireframes into beautiful, interactive designs that match your brand.",
      icon: <Palette className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Feedback & Revisions",
      description: "We collaborate to refine the design based on your feedback and requirements.",
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      step: "05",
      title: "Final Handover",
      description: "Receive all design files, assets, and documentation for development.",
      icon: <CheckCircle className="w-8 h-8" />
    }
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Simple landing pages take 3-5 days, while comprehensive website designs take 2-3 weeks. I'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "How many revisions are included?",
      answer: "Each package includes a specific number of revisions (detailed in the service description). Additional revisions can be purchased at $50 per round. I work closely with clients to minimize the need for extensive revisions."
    },
    {
      question: "What tools do you use?",
      answer: "I primarily use Figma for design and prototyping, Adobe Creative Suite for graphics, and various research tools for UX analysis. All deliverables are provided in industry-standard formats."
    },
    {
      question: "Do you provide source files?",
      answer: "Yes! You'll receive all source files including Figma files, exported assets in multiple formats (PNG, SVG, etc.), and comprehensive style guides and documentation."
    },
    {
      question: "How do we get started working together?",
      answer: "Simply reach out through the contact form or email me directly. We'll schedule a consultation to discuss your project needs, timeline, and goals to ensure we're a perfect fit."
    },
    {
      question: "Do you work with development teams?",
      answer: "Absolutely! I frequently collaborate with development teams and provide detailed specifications, assets, and support during the implementation phase to ensure pixel-perfect results."
    }
  ];

  // Custom Behance Icon moved to Footer.tsx

  return (
    <div className="min-h-screen bg-[#FCF9F8]">
      {/* CSS for paint drip animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes paintDrip {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(2px) scale(1.2); opacity: 0.8; }
            100% { transform: translateY(4px) scale(0.8); opacity: 0.3; }
          }
        `
      }} />
      
      {/* Scroll Progress Bar - Paint Brush Style */}
      <div className="fixed top-0 left-0 w-full h-2 z-[60] bg-gray-200 shadow-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#007BFF] via-purple-500 to-orange-400 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ 
            width: `${scrollProgress}%`,
            clipPath: 'polygon(0% 0%, 96% 0%, 100% 40%, 98% 80%, 94% 100%, 0% 100%)',
            filter: 'drop-shadow(0 1px 4px rgba(0, 123, 255, 0.4))'
          }}
        >
          {/* Paint brush texture effect */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(255,255,255,0.3) 1px,
                transparent 3px,
                transparent 6px
              )`
            }}
          />
          {/* Glowing tip effect */}
          <div 
            className="absolute right-0 top-0 h-full w-4 bg-white opacity-50 blur-sm"
            style={{
              clipPath: 'polygon(0% 10%, 100% 30%, 100% 70%, 0% 90%)'
            }}
          />
          {/* Paint drip effect */}
          <div 
            className="absolute right-2 bottom-0 w-1 h-1 bg-white opacity-60 rounded-full"
            style={{
              animation: `${scrollProgress > 10 ? 'paintDrip 2s ease-in-out infinite' : 'none'}`
            }}
          />
        </div>
      </div>
      
      {/* Header */}
      <header className={`bg-[#FCF9F8] w-full transition-all duration-500 ease-in-out z-50 sticky top-0 md:relative md:top-auto shadow-sm md:shadow-none ${
        showVerticalNav ? 'md:opacity-0 md:pointer-events-none' : 'md:opacity-100 md:pointer-events-auto'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] py-4 sm:py-6 lg:py-8 flex items-center justify-between">
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
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/freelance"
              className="text-[#007BFF] text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] -translate-x-0.5 -translate-y-0.5 transition-all duration-300"
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
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/freelance"
                className="text-[#007BFF] text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] transition-all duration-300"
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
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Projects"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Projects</span>
            </Link>
            <Link
              to="/freelance"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Freelance"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">Freelance</span>
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
      
      {/* Hero Section - Neo-Brutalist Redesign */}
      <section ref={heroRef} className="relative bg-[#FFDE59] py-20 sm:py-32 overflow-hidden border-b-4 border-black">
        {/* Abstract Art Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9F9F] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#A0E7E5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#B8C0FF] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-transparent" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.1 }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            
            <div className={`transition-all duration-1000 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Floating Badge */}
               <div className="inline-block transform -rotate-2 hover:rotate-2 transition-transform duration-300 mb-8">
                  <div className="bg-black text-white text-sm sm:text-base font-bold py-2 px-6 shadow-[5px_5px_0_0_#fff]">
                    🚀 AVAILABLE FOR NEW PROJECTS
                  </div>
               </div>

              {/* Excessive Title */}
              <h1 className="text-4xl min-[480px]:text-5xl sm:text-7xl lg:text-8xl font-black text-black mb-8 leading-tight sm:leading-[0.9] tracking-tighter">
                FREELANCE <br/>
                <span className="text-white text-stroke-3 text-stroke-black relative inline-block">
                  DESIGN
                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-8 w-8 h-8 sm:w-12 sm:h-12 bg-[#FF6B6B] rounded-full text-black text-[10px] sm:text-xs flex items-center justify-center font-bold border-2 border-black rotate-12 animate-bounce">
                    WOW!
                  </div>
                </span> <br/>
                THAT CONVERTS
              </h1>

              {/* Subtext Box */}
              <div className="bg-white border-4 border-black p-4 sm:p-8 max-w-3xl mx-auto shadow-[8px_8px_0_0_#000] transform rotate-1 mb-12">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">
                  I help founders and startups build <span className="text-[#007BFF] bg-[#B8C0FF] px-1">swoon-worthy</span> digital products. No fluff, just pixels that pay the bills.
                </p>
              </div>
              
              {/* Stats - Brutalist Boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
                 {[
                   { label: "Projects", val: "10+" },
                   { label: "Result", val: "100%" },
                   { label: "Reply", val: "24h" },
                   { label: "Speed", val: "2-3w" }
                 ].map((stat, i) => (
                    <div key={i} className="bg-black text-white p-3 sm:p-4 border-3 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                      <div className="text-2xl sm:text-3xl font-black">{stat.val}</div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">{stat.label}</div>
                    </div>
                 ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                 <Link to="/contact" className="w-full sm:w-auto">
                   <Button className="h-14 sm:h-16 px-6 sm:px-10 text-lg sm:text-xl font-black border-4 border-black bg-[#FF6B6B] text-black hover:bg-black hover:text-[#FF6B6B] shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all rounded-none w-full sm:w-auto">
                     START PROJECT <Zap className="ml-2 w-5 sm:w-6 h-5 sm:h-6 fill-current" />
                   </Button>
                 </Link>
                 <a href="#services" onClick={(e) => { e.preventDefault(); servicesRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto">
                    <Button variant="ghost" className="h-14 sm:h-16 px-6 sm:px-8 text-lg font-bold text-black border-4 border-black bg-white hover:bg-gray-100 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0_0_#000] rounded-none w-full sm:w-auto">
                      Explore Services <ArrowDown className="ml-2 w-5 h-5" />
                    </Button>
                 </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Neo-Brutalist Redesign */}
      <section ref={servicesRef} className="bg-white py-20 relative overflow-hidden border-b-4 border-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10">
          
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="inline-block bg-black text-white text-sm font-bold px-4 py-2 transform -rotate-2 mb-4">
              WHAT I DO BEST
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-black mb-6">
              MY <span className="bg-[#A0E7E5] px-2 border-2 border-black shadow-[4px_4px_0_0_#000]">SERVICES</span>
            </h2>
            <p className="text-xl font-bold text-gray-700 max-w-2xl mx-auto">
              I don't just "design". I solve expensive problems with pixels and code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const bgColors = ['bg-[#FF9F9F]', 'bg-[#B8C0FF]', 'bg-[#A0E7E5]', 'bg-[#FFDE59]', 'bg-[#FF6B6B]', 'bg-white'];
              const cardBg = bgColors[index % bgColors.length];
              
              return (
                <div
                  key={index}
                  className={`service-card group relative ${cardBg} border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-2 transition-all duration-300 opacity-0`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                       {service.icon}
                    </div>
                    <span className="text-4xl font-black text-black opacity-20 group-hover:opacity-100 transition-opacity">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-black mb-4 uppercase leading-none">
                    {service.title}
                  </h3>
                  
                  <p className="text-black font-medium mb-6 leading-relaxed border-b-2 border-black/10 pb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-black/80">
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section - Neo-Brutalist Redesign */}
      <section ref={workflowRef} className="bg-[#B8C0FF] py-20 relative border-b-4 border-black">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px', opacity: 0.3 }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10">
          
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
             <div className="inline-block bg-white border-2 border-black px-4 py-1 mb-4 shadow-[4px_4px_0_0_#000] rounded-full">
                <span className="font-bold text-black uppercase tracking-widest">The Process</span>
             </div>
            <h2 className="text-4xl sm:text-6xl font-black text-black mb-6">
              HOW I <span className="text-white text-stroke-2 text-stroke-black">WORK</span>
            </h2>
            <p className="text-xl font-bold text-black max-w-2xl mx-auto">
              Simple, transparent, and effective. No hidden surprises.
            </p>
          </div>

          <div className="space-y-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black hidden lg:block -translate-x-1/2 z-0 border-r-2 border-dashed border-black"></div>

            {workflow.map((step, index) => (
              <div
                key={index}
                className={`workflow-step flex flex-col lg:flex-row items-center gap-8 lg:gap-20 opacity-0 relative z-10 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Step Card */}
                <div className="bg-white border-4 border-black p-8 flex-1 w-full shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all">
                  <h3 className="text-2xl font-black text-black mb-2 uppercase">{step.title}</h3>
                  <p className="text-black font-medium leading-relaxed">{step.description}</p>
                </div>

                {/* Step Number/Icon Connector */}
                <div className="relative">
                   <div className="w-20 h-20 bg-[#FFDE59] border-4 border-black rounded-full flex items-center justify-center text-3xl font-black shadow-[4px_4px_0_0_#000] z-20 relative">
                     {step.step}
                   </div>
                   {/* Icon Floating Badge */}
                   <div className="absolute -top-4 -right-4 w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-white rounded-full z-30">
                      {index === 0 && <Search className="w-5 h-5" />}
                      {index === 1 && <PenTool className="w-5 h-5" />}
                      {index === 2 && <Palette className="w-5 h-5" />}
                      {index === 3 && <MessageCircle className="w-5 h-5" />}
                      {index === 4 && <Package className="w-5 h-5" />}
                   </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Samples Section - Neo-Brutalist Redesign */}
      <section ref={portfolioRef} className="bg-[#FCF9F8] py-20 relative border-b-4 border-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 max-w-[1600px]">
          
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-6xl font-black text-black mb-6">
              FEATURED <span className="bg-[#FF9F9F] px-2 text-black border-3 border-black transform inline-block -rotate-1 shadow-[4px_4px_0_0_#000]">WORK</span>
            </h2>
            <p className="text-xl font-bold text-gray-700 max-w-2xl mx-auto">
              Real projects. Real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjectsData.map((project, index) => (
              <div
                key={project.id}
                className="portfolio-item group h-[500px] opacity-0"
              >
                <div
                   className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-full relative`}
                   onMouseEnter={() => setIsHovering(project.slug)}
                   onMouseLeave={() => setIsHovering(null)}
                >
                  
                  {/* Floating Type Badge */}
                  <div className="absolute right-6 z-20 transition-all duration-500 ease-in-out" style={{ top: isHovering === project.slug ? '140px' : '265px' }}>
                     <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFDE59] text-black px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform rotate-1 inline-block">
                       {project.type}
                     </span>
                  </div>

                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">{project.slug.substring(0, 10)}...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                   className={`relative bg-gray-100 overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#FFDE59] transition-all duration-500 ease-in-out shrink-0 ${
                      isHovering === project.slug ? 'h-[120px]' : 'h-[250px]'
                   }`}
                >
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="font-bold text-gray-400">?</span>
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
                  <div className="flex items-start justify-between mb-4 gap-2">
                     <h3 className="text-2xl font-black leading-tight text-black uppercase tracking-tight pr-2 shrink-0">
                       {project.name}
                     </h3>
                  </div>
                  
                  <div className={`overflow-y-auto pr-2 custom-scrollbar transition-all duration-500 ${
                       isHovering === project.slug ? 'flex-1' : 'line-clamp-3'
                    }`}>
                      <p className="text-sm sm:text-base font-medium leading-relaxed text-gray-600">
                        {renderDescriptionWithLinks(project.description)}
                      </p>
                  </div>
                  
                  {/* Links */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t-2 border-black border-dashed shrink-0">
                      {project.links.design && (
                        <a href={project.links.design} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase hover:underline text-gray-500 hover:text-black">
                           Figma
                        </a>
                      )}
                      {project.links.caseStudy && (
                        <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase hover:underline text-gray-500 hover:text-black">
                           Case Study
                        </a>
                      )}
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase hover:underline text-gray-500 hover:text-black">
                           GitHub
                        </a>
                      )}
                  </div>
                </div>
              </div>
           </div>
            ))}
          </div>

          <div className={`text-center transition-all duration-1000 delay-600 ${
            isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-[#FFDE59] hover:text-black border-4 border-black px-10 py-4 font-black text-lg shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all"
            >
              VIEW FULL PORTFOLIO <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Client Testimonials - Neo-Brutalist Redesign */}
      <section ref={testimonialsRef} className="bg-[#FFDE59] py-20 relative border-b-4 border-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 max-w-[1600px]">
          
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
             <div className="inline-block bg-white border-2 border-black px-4 py-1 mb-4 shadow-[4px_4px_0_0_#000] rounded-full transform rotate-2">
                <span className="font-bold text-black uppercase tracking-widest">Feedback</span>
             </div>
            <h2 className="text-4xl sm:text-6xl font-black text-black mb-6">
              CLIENT <span className="text-white text-stroke-2 text-stroke-black">LOVE</span>
            </h2>
          </div>

          <div className={`relative transition-all duration-1000 delay-200 ${
            isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
       
            <div className="relative max-w-5xl mx-auto flex items-center">
              {/* Previous Button  */}
              <button
                onClick={prevTestimonial}
                className="hidden lg:flex bg-white hover:bg-black border-4 border-black p-4 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group mr-8 z-20"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-8 h-8 text-black group-hover:text-white stroke-[3]" />
              </button>

              {/* Main Testimonial Card */}
              <div className="flex-1 max-w-4xl relative">
                 {/* Decorative Quote Mark */}
                 <div className="absolute -top-12 -left-8 text-[120px] leading-none text-black opacity-10 font-black font-serif hidden sm:block">
                   "
                 </div>

                <div className="bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-6 sm:p-12 min-h-[350px] flex flex-col justify-between transition-all duration-300 rotate-1 hover:rotate-0">
                  
                  <div className="flex-1 flex flex-col justify-center text-center">
                    {/* Stars */}
                    <div className="flex items-center justify-center mb-6 gap-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 sm:w-6 h-5 sm:h-6 text-[#000] fill-[#000]" />
                      ))}
                    </div>

                    <blockquote className="text-lg sm:text-2xl md:text-3xl font-black text-black leading-tight mb-8">
                       "{testimonials[currentTestimonial].testimonial}"
                    </blockquote>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-center pt-6 border-t-2 border-black border-dashed">
                    <div className="w-14 h-14 bg-[#FF9F9F] border-3 border-black rounded-full mr-4 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#000]">
                      <span className="font-bold text-lg">{testimonials[currentTestimonial].name.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-black text-black text-xl mb-0 leading-none">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-sm font-bold text-gray-600 mb-0">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-xs font-bold text-[#007BFF] uppercase tracking-wider mt-1">
                        PROJECT: {testimonials[currentTestimonial].project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextTestimonial}
                className="hidden lg:flex bg-white hover:bg-black border-4 border-black p-4 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 group ml-8 z-20"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-8 h-8 text-black group-hover:text-white stroke-[3]" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden justify-center space-x-6 mt-10">
              <button onClick={prevTestimonial} className="bg-white border-3 border-black p-3 shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000] active:translate-y-1 transition-all">
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <button onClick={nextTestimonial} className="bg-white border-3 border-black p-3 shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000] active:translate-y-1 transition-all">
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section - Neo-Brutalist Redesign */}
      <section ref={faqRef} className="bg-white py-20 border-b-4 border-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px]">
          
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
             <div className="inline-block bg-[#FF9F9F] border-2 border-black px-4 py-1 mb-4 shadow-[4px_4px_0_0_#000] rounded-none transform -rotate-2">
                <span className="font-bold text-black uppercase tracking-widest">Q&A</span>
             </div>
            <h2 className="text-4xl sm:text-6xl font-black text-black mb-6">
              COMMON <span className="bg-[#B8C0FF] px-2 shadow-[4px_4px_0_0_#000] border-2 border-black">QUESTIONS</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ${
                  isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: isVisible.faq ? `${index * 100}ms` : '0ms'
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg sm:text-xl font-black text-black pr-4 uppercase">
                    {faq.question}
                  </h3>
                  <div className={`transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                    {expandedFaq === index ? (
                      <div className="bg-black text-white p-1 rounded-full"><ChevronUp className="w-6 h-6" /></div>
                    ) : (
                      <div className="bg-white border-2 border-black text-black p-1 rounded-full"><ChevronDown className="w-6 h-6" /></div>
                    )}
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t-2 border-dashed border-gray-300 pt-4">
                    <p className="text-base text-gray-800 font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Neo-Brutalist Redesign */}
      <section ref={ctaRef} className="bg-[#007BFF] py-24 relative overflow-hidden">
        {/* Simple Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#FFDE59] rounded-full opacity-20 hidden lg:block"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] relative z-10">
          <div className={`text-center transition-all duration-1000 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 border-b-4 sm:border-b-8 border-white inline-block pb-4">
              LET'S TALK
            </h2>
            
            <p className="text-lg sm:text-2xl font-bold text-white mb-12 max-w-2xl mx-auto">
              Ready to create something annoying for your competitors?
            </p>
            
            {/* Availability Note */}
            <div className="inline-flex items-center gap-3 bg-black/20 border-2 border-white/40 px-6 py-3 rounded-full mb-12 backdrop-blur-sm">
                <div className="w-3 h-3 bg-[#00FF00] rounded-full animate-ping"></div>
                <p className="text-white font-bold tracking-widest text-sm">
                  OPEN FOR NEW PROJECTS
                </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto w-full">
              <Link
                to="/contact"
                className="bg-white text-black border-4 border-black px-6 sm:px-8 py-4 sm:py-5 font-black text-base sm:text-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-all flex items-center justify-center gap-3 transform rotate-1 hover:rotate-0 w-full sm:w-auto"
              >
                START A PROJECT 
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
              </Link>
              <a
                href="https://wa.me/94758883751?text=Hi%20Prabhath!%20I'm%20interested%20in%20your%20UI/UX%20design%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-black border-4 border-black px-6 sm:px-8 py-4 sm:py-5 font-black text-base sm:text-lg shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-all flex items-center justify-center gap-3 transform -rotate-1 hover:rotate-0 w-full sm:w-auto"
              >
                WHATSAPP ME 
                <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Me A Coffee Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1600px] mb-20">
        <BuyMeACoffee />
      </div>

      {/* Footer */}
      <Footer />
      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I'm interested in your freelance services. Let's discuss my project requirements."
      />
    </div>
  );
};

export default Freelance;