import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Linkedin, Mail, Menu, X, Github, Zap, Users, Award, MessageCircle, ChevronLeft, ChevronRight, Play, Pause, Eye, Palette, PenTool, Lightbulb, Repeat, Sparkles, Layers } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import DesignCarousel from "@/components/DesignCarousel";
import { getAssetPath } from "@/lib/utils";
import { Footer, BehanceIcon } from "@/components/Footer";

export default function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  
  // Gallery states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Image loading states
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  
  // Animation states
  const [isVisible, setIsVisible] = useState({
    hero: false,
    stats: false,
    quote: false,
    projects: false
  });
  
  // Expandable card states
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // Static roles array to prevent re-renders
  const roles = useMemo(() => ["Product Designer", "UI/UX Designer", "Front-end Developer"], []);

  // Project gallery data
  const projectGalleries = {
    cima: [
      getAssetPath("images/projects/cima_1.png"),
      getAssetPath("images/projects/cima_2.png")
    ],
    gym: [
      getAssetPath("images/projects/gym_1.png"),
      getAssetPath("images/projects/gym_2.png"),
      getAssetPath("images/projects/gym_3.png"),
      getAssetPath("images/projects/gym_4.png")
    ],
    jhon: [
      getAssetPath("images/projects/jhon_1.png"),
      getAssetPath("images/projects/jhon_2.png"),
      getAssetPath("images/projects/jhon_3.png"),
      getAssetPath("images/projects/jhon_4.png")
    ],
    culturajoin: [
      getAssetPath("images/projects/culturajoin.png"),
      getAssetPath("images/projects/cult_1.png"), 
      getAssetPath("images/projects/cult_3.png"),
      getAssetPath("images/projects/cult_4.png"),
      getAssetPath("images/projects/cult_2.png")
    ],
    motion: [
      getAssetPath("images/projects/motion_1.png"),
      getAssetPath("images/projects/motion_2.png"),
      getAssetPath("images/projects/motion_3.png")
    ],
    swish: [
      getAssetPath("images/projects/swish_1.jpeg"),
      getAssetPath("images/projects/swish_2.jpeg"),
      getAssetPath("images/projects/swish_3.jpeg"),
      getAssetPath("images/projects/swish_4.png"),
      getAssetPath("images/projects/swishstrokes.png")
    ]
  };

  // Scroll handler for parallax and reveal animations
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
      
      // Check visibility of elements
      const checkVisibility = (ref: React.RefObject<HTMLElement>, key: keyof typeof isVisible) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isInView && !isVisible[key]) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        }
      };
      
      checkVisibility(heroRef, 'hero');
      checkVisibility(statsRef, 'stats');
      checkVisibility(quoteRef, 'quote');
      checkVisibility(projectsRef, 'projects');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!animationStarted) return;

    let timeout: NodeJS.Timeout;
    const currentRole = roles[currentRoleIndex];

    if (isTyping) {
      // Typing animation
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Finished typing, wait then start erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause to read
      }
    } else {
      // Erasing animation
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Erasing speed
      } else {
        // Finished erasing, move to next role
        timeout = setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }, 500); // Pause between roles
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentRoleIndex, animationStarted, roles]);

  // Initialize typewriter animation immediately (no loading screen delay)
  useEffect(() => {
    setAnimationStarted(true);
    // Start with first character to ensure animation begins
    if (roles.length > 0) {
      setDisplayedText(roles[0].slice(0, 1));
    }
  }, [roles]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-carousel for gallery
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGalleryOpen && isAutoPlaying && currentProject) {
      interval = setInterval(() => {
        const projectImages = projectGalleries[currentProject as keyof typeof projectGalleries];
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

  // Optimized image preloading with priority loading
  useEffect(() => {
    // Only preload above-the-fold critical images
    const criticalImages = [
      getAssetPath("images/profile/profile.png"), // Hero profile image - highest priority
    ];
    
    // Secondary images to preload after critical ones
    const secondaryImages = [
      getAssetPath("images/projects/swishstrokes.png"), // First featured project
      getAssetPath("images/projects/culturajoin.png"), // Second featured project
    ];

    const preloadImage = (src: string, priority = false) => {
      return new Promise<void>((resolve) => {
        // Use link preload for higher priority
        if (priority) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          link.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [src]: true }));
            resolve();
          };
          link.onerror = () => {
            setImagesLoaded(prev => ({ ...prev, [src]: false }));
            resolve();
          };
          document.head.appendChild(link);
        } else {
          // Use Image() for lower priority
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [src]: true }));
            resolve();
          };
          img.onerror = () => {
            setImagesLoaded(prev => ({ ...prev, [src]: false }));
            resolve();
          };
          img.src = src;
        }
      });
    };

    const preloadSequentially = async () => {
      // Load critical images first with high priority
      await Promise.all(criticalImages.map(src => preloadImage(src, true)));
      
      // Then load secondary images with a small delay to not block critical ones
      setTimeout(() => {
        secondaryImages.forEach(src => preloadImage(src, false));
      }, 100);
    };

    // Start preloading after a small delay to not block initial render
    const timer = setTimeout(preloadSequentially, 50);
    return () => clearTimeout(timer);
  }, []);

  // Image loading handler
  const handleImageLoad = (src: string) => {
    setImagesLoaded(prev => ({ ...prev, [src]: true }));
  };

  // Enhanced image component with better performance optimizations
  const OptimizedImage = ({ 
    src, 
    alt, 
    className = "", 
    priority = false,
    ...props 
  }: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    [key: string]: any;
  }) => {
    const [imageError, setImageError] = useState(false);
    const [localLoaded, setLocalLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isPreloaded = imagesLoaded[src];
    const shouldShowImage = isPreloaded || localLoaded;
    
    // Intersection Observer for lazy loading with larger threshold
    useEffect(() => {
      if (priority || isInView) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observerRef.current?.disconnect();
            }
          });
        },
        {
          rootMargin: '100px', // Start loading 100px before entering viewport
          threshold: 0.1
        }
      );

      const currentRef = imgRef.current;
      if (currentRef) {
        observerRef.current.observe(currentRef);
      }

      return () => {
        observerRef.current?.disconnect();
      };
    }, [priority, isInView]);
    
    const handleImageLoad = () => {
      setLocalLoaded(true);
      setImagesLoaded(prev => ({ ...prev, [src]: true }));
    };

    const handleImageError = () => {
      setImageError(true);
      setLocalLoaded(true);
    };

    // Set fetchpriority and optimize loading
    useEffect(() => {
      if (imgRef.current) {
        imgRef.current.setAttribute('fetchpriority', priority ? 'high' : 'auto');
        
        // Preload critical images
        if (priority && !isPreloaded) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        }
      }
    }, [priority, src, isPreloaded]);
    
    return (
      <div 
        ref={imgRef}
        className={`relative overflow-hidden ${className}`}
        style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 300px' }}
      >
        {!shouldShowImage && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Image not available</div>
          </div>
        ) : (
          (isInView || priority) && (
            <img
              src={src}
              alt={alt}
              className={`transition-opacity duration-300 ${shouldShowImage ? 'opacity-100' : 'opacity-0'} ${className}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              style={{ 
                willChange: shouldShowImage ? 'auto' : 'opacity',
                transform: 'translateZ(0)' // Force hardware acceleration
              }}
              {...props}
            />
          )
        )}
      </div>
    );
  };

  // Gallery helper functions
  const openGallery = (projectId: string) => {
    setCurrentProject(projectId);
    setCurrentImageIndex(0);
    setIsAutoPlaying(true);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
    setIsAutoPlaying(false);
  };

  const nextImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject as keyof typeof projectGalleries];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      }
    }
  };

  const prevImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject as keyof typeof projectGalleries];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };



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

  return (
    <div className="min-h-screen bg-white">
      {/* CSS for paint drip animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes paintDrip {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(2px) scale(1.2); opacity: 0.8; }
            100% { transform: translateY(4px) scale(0.8); opacity: 0.3; }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-shimmer {
            animation: shimmer 1.5s ease-in-out infinite;
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
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-12 py-4 sm:py-6 relative z-50 max-w-[1600px] mx-auto w-full transition-all duration-500 ease-in-out ${
        /* Sticky on mobile, conditional visibility on desktop */
        isMobile 
          ? 'sticky top-0' 
          : `relative ${showVerticalNav ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`
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
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Projects
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
              to="/contact"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Contact Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">Contact</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-[#FCF9F8] py-8 sm:py-12 lg:py-16 xl:py-20 relative overflow-hidden z-10"
        style={{
          transform: `translateY(${window.innerWidth > 768 ? Math.min(scrollY * 0.03, 40) : 0}px)`,
        }}
      >
        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-full mx-auto">
            
            {/* Main Hero Card - Art Board Style */}
            <div className={`relative bg-white border-4 border-black rounded-[30px] shadow-[10px_10px_0_0_#000] overflow-hidden mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              {/* Board Header / Window Controls */}
              <div className="absolute top-0 left-0 w-full h-12 border-b-4 border-black bg-gray-100 flex items-center px-4 gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-black hover:bg-red-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black hover:bg-yellow-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-black hover:bg-green-500 transition-colors"></div>
                <div className="ml-4 text-xs font-bold font-sans text-gray-500 uppercase tracking-widest hidden sm:block">Welcome.board</div>
                <div className="ml-auto flex gap-2">
                   <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
                   <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
                </div>
              </div>

               {/* Grid Background */}
              <div className="absolute inset-0 top-12 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

              <div className="grid lg:grid-cols-2 gap-0 pt-12 relative z-10">
                
                {/* Left side - Content */}
                <div className={`p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center order-2 lg:order-1 transition-all duration-1000 delay-200 ${
                  isVisible.hero 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}>
                  {/* Greeting Badge */}
                  <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide mb-6 sm:mb-8 w-fit shadow-[4px_4px_0_0_#007BFF]">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full animate-pulse"></div>
                    AVAILABLE FOR WORK
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[64px] font-black leading-none text-black tracking-tight">
                      HI, I'M <span className="relative inline-block">PRABHATH<span className="absolute bottom-1 left-0 w-full h-3 bg-[#007BFF]/20 -z-10"></span></span>
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-blue-600">SUBHASHANA</span>
                    </h1>
                    
                    {/* Animated Role Text */}
                    <div className="relative h-[40px] sm:h-[50px] lg:h-[60px] flex items-center">
                      <div className="bg-black text-white px-4 py-2 rounded-xl inline-flex items-center shadow-[4px_4px_0_0_#888]">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold font-mono min-h-[1em]">{displayedText}</span>
                        <span className={`typewriter-cursor ml-1 text-[#007BFF] font-bold ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-gray-700 max-w-lg font-medium">
                      BSc Software Engineering undergraduate passionate about creating engaging, user-centered digital experiences with modern technologies.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6">
                      <Link to="/projects">
                        <Button
                          className="border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] text-sm sm:text-base font-bold px-8 py-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] w-full sm:w-auto"
                        >
                          View My Work
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button
                          className="border-2 border-black bg-[#007BFF] text-white hover:bg-[#0069d9] hover:text-white shadow-[4px_4px_0_0_#000] text-sm sm:text-base font-bold px-8 py-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] w-full sm:w-auto"
                        >
                          Get In Touch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right side - Profile Image */}
                <div className={`relative p-6 sm:p-8 lg:p-12 xl:p-16 flex items-center justify-center order-1 lg:order-2 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-1000 delay-400 ${
                  isVisible.hero 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}>
                  {/* Animated decorative elements */}
                  <div className={`absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[#007BFF] rounded-full transition-all duration-700 delay-600 ${
                    isVisible.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}></div>
                  <div className={`absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-2 border-black transform rotate-45 transition-all duration-700 delay-700 ${
                    isVisible.hero ? 'opacity-100 scale-100 rotate-45' : 'opacity-0 scale-0 rotate-0'
                  }`}></div>
                  <div className={`absolute bottom-6 sm:bottom-8 lg:bottom-12 left-6 sm:left-8 lg:left-12 w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-black transition-all duration-700 delay-800 ${
                    isVisible.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}></div>
                  
                  <div className="relative">
                    {/* Main profile image container - Window Style */}
                    <div className={`relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[380px] xl:h-[380px] transition-all duration-1000 delay-500 ${
                      isVisible.hero ? 'scale-100 rotate-0' : 'scale-90 rotate-3'
                    }`}>
                      <div className="w-full h-full border-2 border-black rounded-xl overflow-hidden shadow-[8px_8px_0_0_#000] bg-white flex flex-col">
                        {/* Window Header */}
                        <div className="h-8 border-b-2 border-black bg-gray-50 flex items-center px-3 gap-1.5 shrink-0">
                          <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
                          <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
                          <div className="ml-auto text-[10px] font-sans font-semibold text-gray-500">profile_cam_01.rec</div>
                        </div>
                        
                        {/* Image Content */}
                        <div className="relative flex-1 bg-white p-0 overflow-hidden">
                          <OptimizedImage
                            src={getAssetPath("images/profile/profile.png")}
                            alt="Prabhath Subhashana"
                            className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                            priority={true}
                          />
                        </div>
                      </div>
                      
                      {/* Floating badge */}
                      <div className={`absolute -bottom-4 -right-4 bg-[#007BFF] text-white px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0_0_#000] transform rotate-3 transition-all duration-1000 delay-900 z-20 ${
                        isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <span className="text-sm font-bold font-sans">UI/UX Designer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Stats Cards with Widget Style */}
            <div 
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
            >
              {/* Experience Card */}
              <div className={`bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0_0_#000] p-0 overflow-hidden flex flex-col group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300 ${
                isVisible.stats 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.stats ? '100ms' : '0ms'
              }}>
                <div className="bg-gray-50 border-b-2 border-black px-4 py-2 flex items-center justify-between">
                   <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-red-400 border border-black"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black"></div>
                   </div>
                   <div className="text-[10px] font-bold font-mono text-gray-400">EXP_01</div>
                </div>
                <div className="p-6 text-center flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-[#007BFF] rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0_0_#000]">
                    <span className="text-white group-hover:text-white font-black text-2xl">1+</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2 font-sans">Years Experience</h3>
                  <p className="text-sm text-gray-600 font-medium">
                    Creating digital experiences and developing frontend solutions
                  </p>
                </div>
              </div>

              {/* Projects Card */}
              <div className={`bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0_0_#000] p-0 overflow-hidden flex flex-col group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300 ${
                isVisible.stats 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.stats ? '200ms' : '0ms'
              }}>
                <div className="bg-gray-50 border-b-2 border-black px-4 py-2 flex items-center justify-between">
                   <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-red-400 border border-black"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black"></div>
                   </div>
                   <div className="text-[10px] font-bold font-mono text-gray-400">PRJ_02</div>
                </div>
                <div className="p-6 text-center flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-[#007BFF] rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0_0_#000]">
                    <span className="text-white group-hover:text-white font-black text-2xl">10+</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2 font-sans">Projects Completed</h3>
                  <p className="text-sm text-gray-600 font-medium">
                    Web applications, mobile apps, and design systems delivered
                  </p>
                </div>
              </div>

              {/* Technologies Card */}
              <div className={`bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0_0_#000] p-0 overflow-hidden flex flex-col group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300 sm:col-span-2 lg:col-span-1 ${
                isVisible.stats 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.stats ? '300ms' : '0ms'
              }}>
                <div className="bg-gray-50 border-b-2 border-black px-4 py-2 flex items-center justify-between">
                   <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-red-400 border border-black"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-400 border border-black"></div>
                   </div>
                   <div className="text-[10px] font-bold font-mono text-gray-400">TECH_03</div>
                </div>
                <div className="p-6 text-center flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-[#007BFF] rounded-xl border-2 border-black flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors shadow-[4px_4px_0_0_#000]">
                    <span className="text-white group-hover:text-white font-black text-xl">8+</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2 font-sans">Technologies</h3>
                  <p className="text-sm text-gray-600 font-medium">
                    Frontend frameworks, design tools, and development platforms
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center mt-8 sm:mt-12 lg:mt-16">
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 tracking-[1.23px]">Connect with me</p>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://behance.net/prabathsubasha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Behance Portfolio"
                >
                  <BehanceIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://github.com/subhashana00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="mailto:prabathsubashana18@gmail.com"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Email"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-white h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* New Graphic/UI Design Carousel Section */}
      <DesignCarousel />

      {/* Section Separator */}
      <div className="bg-white h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Design Philosophy Section - Redesigned */}
      <section 
        ref={quoteRef}
        className="bg-[#FCF9F8] py-16 sm:py-24 relative z-10 overflow-hidden"
        style={{
          transform: `translateY(${window.innerWidth > 768 ? Math.min(scrollY * 0.02, 30) : 0}px)`,
        }}
      >
        {/* Background Art Elements */}
        <div className="absolute top-20 left-[5%] w-16 h-16 bg-[#FFDE59] rounded-full border-3 border-black -z-10 opacity-100 hidden lg:block animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-[5%] w-20 h-20 bg-[#FF9F9F] rotate-12 border-3 border-black -z-10 opacity-100 hidden lg:block"></div>
        <div className="absolute top-1/3 right-[15%] w-4 h-4 bg-black rounded-full -z-10 hidden sm:block"></div>
        <div className="absolute bottom-1/3 left-[10%] w-6 h-6 border-3 border-black rounded-full -z-10 hidden sm:block"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Section Header */}
          <div className={`text-center mb-16 lg:mb-24 transition-all duration-1000 ${
            isVisible.quote 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="relative inline-block">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-black mb-6 z-10 relative px-6 py-2">
                Design Philosophy
              </h2>
              {/* Highlight effect behind Title */}
              <div className="absolute top-1/2 left-0 w-full h-full bg-[#B8C0FF] -z-0 -rotate-2 rounded border-3 border-black translate-y-[-40%] translate-x-[10px]"></div>
            </div>
            
            <p className="text-base sm:text-lg font-bold tracking-wide text-gray-800 max-w-2xl mx-auto mt-8 bg-white border-2 border-black p-4 shadow-[4px_4px_0_0_#000] rotate-1">
              Blending <span className="text-[#FF6B6B] font-black">ARTISTRY</span> with <span className="text-[#007BFF] font-black">FUNCTIONALITY</span> to create immersive digital experiences.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Main Quote Card */}
            <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              isVisible.quote 
                ? 'opacity-100 translate-y-0 rotate-0' 
                : 'opacity-0 translate-y-12 -rotate-2'
            }`}>
              <div className="bg-[#FFDE59] border-4 border-black rounded-[30px] shadow-[10px_10px_0_0_#000] p-8 sm:p-12 relative overflow-visible group hover:shadow-[14px_14px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                 {/* Quote Decor */}
                 <div className="absolute -top-6 -left-2 text-8xl font-black text-black z-20" style={{ textShadow: '4px 4px 0px white' }}>"</div>
                 
                 <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-start gap-6">
                      <div className="hidden sm:flex flex-shrink-0 w-20 h-20 bg-black rounded-full border-4 border-white items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                          <Sparkles className="w-10 h-10 text-[#FFDE59]" />
                      </div>
                      <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight">
                        A problem well stated is a problem half <span className="bg-white px-3 py-1 border-3 border-black text-[#007BFF] transform inline-block -rotate-3 shadow-[4px_4px_0_0_#000]">solved</span>.
                      </blockquote>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 ml-2 sm:ml-28">
                       <div className="h-1 w-12 bg-black"></div>
                       <div>
                         <p className="text-lg font-black uppercase tracking-wider">Charles Kettering</p>
                         <p className="text-xs font-bold font-mono text-black/70">INVENTOR & ENGINEER</p>
                       </div>
                    </div>
                 </div>
                 
                 {/* Decorative Stickers */}
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FF9F9F] rounded-full border-4 border-black hidden sm:flex items-center justify-center animate-spin-slow shadow-[4px_4px_0_0_#000]">
                    <Sparkles className="w-12 h-12 text-black" />
                 </div>
              </div>
            </div>

            {/* Steps - Right Side */}
            <div className={`lg:col-span-5 flex flex-col gap-6 transition-all duration-1000 delay-400 ${
               isVisible.quote ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
                 
                 {/* Step 1 */}
                 <div className="bg-white border-3 border-black p-6 rounded-[20px] shadow-[6px_6px_0_0_#000] flex items-center gap-6 hover:bg-[#A0E7E5] transition-colors duration-300 transform hover:-translate-x-2 cursor-default group">
                    <div className="w-16 h-16 bg-[#FF6B6B] border-3 border-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0_0_#000] group-hover:rotate-6 transition-transform">
                        <Lightbulb className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-black text-xl mb-1">01. RESEARCH</h3>
                        <p className="text-sm font-bold text-gray-600 leading-snug">
                            Deep dive into needs before pixels touch the screen.
                        </p>
                    </div>
                 </div>

                 {/* Step 2 */}
                 <div className="bg-white border-3 border-black p-6 rounded-[20px] shadow-[6px_6px_0_0_#000] flex items-center gap-6 hover:bg-[#B8C0FF] transition-colors duration-300 transform hover:-translate-x-2 cursor-default ml-0 lg:ml-8 group">
                    <div className="w-16 h-16 bg-[#FFDE59] border-3 border-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0_0_#000] group-hover:-rotate-6 transition-transform">
                        <Palette className="w-8 h-8 text-black" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-black text-xl mb-1">02. CRAFT</h3>
                        <p className="text-sm font-bold text-gray-600 leading-snug">
                            Visualizing solutions with bold systems.
                        </p>
                    </div>
                 </div>

                 {/* Step 3 */}
                 <div className="bg-white border-3 border-black p-6 rounded-[20px] shadow-[6px_6px_0_0_#000] flex items-center gap-6 hover:bg-[#FF9F9F] transition-colors duration-300 transform hover:-translate-x-2 cursor-default group">
                     <div className="w-16 h-16 bg-[#007BFF] border-3 border-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0_0_#000] group-hover:rotate-3 transition-transform">
                        <Repeat className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-black text-xl mb-1">03. ITERATE</h3>
                        <p className="text-sm font-bold text-gray-600 leading-snug">
                            Refining tailored experiences through testing.
                        </p>
                    </div>
                 </div>

            </div>

          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-[#FCF9F8] h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Featured Projects Section */}
      <section 
        ref={projectsRef} 
        id="projects" 
        className="bg-white py-12 sm:py-16 lg:py-24 relative z-10"
        style={{
          transform: `translateY(${window.innerWidth > 768 ? Math.min(scrollY * 0.01, 20) : 0}px)`,
        }}
      >
        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className={`mb-8 sm:mb-12 lg:mb-16 text-center lg:text-left transition-all duration-1000 ${
            isVisible.projects 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-[39px] font-medium leading-tight text-black mb-4 sm:mb-6 lg:mb-8">
              Featured projects
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-[654px] mx-auto lg:mx-0">
              Find out about my works: read through my case studies, have a look
              at final designs and try out prototypes I've built.
            </p>
          </div>


          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Project 1 - CIMA Landingpage Redesign */}
            <div className={`group h-full transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '200ms' : '0ms'
            }}>
              <div 
                className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-[500px] ${
                  expandedCard === 'cima' ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                }`}
                onMouseEnter={() => setIsHovering('cima')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setExpandedCard(expandedCard === 'cima' ? null : 'cima')}
              >
                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">cima...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                  className={`relative w-full overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#FFDE59] transition-all duration-500 ease-in-out ${
                    isHovering === 'cima' ? 'h-[120px]' : 'h-[250px]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery('cima');
                  }}
                >
                  <OptimizedImage 
                    src={getAssetPath("images/projects/cima_1.png")} 
                    alt="CIMA Landingpage Redesign"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    priority={true}
                  />
                  
                  {/* View Gallery Overlay Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white border-3 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 scale-75">
                          <Eye className="w-5 h-5 text-black" />
                          <span className="font-black uppercase tracking-wider text-sm">View</span>
                      </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                     <h3 className="text-2xl font-black leading-tight text-black line-clamp-1 uppercase tracking-tight">
                      CIMA Landingpage
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#FF6B6B] text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform rotate-2">Website</span>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed text-gray-600 transition-all duration-500 ${
                      expandedCard === 'cima' || isHovering === 'cima' 
                        ? 'overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2' 
                        : 'line-clamp-3'
                    }`}>
                      Redesigned the CIMA landing page to improve user engagement and conversion rates, focusing on clear messaging and intuitive navigation.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t-2 border-black border-dashed shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Design Only
                      </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 - Gym & Fitness Mobile App */}
            <div className={`group h-full transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '400ms' : '0ms'
            }}>
              <div 
                className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-[500px] ${
                  expandedCard === 'gym' ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                }`}
                onMouseEnter={() => setIsHovering('gym')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setExpandedCard(expandedCard === 'gym' ? null : 'gym')}
              >
                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">gym...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                  className={`relative w-full overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#007BFF] transition-all duration-500 ease-in-out ${
                    isHovering === 'gym' ? 'h-[120px]' : 'h-[250px]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery('gym');
                  }}
                >
                  <OptimizedImage 
                    src={getAssetPath("images/projects/gym_1.png")} 
                    alt="Gym & Fitness Mobile App"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    priority={true}
                  />
                  
                  {/* View Gallery Overlay Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white border-3 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 scale-75">
                          <Eye className="w-5 h-5 text-black" />
                          <span className="font-black uppercase tracking-wider text-sm">View</span>
                      </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                     <h3 className="text-2xl font-black leading-tight text-black line-clamp-1 uppercase tracking-tight">
                      Gym & Fitness App
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#007BFF] text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform -rotate-1">Mobile App</span>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed text-gray-600 transition-all duration-500 ${
                      expandedCard === 'gym' || isHovering === 'gym' 
                        ? 'overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2' 
                        : 'line-clamp-3'
                    }`}>
                      Designed a comprehensive fitness app with workout tracking, personalized plans, and progress visualizations to motivate users.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t-2 border-black border-dashed shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Design Only
                      </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 - Jhon Holdings Furniture's Branding */}
            <div className={`group h-full transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '600ms' : '0ms'
            }}>
              <div 
                className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-[500px] ${
                  expandedCard === 'jhon' ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                }`}
                onMouseEnter={() => setIsHovering('jhon')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setExpandedCard(expandedCard === 'jhon' ? null : 'jhon')}
              >
                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">jhon...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                  className={`relative w-full overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#FFDE59] transition-all duration-500 ease-in-out ${
                    isHovering === 'jhon' ? 'h-[120px]' : 'h-[250px]'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    openGallery('jhon');
                  }}
                >
                  <OptimizedImage 
                    src={getAssetPath("images/projects/jhon_1.png")} 
                    alt="Jhon Holdings Furniture's Branding"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    priority={true}
                  />
                  
                  {/* View Gallery Overlay Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white border-3 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 scale-75">
                          <Eye className="w-5 h-5 text-black" />
                          <span className="font-black uppercase tracking-wider text-sm">View</span>
                      </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                     <h3 className="text-2xl font-black leading-tight text-black line-clamp-1 uppercase tracking-tight">
                      Furniture's Branding
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFDE59] text-black px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform rotate-1">Branding</span>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed text-gray-600 transition-all duration-500 ${
                      expandedCard === 'jhon' || isHovering === 'jhon' 
                        ? 'overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2' 
                        : 'line-clamp-3'
                    }`}>
                      Developed a coherent brand identity for Jhon Holdings, including logo design, color palette, and visual assets for their furniture line.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t-2 border-black border-dashed shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Design Unavailable
                      </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 - CulturaJoin */}
            <div className={`group h-full transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '800ms' : '0ms'
            }}>
              <div 
                className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-[500px] ${
                  expandedCard === 'culturajoin' ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                }`}
                onMouseEnter={() => setIsHovering('culturajoin')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setExpandedCard(expandedCard === 'culturajoin' ? null : 'culturajoin')}
              >
                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">cult...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                  className={`relative w-full overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#FF6B6B] transition-all duration-500 ease-in-out ${
                    isHovering === 'culturajoin' ? 'h-[120px]' : 'h-[250px]'
                  }`}
                  onClick={() => openGallery('culturajoin')}
                >
                  <OptimizedImage 
                    src={getAssetPath("images/projects/culturajoin.png")} 
                    alt="CulturaJoin"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    priority={true}
                  />
                  
                  {/* View Gallery Overlay Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white border-3 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 scale-75">
                          <Eye className="w-5 h-5 text-black" />
                          <span className="font-black uppercase tracking-wider text-sm">View</span>
                      </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                     <h3 className="text-2xl font-black leading-tight text-black line-clamp-1 uppercase tracking-tight">
                      CulturaJoin
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#FF6B6B] text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform rotate-2">Web Platform</span>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed text-gray-600 transition-all duration-500 ${
                      expandedCard === 'culturajoin' || isHovering === 'culturajoin' 
                        ? 'overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2' 
                        : 'line-clamp-3'
                    }`}>
                      {renderDescriptionWithLinks("At Uvexzon, I worked on a cultural and event management platform designed for locals, tourists, and planners. The platform supported invitation purchases and event hosting, improving accessibility for diverse users. All project content and rights belong to Uvexzon.")}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t-2 border-black border-dashed shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Design Unavailable
                      </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 5 - Motion Ink Branding */}
            <div className={`group h-full transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '1000ms' : '0ms'
            }}>
              <div 
                className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-[500px] ${
                  expandedCard === 'motion' ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                }`}
                onMouseEnter={() => setIsHovering('motion')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setExpandedCard(expandedCard === 'motion' ? null : 'motion')}
              >
                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">motion...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                  className={`relative w-full overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-[#FFDE59] transition-all duration-500 ease-in-out ${
                    isHovering === 'motion' ? 'h-[120px]' : 'h-[250px]'
                  }`}
                  onClick={() => openGallery('motion')}
                >
                  <OptimizedImage 
                    src={getAssetPath("images/projects/motion_1.png")} 
                    alt="Motion Ink Branding"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    priority={true}
                  />
                  
                  {/* View Gallery Overlay Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white border-3 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 scale-75">
                          <Eye className="w-5 h-5 text-black" />
                          <span className="font-black uppercase tracking-wider text-sm">View</span>
                      </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                     <h3 className="text-2xl font-black leading-tight text-black line-clamp-1 uppercase tracking-tight">
                      Motion Ink Branding
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFDE59] text-black px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform rotate-1">Branding</span>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed text-gray-600 transition-all duration-500 ${
                      expandedCard === 'motion' || isHovering === 'motion' 
                        ? 'overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2' 
                        : 'line-clamp-3'
                    }`}>
                      Creative branding solution for Motion Ink, incorporating dynamic visual elements to reflect the brand's identity and market position.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t-2 border-black border-dashed shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Design Only
                      </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 6 - Swish Strokes */}
            <div className={`group h-full transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '1200ms' : '0ms'
            }}>
              <div 
                className={`bg-white border-4 border-black rounded-[30px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[14px_14px_0_0_#000] transition-all duration-300 hover:-translate-y-2 flex flex-col h-[500px] ${
                  expandedCard === 'swish-strokes' ? 'transform scale-[1.02] z-10 relative ring-4 ring-[#007BFF] ring-offset-4' : ''
                }`}
                onMouseEnter={() => setIsHovering('swish-strokes')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setExpandedCard(expandedCard === 'swish-strokes' ? null : 'swish-strokes')}
              >
                  {/* Project Image Header */}
                  <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-black"></div>
                          <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                      </div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest">swish...exe</div>
                  </div>

                {/* Project Image */}
                <div 
                  className={`relative w-full overflow-hidden cursor-pointer border-b-4 border-black group-hover:bg-purple-400 transition-all duration-500 ease-in-out ${
                    isHovering === 'swish-strokes' ? 'h-[120px]' : 'h-[250px]'
                  }`}
                  onClick={() => openGallery('swish-strokes')}
                >
                  <OptimizedImage 
                    src={getAssetPath("images/projects/swishstrokes.png")} 
                    alt="Swish Strokes"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    priority={true}
                  />
                  
                  {/* View Gallery Overlay Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-white border-3 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 scale-75">
                          <Eye className="w-5 h-5 text-black" />
                          <span className="font-black uppercase tracking-wider text-sm">View</span>
                      </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6 sm:p-8 bg-white flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="flex items-start justify-between mb-4 gap-2 shrink-0">
                     <h3 className="text-2xl font-black leading-tight text-black line-clamp-1 uppercase tracking-tight">
                      Swish Strokes
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500 text-white px-2 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] min-w-fit transform rotate-1">App</span>
                  </div>
                  
                  <div className="relative flex-1 overflow-hidden">
                    <p className={`text-sm sm:text-base font-medium leading-relaxed text-gray-600 transition-all duration-500 ${
                      expandedCard === 'swish-strokes' || isHovering === 'swish-strokes' 
                        ? 'overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pr-2' 
                        : 'line-clamp-3'
                    }`}>
                      Collaborated with Uvexzon as a UX Designer on the Mandala Art Colouring & Music Relaxation Mobile App, focused on mindfulness and creativity. The app includes mandala colouring, relaxing music, tournaments, mood tracking, and motivational prompts. Also contributed to designing the landing page to enhance user engagement and brand presence. All project content and rights belong to Uvexzon.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t-2 border-black border-dashed shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                        Design Only
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Projects Button */}
          <div className={`text-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-1000 delay-1000 ${
            isVisible.projects 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <Link to="/projects">
              <Button
                variant="outline"
                className="border-black bg-white hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] lg:shadow-[4px_4px_0_0_#000] text-sm sm:text-[16px] font-medium px-6 sm:px-8 lg:px-[50px] py-3 sm:py-4 lg:py-[20px] rounded-none inline-flex items-center gap-2"
              >
                View All Projects
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-white h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Freelance CTA Banner - Redesigned */}
      <section className="bg-[#FFDE59] py-16 sm:py-28 relative z-10 overflow-hidden border-y-4 border-black">
        {/* Background Art Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-[0.03] pattern-grid-lg"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#FF6B6B] rounded-full border-4 border-black -z-0 hidden lg:block animate-bounce delay-700"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-[#007BFF] transform rotate-12 border-4 border-black -z-0 hidden lg:block animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-white border-3 border-black rounded-full -z-0 hidden sm:block"></div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
            {/* Left Column: Typography & CTA */}
            <div className={`text-left transition-all duration-1000 ${
              isVisible.projects ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold tracking-widest mb-6 transform -rotate-2 shadow-[4px_4px_0_0_#fff]">
                AVAILABLE FOR HIRE
              </div>
              
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black leading-[0.9] mb-8">
                NEED <span className="inline-block transform hover:scale-105 transition-transform text-[#007BFF] bg-white px-2 border-3 border-black shadow-[4px_4px_0_0_#000]">CUSTOM</span> <br/>
                DESIGN WORK?
              </h2>
              
              <p className="text-lg sm:text-xl font-bold text-black/80 mb-10 max-w-lg leading-relaxed border-l-4 border-black pl-6">
                From rapid prototypes to full-scale design systems. I help startups and founders ship <span className="bg-[#FF6B6B] text-white px-2 py-0.5 inline-block transform -rotate-1">world-class</span> products.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/freelance">
                  <Button className="h-14 px-8 text-lg font-black border-4 border-black bg-white text-black hover:bg-black hover:text-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 transition-all rounded-none w-full sm:w-auto">
                    VIEW SERVICES
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="h-14 px-8 text-lg font-black border-4 border-black bg-[#007BFF] text-white hover:bg-white hover:text-black shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 transition-all rounded-none w-full sm:w-auto">
                    GET A QUOTE
                    <MessageCircle className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Feature Cards Stack */}
            <div className={`relative grid gap-6 transition-all duration-1000 delay-300 ${
              isVisible.projects ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              
              {/* Card 1 */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all transform rotate-1 flex items-center gap-6 rounded-[20px] group cursor-default">
                <div className="w-16 h-16 bg-[#FF9F9F] border-3 border-black rounded-full flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-black" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black">LIGHTNING FAST</h3>
                  <p className="text-sm font-bold text-gray-600">First draft in 48 hours for most projects.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all transform -rotate-1 flex items-center gap-6 rounded-[20px] ml-0 lg:ml-12 group cursor-default">
                <div className="w-16 h-16 bg-[#B8C0FF] border-3 border-black rounded-full flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-black" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black">COLLABORATIVE</h3>
                  <p className="text-sm font-bold text-gray-600">Daily updates and transparent process.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 transition-all transform rotate-1 flex items-center gap-6 rounded-[20px] group cursor-default">
                <div className="w-16 h-16 bg-[#A0E7E5] border-3 border-black rounded-full flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#000] group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-black" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black">QUALITY FIRST</h3>
                  <p className="text-sm font-bold text-gray-600">Pixel-perfect designs ready for code.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-white h-2 sm:h-4 lg:h-8 relative z-20"></div>

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
                  {currentProject.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <span className="text-xs sm:text-sm text-black font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {currentImageIndex + 1}/{projectGalleries[currentProject as keyof typeof projectGalleries]?.length || 0}
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
              {projectGalleries[currentProject as keyof typeof projectGalleries] && (
                <img
                  src={projectGalleries[currentProject as keyof typeof projectGalleries][currentImageIndex]}
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
                {projectGalleries[currentProject as keyof typeof projectGalleries]?.map((image, index) => (
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

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I'm interested in your UI/UX design services. Can we discuss my project?"
      />
    </div>
  );
}
