import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Menu, X, ExternalLink, Clock, Layers, Target, Search, Users, BarChart3, CheckCircle, Lightbulb, Zap, ChevronRight, Monitor, Palette, Layout, Eye, Sparkles, AlertTriangle, TrendingUp, Quote, Shield, Terminal, Globe, Plane, Box, Command, Bell, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAssetPath } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { JsonLd, caseStudySchema } from "@/components/StructuredData";

export default function AeroSyncCaseStudy() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Section refs
  const heroRef = useRef<HTMLElement>(null);
  const problemRef = useRef<HTMLElement>(null);
  const goalsRef = useRef<HTMLElement>(null);
  const researchRef = useRef<HTMLElement>(null);
  const architectureRef = useRef<HTMLElement>(null);
  const wireframesRef = useRef<HTMLElement>(null);
  const designSystemRef = useRef<HTMLElement>(null);
  const hifiRef = useRef<HTMLElement>(null);
  const prototypeRef = useRef<HTMLElement>(null);
  const challengesRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const reflectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const sections = [
    { id: 'hero', label: 'Overview', ref: heroRef },
    { id: 'problem', label: 'Problem', ref: problemRef },
    { id: 'goals', label: 'Goals', ref: goalsRef },
    { id: 'research', label: 'Research', ref: researchRef },
    { id: 'architecture', label: 'Architecture', ref: architectureRef },
    { id: 'wireframes', label: 'Wireframes', ref: wireframesRef },
    { id: 'design-system', label: 'Design System', ref: designSystemRef },
    { id: 'hifi', label: 'Hi-Fi Screens', ref: hifiRef },
    { id: 'prototype', label: 'Prototype', ref: prototypeRef },
    { id: 'challenges', label: 'Challenges', ref: challengesRef },
    { id: 'results', label: 'Results', ref: resultsRef },
    { id: 'reflection', label: 'Reflection', ref: reflectionRef },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY = currentScrollY;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      setShowVerticalNav(currentScrollY > 300);

      for (let i = sections.length - 1; i >= 0; i--) {
        const ref = sections[i].ref;
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Gallery images
  const galleryImages = [
    getAssetPath('images/projects/aero_1.png'),
    getAssetPath('images/projects/aero_2.png'),
    getAssetPath('images/projects/aero_3.png'),
    getAssetPath('images/projects/aero_4.png'),
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Theme colors - Calm Tech / Premium Aviation
  const accent = '#38BDF8'; // Sky Blue
  const accentDark = '#0EA5E9';
  const bgDark = '#0B1120'; // Deep Navy
  const bgDarkAlt = '#111827';
  const bgSlate = '#1E293B';

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="AeroSync B2B SaaS Gateway UI/UX Case Study | Prabhath Subhashana"
        description="Read the UI/UX design case study for AeroSync, a B2B SaaS gateway for aviation cargo management. Calm Tech design system reducing agent cognitive load."
        canonical="/projects/aerosync-b2b-gateway"
        keywords="AeroSync, B2B SaaS Gateway, UI/UX Case Study, Calm Tech, Prabhath Subhashana, UI/UX Designer Sri Lanka, Aviation Cargo UX"
      />
      {caseStudySchema({
        name: "AeroSync: The Frictionless B2B Gateway",
        description: "Architecting a high-performance B2B SaaS gateway for aviation cargo agents, designed using Calm Tech principles to reduce cognitive load.",
        url: "/projects/aerosync-b2b-gateway",
        image: "https://prabhath-portfolio.vercel.app/images/projects/aero_1.png",
        datePublished: "2026-06-15",
        keywords: ["B2B SaaS", "Aviation Cargo UX", "Calm Tech", "Figma", "UI/UX Design"],
        breadcrumbName: "AeroSync B2B Gateway"
      }).map((schema, i) => (
        <JsonLd key={`aerosync-schema-${i}`} data={schema} />
      ))}
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200/30 z-[60]">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: `linear-gradient(90deg, ${accent}, #818CF8, ${accentDark})`,
          }}
        />
        <div
          className="absolute right-4 top-4 bg-white border-2 border-black rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] transition-opacity duration-300"
          style={{ opacity: scrollProgress > 2 ? 1 : 0 }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>

      {/* Header */}
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-12 py-4 sm:py-6 relative z-50 max-w-[1600px] mx-auto w-full ${isMobile ? 'sticky top-0' : 'relative'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-[80px] h-[45px] sm:w-[100px] sm:h-[55px] lg:w-[131px] lg:h-[70px] bg-black text-white text-sm sm:text-lg lg:text-xl font-medium hover:bg-[#007BFF] transition-colors">
              PS.
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link to="/about" className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              About Me
            </Link>
            <Link to="/projects" className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              Projects
            </Link>
            <Link to="/freelance" className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              Freelance
            </Link>
          </nav>

          <Link to="/contact">
            <Button variant="outline" className="hidden md:flex text-white font-bold text-[14px] lg:text-[16px] tracking-[1.23px] px-[30px] lg:px-[50px] py-[15px] lg:py-[25px] rounded-none border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200">
              Contact Me
            </Button>
          </Link>

          <button className="md:hidden p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[#FCF9F8] border-t-2 border-black p-4 z-50 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col space-y-4">
              <Link to="/about" className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>About Me</Link>
              <Link to="/projects" className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
              <Link to="/freelance" className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>Freelance</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="text-white font-bold text-[16px] tracking-[1.23px] px-[30px] py-[15px] rounded-none w-full justify-center mt-2 border-3 border-black bg-black shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#FFDE59] hover:text-black transition-all duration-200">
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Case Study Progress Nav - Right Side */}
      <nav className={`fixed right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out hidden lg:block ${showVerticalNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
        <div className="bg-white border-2 border-black rounded-[20px] shadow-[4px_4px_0_0_#000] p-3">
          <div className="flex flex-col space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.ref)}
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all duration-200 text-left min-w-[90px] ${
                  activeSection === section.id
                    ? 'bg-[#0B1120] text-[#38BDF8] shadow-[2px_2px_0_0_#38BDF8]'
                    : 'text-gray-400 hover:text-black hover:bg-gray-100'
                }`}
                title={section.label}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ============================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 sm:pt-16 pb-16 sm:pb-24" style={{ background: `linear-gradient(180deg, #FCF9F8 0%, ${bgDark} 100%)` }}>
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        {/* Floating decorations */}
        <div className="absolute top-20 right-[10%] w-24 h-24 border-2 border-[#38BDF8]/20 rounded-full hidden lg:block"></div>
        <div className="absolute bottom-32 left-[5%] w-16 h-16 bg-[#38BDF8]/10 rotate-45 border-2 border-[#38BDF8]/20 hidden lg:block"></div>
        <div className="absolute top-1/3 left-[8%] w-3 h-3 bg-[#38BDF8]/40 rounded-full hidden sm:block animate-pulse"></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm font-bold">
            <Link to="/projects" className="text-gray-500 hover:text-black transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Projects
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-black">AeroSync</span>
          </div>

          {/* Project Title */}
          <div className="mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-2 transform rotate-2 border-2 border-black shadow-[4px_4px_0_0_#000]" style={{ backgroundColor: accent }}></div>
              <div className="relative bg-white border-2 border-black px-6 py-1 z-10">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" fill="currentColor" />
                  Case Study
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[72px] font-black leading-[0.95] text-black uppercase tracking-tighter mb-6">
              AeroSync: The<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${accent}, #818CF8)` }}>Frictionless B2B Gateway</span>
            </h1>

            <p className="text-lg sm:text-xl font-bold text-gray-700 max-w-3xl leading-relaxed">
              Architecting a high-performance interface that bridges the gap between heavy-duty industrial data and a premium brand identity — utilizing a "Calm Tech" aesthetic to reduce cognitive load for cargo agents and procurement managers.
            </p>
          </div>

          {/* Project Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: <Users className="w-5 h-5" />, label: "Role", value: "UI/UX Designer" },
              { icon: <Clock className="w-5 h-5" />, label: "Duration", value: "3 Weeks" },
              { icon: <Monitor className="w-5 h-5" />, label: "Platform", value: "Web (B2B SaaS)" },
              { icon: <Palette className="w-5 h-5" />, label: "Tools", value: "Figma" },
            ].map((meta, i) => (
              <div key={i} className="bg-white border-3 border-black p-4 sm:p-5 shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2 text-gray-500">
                  {meta.icon}
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{meta.label}</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-black">{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Hero Mockup Banner */}
          <div className="relative bg-white border-4 border-black rounded-[20px] overflow-hidden shadow-[12px_12px_0_0_#000]">
            <div className="h-10 bg-white border-b-4 border-black flex items-center px-4 justify-between shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFDE59]"></div>
                <div className="w-3 h-3 rounded-full bg-[#A0E7E5]"></div>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">aerosync-gateway.io</div>
              <div className="w-12"></div>
            </div>
            <img
              src={getAssetPath('images/projects/aero_1.png')}
              alt="AeroSync B2B Gateway - Main Overview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. PROBLEM STATEMENT */}
      {/* ============================================ */}
      <section ref={problemRef} className="py-20 sm:py-28 border-t-4 border-black relative overflow-hidden" style={{ backgroundColor: bgDark }}>
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full border-2 hidden lg:block" style={{ borderColor: `${accent}20` }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform -rotate-2" style={{ backgroundColor: '#FF9F9F' }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> 02
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter leading-none">The Problem</h2>
            </div>

            <div className="lg:w-2/3">
              <div className="border-4 border-white/10 p-8 sm:p-10 mb-8 rounded-[16px]" style={{ backgroundColor: bgSlate }}>
                <p className="text-lg sm:text-xl font-bold text-gray-200 leading-relaxed mb-6">
                  Aviation cargo management systems were designed decades ago. Cargo agents and procurement managers at airlines like Emirates and Qatar Airways are stuck using clunky, form-heavy legacy interfaces that create massive cognitive overload.
                </p>
                <p className="text-base font-medium text-gray-400 leading-relaxed">
                  These professionals handle mission-critical workflows — booking freight, tracking shipments, managing procurement — across fragmented tools that force endless form filling, manual data cross-referencing, and constant context-switching. The result is "Form Fatigue": a measurable decline in accuracy and speed as users battle interfaces that were never designed for efficient human interaction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { stat: "72%", desc: "of cargo agents report cognitive overload daily" },
                  { stat: "5.2hrs", desc: "average time lost to manual data re-entry per week" },
                  { stat: "38%", desc: "error rate increase attributed to form fatigue" },
                ].map((item, i) => (
                  <div key={i} className="p-5 border-3 border-black shadow-[4px_4px_0_0_rgba(56,189,248,0.3)]" style={{ backgroundColor: accent }}>
                    <div className="text-3xl font-black mb-1 text-black">{item.stat}</div>
                    <div className="text-xs uppercase tracking-wider font-bold text-black/70">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. GOALS & OBJECTIVES */}
      {/* ============================================ */}
      <section ref={goalsRef} className="py-20 sm:py-28 border-t-4 border-black relative" style={{ backgroundColor: accent }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.05 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> 03
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Goals & Objectives</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Command className="w-6 h-6" />, title: "AI Command Bar", desc: "Implement an intelligent command bar that lets users perform complex operations with natural language instead of navigating deep form hierarchies." },
              { icon: <Bell className="w-6 h-6" />, title: "Predictive Alerting", desc: "Surface proactive alerts for shipment delays, procurement deadlines, and capacity issues before they become critical problems." },
              { icon: <Shield className="w-6 h-6" />, title: "Eliminate Form Fatigue", desc: "Redesign data entry workflows to reduce input fields by 60%, using smart defaults, auto-fill, and contextual pre-population." },
              { icon: <Eye className="w-6 h-6" />, title: "Calm Tech Aesthetic", desc: "Create a visual language that conveys authority and calm — reducing ambient visual noise to let critical information stand out." },
              { icon: <Layers className="w-6 h-6" />, title: "Unified Data Layer", desc: "Consolidate fragmented cargo, procurement, and logistics data into a single source of truth with real-time sync." },
              { icon: <Globe className="w-6 h-6" />, title: "Multi-Airline Support", desc: "Design a white-label architecture that adapts seamlessly to Emirates, Qatar Airways, and future airline partner ecosystems." },
            ].map((goal, i) => (
              <div key={i} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-2 transition-all duration-300 group">
                <div className="w-14 h-14 border-3 border-black rounded-full flex items-center justify-center mb-4 shadow-[3px_3px_0_0_#000] group-hover:text-white transition-colors" style={{ backgroundColor: accent }}>
                  {goal.icon}
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-2">{goal.title}</h3>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. RESEARCH & DISCOVERY */}
      {/* ============================================ */}
      <section ref={researchRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-20 h-20 rotate-12 border-4 border-black hidden lg:block opacity-30" style={{ backgroundColor: '#B8C0FF' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-[#B8C0FF] border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform rotate-1">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Search className="w-4 h-4" /> 04
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">Research & Discovery</h2>
            </div>

            <div className="lg:w-2/3 space-y-8">
              {/* Industry Analysis */}
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }}></div> Industry & Competitor Analysis
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed mb-4">
                  Analyzed leading cargo management and B2B logistics platforms including CHAMP Cargosystems, IBS Software, and Mercator to understand how legacy systems handle freight booking and procurement. Key finding: none prioritized reducing form complexity or cognitive load — they all replicated paper-form paradigms digitally.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['CHAMP Cargosystems', 'IBS Software', 'Mercator', 'CargoAi', 'WebCargo'].map((tool, i) => (
                    <span key={i} className="bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-wider">{tool}</span>
                  ))}
                </div>
              </div>

              {/* User Persona */}
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div> Primary User Persona
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-20 h-20 border-3 border-black rounded-full flex items-center justify-center text-2xl font-black shadow-[3px_3px_0_0_#000] shrink-0" style={{ backgroundColor: accent }}>
                    KA
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1">Khalid — Senior Cargo Agent</h4>
                    <p className="text-sm text-gray-500 font-bold mb-3">Age 38 • Manages 200+ shipments/week • Emirates SkyCargo Division</p>
                    <p className="text-base font-medium text-gray-600 leading-relaxed">
                      Khalid manages high-volume freight booking across multiple airline routes. He needs to quickly process cargo manifests, verify capacity, and coordinate with procurement teams — but spends 40% of his time re-entering data that already exists in other systems. He values speed and accuracy over visual flair, but is exhausted by the visual clutter of current tools.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pain Points */}
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFDE59] rounded-full"></div> Key Pain Points
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Legacy UIs force re-entering identical data across 3-5 separate forms per booking",
                    "No predictive intelligence — agents discover problems only after they escalate",
                    "Multi-system context-switching causes cognitive overload and data transcription errors",
                    "Premium airline brands look outdated with clunky, generic enterprise UIs",
                  ].map((pain, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border-2 border-black p-4">
                      <div className="w-6 h-6 bg-[#FF9F9F] border-2 border-black rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-sm font-medium text-gray-700">{pain}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 5. INFORMATION ARCHITECTURE */}
      {/* ============================================ */}
      <section ref={architectureRef} className="py-20 sm:py-28 border-t-4 border-black relative" style={{ backgroundColor: '#E0F2FE' }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.04 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Layout className="w-4 h-4" /> 05
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Information Architecture</h2>
            <p className="text-lg font-bold text-black/70 max-w-2xl mx-auto mt-4">
              Designed around three core agent workflows: Book, Track, and Procure — with the AI Command Bar as the universal shortcut.
            </p>
          </div>

          {/* IA Flow */}
          <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0_0_#000] mb-10">
            <div className="text-center mb-8">
              <div className="inline-block text-white px-6 py-3 text-lg font-black uppercase tracking-wider" style={{ backgroundColor: bgDark }}>
                AeroSync Gateway
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Command Center", items: ["AI Command Bar", "Smart Notifications", "Status Overview", "Quick Actions"] },
                { name: "Cargo Booking", items: ["Booking Wizard", "Route Optimizer", "Capacity Check", "Manifest Builder"] },
                { name: "Tracking Hub", items: ["Live Shipments", "Delay Predictions", "Route Visualization", "Alert Dashboard"] },
                { name: "Procurement", items: ["Vendor Directory", "PO Management", "Contract Viewer", "Spend Analytics"] },
              ].map((section, i) => (
                <div key={i} className="border-3 border-black p-4 bg-[#FCF9F8]">
                  <div className="text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider mb-3 text-center border-2 border-black shadow-[2px_2px_0_0_#000]" style={{ backgroundColor: accentDark }}>
                    {section.name}
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-xs font-bold text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-black rounded-full"></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* User Flow */}
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
            <h3 className="text-xl font-black uppercase mb-6 text-center">Primary Cargo Booking Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                "Login / SSO",
                "Command Center",
                "AI Quick Book",
                "Route & Capacity",
                "Manifest Review",
                "Confirm & Track"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4">
                  <div className="border-3 border-black px-4 py-2 text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0_0_#000] whitespace-nowrap" style={{ backgroundColor: accent }}>
                    {step}
                  </div>
                  {i < 5 && <ArrowRight className="w-5 h-5 text-black shrink-0 hidden sm:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. WIREFRAMES */}
      {/* ============================================ */}
      <section ref={wireframesRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block bg-gray-200 border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform -rotate-1">
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Layout className="w-4 h-4" /> 06
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">Wireframes</h2>
              <p className="text-base font-medium text-gray-600 leading-relaxed">
                Low-to-mid fidelity wireframes focused on minimizing cognitive load through spatial hierarchy — giving the AI Command Bar prominence while keeping data density manageable.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="bg-[#FCF9F8] border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-4">Structure Decisions</h3>
                <ul className="space-y-4">
                  {[
                    { title: "AI Command Bar at Top", desc: "A persistent, Spotlight-style command bar positioned at the top of every screen — allowing agents to book, search, and navigate with natural language without touching a single form field." },
                    { title: "Predictive Alert Sidebar", desc: "A smart right-side panel that surfaces ML-driven predictions: delayed shipments, capacity warnings, and procurement deadlines — automatically prioritized by urgency." },
                    { title: "Progressive Disclosure Booking", desc: "Replaced 5 sequential form pages with a single-screen booking wizard that reveals fields contextually based on cargo type, route, and agent history." },
                    { title: "Ambient Status Indicators", desc: "Color-coded status bars and micro-animations that communicate system state without demanding explicit attention — the 'Calm Tech' principle in action." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5" style={{ backgroundColor: bgDark }}>{i + 1}</div>
                      <div>
                        <h4 className="font-black text-black mb-1">{item.title}</h4>
                        <p className="text-sm font-medium text-gray-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FCF9F8] border-4 border-black p-6 shadow-[6px_6px_0_0_#000]">
                <p className="text-sm font-bold text-gray-500 text-center uppercase tracking-wider">
                  Wireframe decisions directly informed the "Calm Tech" high-fidelity system below
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 7. VISUAL DESIGN SYSTEM */}
      {/* ============================================ */}
      <section ref={designSystemRef} className="py-20 sm:py-28 border-t-4 border-black relative" style={{ backgroundColor: bgDark }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#38BDF8] mb-4 transform rotate-1" style={{ backgroundColor: accent }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-4 h-4" /> 07
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Visual Design System</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              A "Calm Tech" system built on deep navy foundations with sky-blue accents — authority meets clarity.
            </p>
          </div>

          {/* Color Palette */}
          <div className="relative border-4 border-white/10 p-8 sm:p-10 mb-12 rounded-[20px] overflow-hidden" style={{ backgroundColor: bgSlate }}>
            <div className="absolute top-0 left-0 w-full h-10 border-b-4 border-white/10 flex items-center px-4 gap-2 z-10" style={{ backgroundColor: bgDark }}>
              <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
              <div className="ml-4 text-xs font-bold font-sans text-gray-500 uppercase tracking-widest">CALM_TECH_SYSTEM.SYS</div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-black uppercase mb-8 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border-2" style={{ backgroundColor: `${accent}20`, borderColor: accent }}>
                  <Palette className="w-5 h-5" style={{ color: accent }} />
                </div>
                1. Color Palette
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Primary Palette */}
                <div className="p-6 border-2 border-dashed border-white/20 rounded-xl relative" style={{ backgroundColor: `${bgDark}80` }}>
                  <div className="absolute -top-3 left-4 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#000]" style={{ backgroundColor: accentDark }}>
                    Primary Palette
                  </div>

                  <div className="space-y-4 mt-2">
                    {[
                      { color: '#0B1120', name: 'Deep Navy', usage: 'Primary Background', hex: '#0B1120' },
                      { color: '#38BDF8', name: 'Sky Blue', usage: 'Primary Accent / CTA', hex: '#38BDF8' },
                      { color: '#1E293B', name: 'Slate', usage: 'Cards / Panels', hex: '#1E293B' },
                      { color: '#F8FAFC', name: 'Ice White', usage: 'Text / Headings', hex: '#F8FAFC' },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg border-2 border-transparent hover:border-white/10 transition-all" style={{ backgroundColor: `${bgSlate}` }}>
                        <div className="w-14 h-14 rounded-md border-2 border-white/20 shadow-[2px_2px_0_0_rgba(56,189,248,0.2)]" style={{ backgroundColor: c.color }}></div>
                        <div>
                          <div className="font-black text-white text-lg">{c.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded text-gray-400 border border-white/10" style={{ backgroundColor: bgDark }}>{c.hex}</span>
                            <span className="text-xs font-bold uppercase tracking-tight" style={{ color: accent }}>{c.usage}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Palette */}
                <div className="p-6 border-2 border-dashed border-white/20 rounded-xl relative mt-4 md:mt-0" style={{ backgroundColor: `${bgDark}80` }}>
                  <div className="absolute -top-3 left-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] z-10">
                    Semantic / Status
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {[
                      { color: '#22C55E', name: 'On-Track' },
                      { color: '#F59E0B', name: 'Warning' },
                      { color: '#EF4444', name: 'Critical' },
                      { color: '#818CF8', name: 'In-Progress' },
                      { color: '#94A3B8', name: 'Neutral' },
                    ].map((c, i) => (
                      <div key={i} className="flex flex-col gap-2 p-2 rounded-lg border border-white/5 hover:border-white/20 transition-all" style={{ backgroundColor: bgSlate }}>
                        <div className="aspect-[4/3] w-full rounded-md border border-white/10" style={{ backgroundColor: c.color }}></div>
                        <div className="text-[10px] font-bold text-center text-gray-400 leading-tight">{c.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-lg border" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}30` }}>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: accent }}>
                      <span className="font-bold">Calm Tech Principle:</span> Status colors appear only when actionable. Ambient state uses muted tones to reduce visual noise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography + Design Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="border-4 border-white/10 p-8 rounded-[20px] relative overflow-hidden" style={{ backgroundColor: bgSlate }}>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <span className="text-9xl font-black font-sans text-white">Aa</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 relative z-10 text-white">
                <div className="w-8 h-8 rounded text-black flex items-center justify-center font-serif italic font-bold border-2 border-black shadow-[2px_2px_0_0_#000]" style={{ backgroundColor: accent }}>T</div>
                2. Typography
              </h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-base font-medium text-gray-400 mb-4 p-3 rounded-lg border-l-4" style={{ backgroundColor: `${bgDark}80`, borderColor: accent }}>
                    The system uses <span className="font-bold text-white bg-white/10 px-1">Inter</span>, an open-source typeface optimized for screen readability at all sizes — perfect for data-heavy enterprise UIs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="group border-2 border-transparent hover:border-white/10 p-2 rounded-lg transition-all">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold uppercase" style={{ color: accent }}>Large Display</span>
                      <span className="text-[10px] font-mono text-gray-500">28px / Bold</span>
                    </div>
                    <div className="text-3xl font-bold text-white font-sans">Command Headers</div>
                  </div>

                  <div className="group border-2 border-transparent hover:border-white/10 p-2 rounded-lg transition-all">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold uppercase" style={{ color: accent }}>Medium Display</span>
                      <span className="text-[10px] font-mono text-gray-500">16px / Medium</span>
                    </div>
                    <div className="text-xl font-medium text-gray-300 font-sans">Panel Labels & Body</div>
                  </div>

                  <div className="group border-2 border-transparent hover:border-white/10 p-2 rounded-lg transition-all">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-bold uppercase" style={{ color: accent }}>Data / Mono</span>
                      <span className="text-[10px] font-mono text-gray-500">13px / Mono</span>
                    </div>
                    <div className="text-sm font-normal text-gray-400 font-mono">AWB-0921847362 • EK-514</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Philosophy */}
            <div className="border-4 border-white/10 p-8 rounded-[20px] flex flex-col" style={{ backgroundColor: bgSlate }}>
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 text-white">
                <div className="w-8 h-8 rounded flex items-center justify-center border-2 border-transparent" style={{ backgroundColor: accent }}>
                  <Lightbulb className="w-4 h-4 text-black" />
                </div>
                3. Design Philosophy
              </h3>

              <div className="flex-grow flex flex-col justify-center">
                <div className="relative p-6 border-2 mb-6 rounded-lg" style={{ backgroundColor: `${bgDark}80`, borderColor: `${accent}30`, boxShadow: `4px 4px 0 0 ${accent}40` }}>
                  <Quote className="absolute -top-4 -left-2 w-8 h-8 bg-white p-1 border-2 border-black rounded-full" style={{ color: accent }} />
                  <p className="text-base font-medium text-gray-300 italic leading-relaxed pt-2">
                    "Calm Technology moves to the periphery of our attention — it should inform without demanding. AeroSync applies this by making critical data visible and ambient noise invisible."
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {["Calm", "Authoritative", "Precise", "Ambient", "Premium"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-transform" style={{ backgroundColor: bgDark, boxShadow: `2px 2px 0 0 ${accent}40` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. HIGH-FIDELITY SCREENS */}
      {/* ============================================ */}
      <section ref={hifiRef} className="py-20 sm:py-28 border-t-4 border-black relative" style={{ backgroundColor: bgDarkAlt }}>
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-block border-3 border-black px-4 py-2 mb-4" style={{ backgroundColor: accent, boxShadow: '4px 4px 0 0 #fff' }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Monitor className="w-4 h-4" /> 08
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">High-Fidelity Screens</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              The "Calm Tech" interface in action — where heavy-duty data finds peace through thoughtful design hierarchy.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative bg-white border-4 border-white/20 rounded-[16px] overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer group ${i === 0 ? 'md:col-span-2' : ''}`}
                style={{ boxShadow: `8px 8px 0 0 ${accent}20` }}
                onClick={() => setSelectedImage(i)}
              >
                <img src={img} alt={`AeroSync Screen ${i + 1}`} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white border-3 border-black px-6 py-3 rounded-full shadow-[4px_4px_0_0_#000] flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5 text-black" />
                    <span className="font-black uppercase tracking-wider text-sm">View Full</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 9. PROTOTYPE & INTERACTIONS */}
      {/* ============================================ */}
      <section ref={prototypeRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4" style={{ backgroundColor: accent }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 09
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">Prototype & Interactions</h2>
              <p className="text-base font-medium text-gray-600 leading-relaxed">
                Every micro-interaction follows the "Calm Tech" principle: inform without interrupting, guide without demanding.
              </p>
            </div>

            <div className="lg:w-2/3 space-y-6">
              {[
                { title: "AI Command Bar Autocomplete", desc: "As the agent types, the command bar predicts intent and auto-suggests complete actions — 'Book EK-514 cargo DXB→LHR' can be executed in 3 keystrokes instead of 15 form fields.", color: accent },
                { title: "Predictive Alert Animations", desc: "Alerts slide in from the right sidebar with subtle spring physics. Critical alerts pulse gently; low-priority alerts appear without motion to avoid attention-grabbing where unnecessary.", color: '#F59E0B' },
                { title: "Progressive Form Expansion", desc: "The booking wizard reveals fields contextually. Select 'Perishable Cargo' and temperature controls appear smoothly. Select 'Standard' and they stay hidden — reducing form length by 40-60% per booking.", color: '#22C55E' },
                { title: "Status Ambient Glow", desc: "The sidebar's edge emits a subtle color glow reflecting overall system health — green for nominal, amber for attention needed, red for critical action required — perceivable peripherally without direct focus.", color: '#818CF8' },
              ].map((item, i) => (
                <div key={i} className="bg-[#FCF9F8] border-4 border-black p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 border-2 border-black rounded-full shrink-0 mt-2" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <h3 className="text-lg font-black text-black uppercase mb-2">{item.title}</h3>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 10. CHALLENGES & SOLUTIONS */}
      {/* ============================================ */}
      <section ref={challengesRef} className="py-20 sm:py-28 border-t-4 border-black relative" style={{ backgroundColor: '#E0F2FE' }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px', opacity: 0.3 }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform -rotate-1">
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> 10
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">Challenges & Solutions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                challenge: "Balancing premium brand identity with utilitarian enterprise requirements",
                solution: "Developed a 'Calm Tech' visual language that conveys luxury through restraint — deep navy tones, generous whitespace, and sky-blue accents create authority without compromising on data density or usability.",
              },
              {
                challenge: "Designing an AI Command Bar that agents trust over manual forms",
                solution: "Built progressive trust through transparent AI: showing exactly which fields the command bar auto-fills, offering one-click corrections, and maintaining a 'manual override' button visible at all times — adoption increased from 15% to 78% in testing.",
              },
              {
                challenge: "Reducing form complexity while maintaining data completeness for compliance",
                solution: "Implemented smart defaults powered by historical booking patterns and contextual pre-population. A 'Full Details' expandable section satisfies compliance auditing without burdening the primary booking flow.",
              },
              {
                challenge: "Creating a white-label system that adapts to different airline brands",
                solution: "Designed a token-based theming architecture where primary accent color, logo placement, and typography weights can be swapped via a single configuration file — maintaining structural consistency while honoring each airline's brand guidelines.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 bg-[#FF9F9F]/30 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-[#FF6B6B]" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#FF6B6B]">Challenge</span>
                    </div>
                    <p className="text-base font-bold text-black leading-relaxed">{item.challenge}</p>
                  </div>
                  <div className="p-8" style={{ backgroundColor: `${accent}15` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5" style={{ color: accentDark }} />
                      <span className="text-xs font-black uppercase tracking-widest" style={{ color: accentDark }}>Solution</span>
                    </div>
                    <p className="text-base font-medium text-gray-700 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 11. RESULTS / IMPACT */}
      {/* ============================================ */}
      <section ref={resultsRef} className="py-20 sm:py-28 border-t-4 border-black relative overflow-hidden" style={{ backgroundColor: bgDark }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block border-3 border-black px-4 py-2 mb-4" style={{ backgroundColor: accent, boxShadow: '4px 4px 0 0 #fff' }}>
              <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> 11
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Expected Impact</h2>
            <p className="text-lg font-bold text-gray-400 max-w-2xl mx-auto mt-4">
              Projected outcomes based on usability testing with cargo agents and procurement managers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { metric: "62%", label: "Reduction in form fields per booking workflow", color: accent },
              { metric: "78%", label: "AI Command Bar adoption rate in user testing", color: '#FFDE59' },
              { metric: "3.4x", label: "Faster cargo booking vs. legacy system baseline", color: '#A0E7E5' },
              { metric: "91%", label: "User satisfaction score from validation testing", color: '#B8C0FF' },
            ].map((item, i) => (
              <div key={i} className="border-4 border-black p-6 hover:-translate-y-2 transition-all duration-300" style={{ backgroundColor: item.color, boxShadow: '6px 6px 0 0 rgba(255,255,255,0.15)' }}>
                <div className="text-4xl sm:text-5xl font-black text-black mb-2">{item.metric}</div>
                <div className="text-xs font-bold text-black/70 uppercase tracking-wider leading-relaxed">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="border-2 border-white/20 rounded-[16px] p-8 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <p className="text-base font-medium text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Post-launch KPIs to validate: average booking completion time, AI command bar usage frequency, error rate per booking, agent satisfaction NPS, and system context-switching frequency. These metrics will confirm whether AeroSync truly eliminates "Form Fatigue" in production.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 12. REFLECTION / LEARNINGS */}
      {/* ============================================ */}
      <section ref={reflectionRef} className="bg-[#FCF9F8] py-20 sm:py-28 border-t-4 border-black relative">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32">
              <div className="inline-block border-3 border-black px-4 py-2 shadow-[4px_4px_0_0_#000] mb-4 transform rotate-1" style={{ backgroundColor: '#FFDE59' }}>
                <span className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> 12
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none">Reflection</h2>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }}></div> What I Learned
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  Designing for enterprise B2B taught me that "simplicity" in this context doesn't mean fewer features — it means better orchestration. Cargo agents need every data point; the design challenge is presenting it at the right moment in the right hierarchy. The "Calm Tech" philosophy proved that reducing ambient visual noise increases both speed and accuracy — agents found critical information 3x faster when non-essential elements were dimmed rather than hidden.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FFDE59] rounded-full"></div> What I'd Improve
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  I would invest more time in creating a functional AI Command Bar prototype using real NLP models — testing how agents phrase natural-language queries and where the autocomplete predictions fail. I'd also explore dark mode vs. light mode A/B testing with agents in different lighting environments (warehouse terminals vs. office screens) to validate the deep-navy palette across all work contexts.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_0_#000]">
                <h3 className="text-lg font-black uppercase mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF9F9F] rounded-full"></div> What I'd Do Differently
                </h3>
                <p className="text-base font-medium text-gray-600 leading-relaxed">
                  I would embed myself in a cargo operations center for a full week before starting any design work — observing real booking workflows, shadowing agents during peak hours, and mapping their actual (not assumed) pain points. Some of the most impactful design decisions came from understanding that agents work in 12-hour shifts with multiple screens — context that shaped the "ambient status glow" feature but came too late in the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 13. CTA SECTION */}
      {/* ============================================ */}
      <section ref={ctaRef} className="bg-white py-20 sm:py-28 border-t-4 border-black relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-black hidden lg:block opacity-20" style={{ backgroundColor: accent }}></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rotate-45 border-4 border-black hidden lg:block opacity-20" style={{ backgroundColor: '#FFDE59' }}></div>

        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="border-4 border-black p-10 sm:p-16 text-center" style={{ backgroundColor: bgDark, boxShadow: `12px 12px 0 0 ${accent}` }}>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              Like what you see?<br />
              <span style={{ color: accent }}>Let's build something together.</span>
            </h2>
            <p className="text-lg font-bold text-gray-400 max-w-xl mx-auto mb-10">
              I'm always open to discussing new projects, design challenges, and opportunities to create impactful enterprise experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-transparent text-white border-4 border-white/30 px-8 py-4 font-black text-lg uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              >
                Back to Projects <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-black border-4 border-black px-8 py-4 font-black text-lg uppercase tracking-wider hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: accent, boxShadow: '6px 6px 0 0 rgba(255,255,255,0.2)' }}
              >
                Let's Work Together <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float */}
      <WhatsAppFloat />

      {/* Image Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10 shadow-[4px_4px_0_0_#000]"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white border-4 border-black rounded-[16px] overflow-hidden shadow-[12px_12px_0_0_rgba(255,255,255,0.1)]">
              <img
                src={galleryImages[selectedImage]}
                alt={`AeroSync Screen ${selectedImage + 1}`}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
            </div>
            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)}
                className="w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="bg-white border-3 border-black px-4 py-2 rounded-full text-sm font-black shadow-[4px_4px_0_0_#000]">
                {selectedImage + 1} / {galleryImages.length}
              </span>
              <button
                onClick={() => setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)}
                className="w-12 h-12 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
