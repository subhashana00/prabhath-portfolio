import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, MapPin, Calendar, Award, CheckCircle, Mail, Menu, X, FileText, Linkedin, Github, Code, Palette, GraduationCap, Building, Star, Briefcase, Download, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";
import { getAssetPath } from "@/lib/utils";
import { Footer, BehanceIcon } from "@/components/Footer";

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    experience: false,
    skills: false
  });

  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

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
      checkVisibility(experienceRef, 'experience');
      checkVisibility(skillsRef, 'skills');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  const { toast } = useToast();

  // CV Download Function - Reliable Anchor Tag Method
  const downloadCV = () => {
    const cvUrl = 'https://drive.google.com/file/d/1Qq3OMqzYpnMPj28L0cUf9joixUFPEfmg/view?usp=drive_link';
    
    try {
      // Show downloading toast with custom styling
      toast({
        title: "Initiating Download...",
        description: (
          <div className="flex items-center gap-3 p-2">
            <div className="w-6 h-6 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[14px] tracking-[1.23px] font-medium">Preparing your CV download</span>
          </div>
        ),
        duration: 2000,
        className: "border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] bg-white",
      });

      // Create temporary anchor element for download
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Prabhath_Subhashana_CV.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success toast with custom styling
      setTimeout(() => {
        toast({
          title: "Download Started!",
          description: (
            <div className="flex items-center gap-3 p-2">
              <div className="w-6 h-6 bg-green-500 border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-[14px] tracking-[1.23px] font-medium">CV download has been initiated successfully</span>
            </div>
          ),
          duration: 4000,
          className: "border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] bg-[#FCF9F8]",
        });
      }, 1000);

    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: (
          <div className="flex items-center gap-3 p-2">
            <div className="w-6 h-6 bg-red-500 border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000]">
              <X className="w-4 h-4 text-white" />
            </div>
            <span className="text-[14px] tracking-[1.23px] font-medium">Sorry, there was an error starting the download. Please try again or contact support.</span>
          </div>
        ),
        variant: "destructive",
        duration: 5000,
        className: "border-2 border-red-500 rounded-[12px] shadow-[4px_4px_0_0_#ff0000] bg-red-50",
      });
    }
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
              className="text-white text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-black bg-[#007BFF] shadow-[3px_3px_0_0_#000000] -translate-x-0.5 -translate-y-0.5 transition-all duration-300"
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
                className="text-[#007BFF] text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] transition-all duration-300"
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
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="About Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">About</span>
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

      {/* Hero Section */}
      <section ref={heroRef} className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20">
        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Main About Card - Art Board Style */}
            <div className="relative bg-white border-4 border-black rounded-[30px] shadow-[10px_10px_0_0_#000] overflow-hidden mb-8 lg:mb-12">
              {/* Board Header / Window Controls */}
              <div className="absolute top-0 left-0 w-full h-12 border-b-4 border-black bg-gray-100 flex items-center px-4 gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-black hover:bg-red-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black hover:bg-yellow-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-black hover:bg-green-500 transition-colors"></div>
                <div className="ml-4 text-xs font-bold font-sans text-gray-500 uppercase tracking-widest hidden sm:block">ABOUT_ME.ME</div>
                <div className="ml-auto flex gap-2">
                   <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
                   <div className="w-4 h-4 border-2 border-gray-400 rounded-sm"></div>
                </div>
              </div>

               {/* Grid Background */}
              <div className="absolute inset-0 top-12 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

              <div className="grid lg:grid-cols-2 gap-0 pt-12 relative z-10">
                
                {/* Left side - Content */}
                <div className="p-6 md:p-10 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-bold border-2 border-transparent shadow-[4px_4px_0_0_#007BFF] mb-6">
                        <GraduationCap className="w-4 h-4 text-[#007BFF]" />
                        SOFTWARE ENGINEERING STUDENT
                      </div>
                      
                      <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-none text-black mb-6 tracking-tight">
                        ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-blue-600">ME</span>
                      </h1>
                    </div>

                    <p className="text-[16px] leading-[28px] text-gray-700 max-w-lg font-medium">
                      I'm Prabhath Subhashana, a BSc Software Engineering undergraduate and UI/UX Designer passionate about creating engaging, user-centered digital experiences. With over 2 years of hands-on experience in design and development, I specialize in transforming complex problems into intuitive, beautiful solutions that bridge the gap between aesthetics and functionality.
                    </p>

                    <div className="space-y-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#007BFF]/10 flex items-center justify-center border border-[#007BFF]">
                           <MapPin className="w-4 h-4 text-[#007BFF]" />
                        </div>
                        <span className="text-[14px] text-black">Gampaha, Western Province, Sri Lanka</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#007BFF]/10 flex items-center justify-center border border-[#007BFF]">
                           <Calendar className="w-4 h-4 text-[#007BFF]" />
                        </div>
                        <span className="text-[14px] text-black">Expected graduation: August 2027</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-[#007BFF]/10 flex items-center justify-center border border-[#007BFF]">
                           <Building className="w-4 h-4 text-[#007BFF]" />
                        </div>
                        <span className="text-[14px] text-black">ICBT Campus (Cardiff Metropolitan University)</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        onClick={downloadCV}
                        className="border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] text-[16px] font-bold px-[32px] py-[24px] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#007BFF] w-full sm:w-auto"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download CV
                      </Button>
                      <Link to="/contact">
                        <Button
                          className="border-2 border-black bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] shadow-[4px_4px_0_0_#000] text-[16px] font-bold px-[32px] py-[24px] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000000] w-full sm:w-auto"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Let's Connect
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right side - Profile Image & Stats */}
                <div className="relative p-6 md:p-10 lg:p-16 flex items-center justify-center bg-gray-50 border-l-0 lg:border-l-4 border-black">
                  
                  <div className="relative w-full max-w-md">
                    {/* Main profile image container - Window Style */}
                    <div className="relative w-full aspect-square mx-auto mb-8">
                       <div className="w-full h-full border-2 border-black rounded-xl overflow-hidden shadow-[8px_8px_0_0_#000] bg-white flex flex-col">
                        {/* Window Header */}
                        <div className="h-8 border-b-2 border-black bg-gray-100 flex items-center px-3 gap-1.5 shrink-0">
                          <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
                          <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
                          <div className="ml-auto text-[10px] font-sans font-semibold text-gray-500">profile.png</div>
                        </div>
                        
                        {/* Image Content */}
                        <div className="relative flex-1 bg-white p-0 overflow-hidden group">
                          <img
                            src={getAssetPath("images/profile/aa.png")}
                            alt="Prabhath Subhashana"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-gray-50">
                                  <div class="text-center">
                                    <div class="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                      <span class="text-white text-2xl font-bold">PS</span>
                                    </div>
                                    <h3 class="text-lg font-bold text-black">Image N/A</h3>
                                  </div>
                                </div>
                              `;
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats cards below profile image */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] p-4 group hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-[#007BFF] rounded-lg border-2 border-black flex items-center justify-center mx-auto mb-2 text-white font-bold group-hover:bg-black transition-colors">2+</div>
                          <p className="text-xs font-bold text-black uppercase tracking-wide">Years Exp.</p>
                        </div>
                      </div>
                      
                      <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] p-4 group hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-center">
                           <div className="w-10 h-10 bg-[#007BFF] rounded-lg border-2 border-black flex items-center justify-center mx-auto mb-2 text-white font-bold group-hover:bg-black transition-colors">10+</div>
                          <p className="text-xs font-bold text-black uppercase tracking-wide">Projects</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center mb-12">
              <p className="text-sm text-gray-600 mb-6 tracking-[1.23px]">Connect with me</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://behance.net/prabathsubasha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Behance Portfolio"
                >
                  <BehanceIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/subhashana00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:prabathsubashana18@gmail.com"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section ref={experienceRef} className="bg-white py-12 sm:py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-black leading-none text-black mb-4 uppercase tracking-tight">
                Journey & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-blue-600">Experience</span>
              </h2>
              <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest">CAREER_PATH.LOG</div>
            </div>

            {/* Main Experience Cards */}
            <div className="space-y-8 mb-12">
              
              {/* Current Education - Featured Window */}
              <div className="bg-[#FCF9F8] border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] overflow-hidden group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                {/* Window Header */}
                <div className="h-10 border-b-2 border-black bg-gray-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
                    <div className="ml-auto text-xs font-mono font-bold text-gray-500">EDUCATION.CERT</div>
                </div>

                <div className="p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                  <div className="w-20 h-20 bg-[#007BFF] border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-black mb-1 uppercase">BSc (Hons) Software Engineering</h3>
                        <p className="text-base font-medium text-gray-700">ICBT Campus (Cardiff Metropolitan University)</p>
                      </div>
                      <div className="flex items-center gap-3 mt-3 sm:mt-0">
                        <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">IN PROGRESS</span>
                        <span className="text-sm font-bold text-gray-600">2024 - 2027</span>
                      </div>
                    </div>
                    
                    {/* Retro Progress Bar */}
                    <div className="space-y-2 mb-4">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                          <span>Completion Status</span>
                          <span className="text-[#007BFF]">75%</span>
                       </div>
                       <div className="w-full h-6 border-2 border-black rounded-full p-1 bg-white">
                          <div className="h-full bg-[#007BFF] rounded-full border border-black w-3/4 relative overflow-hidden">
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem]"></div>
                          </div>
                       </div>
                    </div>
                    <p className="text-sm font-mono text-gray-500">// Expected graduation: August 2027</p>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Recent Work - Job File */}
                <div className="bg-white border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] overflow-hidden group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                  <div className="h-8 border-b-2 border-black bg-purple-50 flex items-center px-3 justify-between">
                     <div className="text-[10px] font-bold font-mono">WORK_LOG_01.TXT</div>
                     <div className="flex gap-1">
                        <div className="w-2 h-2 border border-black bg-white"></div>
                        <div className="w-2 h-2 border border-black bg-white"></div>
                     </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-purple-500 border-2 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                        <Code className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-black uppercase">UI/UX Designer (Intern)</h3>
                        <p className="text-sm text-purple-600 font-bold bg-purple-100 px-2 py-0.5 rounded border border-purple-200 inline-block mt-1">May 2025 - Aug 2025</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="font-bold text-black border-b-2 border-gray-100 pb-2 mb-3">Uvexzon – Remote</p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm font-medium text-gray-700">
                          <span className="text-purple-500 font-black mt-0.5">{`>`}</span>
                          <span>Designed Swish Strokes mobile app & landing page</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm font-medium text-gray-700">
                          <span className="text-purple-500 font-black mt-0.5">{`>`}</span>
                          <span>Created CulturaJoin event management platform</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm font-medium text-gray-700">
                          <span className="text-purple-500 font-black mt-0.5">{`>`}</span>
                          <span>Led complete Uvexzon website redesign</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Previous Work - Job File */}
                <div className="bg-white border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] overflow-hidden group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                  <div className="h-8 border-b-2 border-black bg-orange-50 flex items-center px-3 justify-between">
                     <div className="text-[10px] font-bold font-mono">WORK_LOG_02.TXT</div>
                     <div className="flex gap-1">
                        <div className="w-2 h-2 border border-black bg-white"></div>
                        <div className="w-2 h-2 border border-black bg-white"></div>
                     </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-orange-500 border-2 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                        <Building className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-black uppercase leading-tight">Pharmacy Regulatory & IT Assistant</h3>
                        <p className="text-sm text-orange-600 font-bold bg-orange-100 px-2 py-0.5 rounded border border-orange-200 inline-block mt-1">Aug 2022 - Dec 2024</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="font-bold text-black border-b-2 border-gray-100 pb-2 mb-3">Pharma Associates – Colombo-14</p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm font-medium text-gray-700">
                          <span className="text-orange-500 font-black mt-0.5">{`>`}</span>
                          <span>Assisted NMRA with drug licensing & approval processes</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm font-medium text-gray-700">
                          <span className="text-orange-500 font-black mt-0.5">{`>`}</span>
                          <span>Streamlined workflows through IT solutions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Foundation - History File */}
              <div className="bg-white border-2 border-black rounded-xl shadow-[6px_6px_0_0_#000] overflow-hidden group hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                 <div className="h-8 border-b-2 border-black bg-green-50 flex items-center px-3 justify-between">
                     <div className="text-[10px] font-bold font-mono">HISTORY.ARC</div>
                     <div className="flex gap-1">
                        <div className="w-2 h-2 border border-black bg-white"></div>
                     </div>
                  </div>
                <div className="p-6 md:p-8 flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-500 border-2 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#000]">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black text-black mb-1 uppercase">St. Peter's College, Colombo – 4</h3>
                        <p className="text-sm font-medium text-gray-700">Secondary Education</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 sm:mt-0">
                        <span className="bg-green-100 text-green-700 border border-green-200 text-xs font-bold px-2 py-1 rounded">COMPLETED</span>
                        <span className="text-sm font-bold text-gray-500">2014 - 2019</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats - Widgets */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-[#007BFF] mb-2 leading-none">2+</div>
                <div className="text-[11px] font-bold text-black uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded">Years Exp.</div>
              </div>
              <div className="text-center bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-purple-500 mb-2 leading-none">10+</div>
                <div className="text-[11px] font-bold text-black uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded">Projects</div>
              </div>
              <div className="text-center bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-green-500 mb-2 leading-none">2</div>
                <div className="text-[11px] font-bold text-black uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded">Industries</div>
              </div>
              <div className="text-center bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-2 leading-none">75%</div>
                <div className="text-[11px] font-bold text-black uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded">Progress</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        
        <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-3 bg-white border-2 border-black rounded-lg px-6 py-3 shadow-[4px_4px_0_0_#000] mb-8 transform hover:scale-105 transition-transform duration-300">
                <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                <span className="text-sm font-black tracking-widest text-black uppercase">Technical Inventory</span>
                <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-black leading-none text-black mb-6 uppercase">
                Skills & <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Expertise</span>
              </h2>
            </div>

            {/* Main Skills Grid - Toolbox Style */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              
              {/* Design Tools Box */}
              <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0_0_#000] overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-50 border-b-2 border-black p-3 flex justify-between items-center">
                   <span className="font-mono text-xs font-bold text-gray-500">TOOLBOX_01</span>
                   <Palette className="w-4 h-4 text-gray-500" />
                </div>
                <div className="p-6 lg:p-8 relative">
                   {/* Background Decor */}
                   <div className="absolute right-[-20px] bottom-[-20px] text-gray-50 opacity-50">
                      <Palette size={120} strokeWidth={1} />
                   </div>
                   
                   <div className="relative z-10">
                    <h3 className="text-2xl font-black text-black mb-1 uppercase">Design Tools</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b-2 border-black pb-2 inline-block">Visual Creation</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink-500 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">Fi</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">Figma & FigJam</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">PROTOTYPING</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">Ai</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">Figma AI & Make</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">AUTOMATION</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">Ps</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">Adobe Creative Suite</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">GRAPHICS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frontend Box */}
              <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0_0_#000] overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-50 border-b-2 border-black p-3 flex justify-between items-center">
                   <span className="font-mono text-xs font-bold text-gray-500">TOOLBOX_02</span>
                   <Code className="w-4 h-4 text-gray-500" />
                </div>
                <div className="p-6 lg:p-8 relative">
                   <div className="absolute right-[-20px] bottom-[-20px] text-gray-50 opacity-50">
                      <Code size={120} strokeWidth={1} />
                   </div>
                   
                   <div className="relative z-10">
                    <h3 className="text-2xl font-black text-black mb-1 uppercase">Frontend</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b-2 border-black pb-2 inline-block">Client-Side</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">{`</>`}</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">HTML & CSS</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">STRUCTURE</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-400 rounded border border-black flex items-center justify-center font-bold text-black shadow-sm">JS</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">JavaScript</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">LOGIC</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-cyan-400 rounded border border-black flex items-center justify-center font-bold text-black shadow-sm">Re</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">React & TypeScript</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">FRAMEWORKS</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend Box */}
              <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0_0_#000] overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="bg-gray-50 border-b-2 border-black p-3 flex justify-between items-center">
                   <span className="font-mono text-xs font-bold text-gray-500">TOOLBOX_03</span>
                   <CheckCircle className="w-4 h-4 text-gray-500" />
                </div>
                <div className="p-6 lg:p-8 relative">
                   <div className="absolute right-[-20px] bottom-[-20px] text-gray-50 opacity-50">
                      <CheckCircle size={120} strokeWidth={1} />
                   </div>
                   
                   <div className="relative z-10">
                    <h3 className="text-2xl font-black text-black mb-1 uppercase">Backend</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b-2 border-black pb-2 inline-block">Server-Side</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">No</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">Node.js & Express</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">RUNTIME</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-600 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">Py</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">Python & Java</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">LANGUAGES</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded border border-black flex items-center justify-center font-bold text-white shadow-sm">SQL</div>
                          <div>
                            <h4 className="text-sm font-bold text-black leading-none">SQL & .NET MVC</h4>
                            <p className="text-[10px] uppercase font-bold text-gray-500 mt-1">DATABASE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Proficiency Section - System Status Style */}
            <div className="bg-white border-2 border-black rounded-xl shadow-[8px_8px_0_0_#000] overflow-hidden mb-12 group hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 transition-all duration-300">
               <div className="h-10 border-b-2 border-black bg-gray-900 flex items-center px-4 justify-between">
                   <div className="text-xs font-bold font-mono text-green-400 animate-pulse">SYSTEM_STATUS: ONLINE</div>
                   <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                   </div>
               </div>
              <div className="p-6 md:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-black mb-2 uppercase flex items-center justify-center gap-2">
                    <Star className="w-6 h-6 text-black fill-yellow-400" />
                    Proficiency Metrics
                    <Star className="w-6 h-6 text-black fill-yellow-400" />
                  </h3>
                  <p className="text-sm font-medium text-gray-600">Live capability assessment</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-black border-2 border-white outline outline-2 outline-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0_0_#808080]">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20"></div>
                    <Palette className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <h4 className="text-lg font-black text-black mb-3 uppercase tracking-wide">UI/UX Design</h4>
                  <div className="w-full bg-gray-200 border-2 border-black rounded-lg h-4 mb-2 p-0.5">
                    <div className="bg-[#007BFF] h-full rounded transition-all duration-1000 relative overflow-hidden" style={{ width: '90%' }}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Status</span>
                     <span className="text-xs text-[#007BFF] font-black">90% EXPERT</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-black border-2 border-white outline outline-2 outline-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0_0_#808080]">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20"></div>
                    <Code className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <h4 className="text-lg font-black text-black mb-3 uppercase tracking-wide">Frontend Dev</h4>
                  <div className="w-full bg-gray-200 border-2 border-black rounded-lg h-4 mb-2 p-0.5">
                    <div className="bg-purple-500 h-full rounded transition-all duration-1000 relative overflow-hidden" style={{ width: '65%' }}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Status</span>
                     <span className="text-xs text-purple-600 font-black">65% ADVANCED</span>
                  </div>
                </div>
                
                <div className="text-center md:col-span-2 lg:col-span-1">
                  <div className="w-20 h-20 bg-black border-2 border-white outline outline-2 outline-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0_0_#808080]">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20"></div>
                    <CheckCircle className="w-10 h-10 text-white relative z-10" />
                  </div>
                  <h4 className="text-lg font-black text-black mb-3 uppercase tracking-wide">Backend Dev</h4>
                  <div className="w-full bg-gray-200 border-2 border-black rounded-lg h-4 mb-2 p-0.5">
                    <div className="bg-green-500 h-full rounded transition-all duration-1000 relative overflow-hidden" style={{ width: '45%' }}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Status</span>
                     <span className="text-xs text-green-600 font-black">45% INTERMEDIATE</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* CTA Buttons */}
            <div className="text-center mt-16 lg:mt-24">
               <div className="relative inline-block p-8 bg-white border-2 border-black rounded-xl shadow-[8px_8px_0_0_#000]">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#007BFF] text-white px-4 py-1 border-2 border-black text-xs font-black uppercase tracking-widest rounded-full">
                     Ready to Deploy?
                  </div>
                  <h3 className="text-2xl font-black text-black mb-6 uppercase">Initialize Collaboration</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/projects">
                      <Button
                        variant="outline"
                        className="bg-white text-black border-2 border-black shadow-[4px_4px_0_0_#000] text-base font-black uppercase tracking-wide px-8 py-6 rounded-lg hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                      >
                        Scanner.exe (Projects)
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button
                        variant="outline"
                        className="bg-[#007BFF] text-white border-2 border-black shadow-[4px_4px_0_0_#000] text-base font-black uppercase tracking-wide px-8 py-6 rounded-lg hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all hover:bg-[#0069d9]"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Send Transmission
                      </Button>
                    </Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I saw your about page and would like to discuss working together on a project."
      />
    </div>
  );
}
